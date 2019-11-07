import { OnDestroy, Injectable, NgZone, Inject, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { BaseDirective } from './base.directive';
import { EventsMap, LottieEvent, AnimationItem } from './symbols';

/**
 * Returns only those `EventEmitter` instances that has attached observers
 */
function getObservedEventEmitters(instance: BaseDirective, eventsMap: EventsMap) {
  return Object.keys(instance)
    .map(key => [key, instance[key]])
    .filter(
      ([key, property]) =>
        property instanceof EventEmitter &&
        property.observers.length > 0 &&
        eventsMap.hasOwnProperty(key)
    )
    .map(([key, eventEmitter]) => ({
      eventEmitter,
      name: eventsMap[key]
    }));
}

@Injectable()
export class LottieEventsFacade implements OnDestroy {
  /**
   * @see https://github.com/airbnb/lottie-web#events
   */
  private eventsMap: EventsMap = {
    complete: 'complete',
    loopComplete: 'loopComplete',
    enterFrame: 'enterFrame',
    segmentStart: 'segmentStart',
    configReady: 'config_ready',
    dataReady: 'data_ready',
    domLoaded: 'DOMLoaded',
    destroy: 'destroy',
    error: 'error'
  };

  private animationItem: AnimationItem | null = null;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: string) {}

  ngOnDestroy(): void {
    this.dispose();
  }

  addEventListeners(instance: BaseDirective, animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    // `AnimationItem` triggers different events every ms, we have to listen
    // them outside Angular's context, thus it won't affect performance
    this.ngZone.runOutsideAngular(() => this.addEventListenersToObservedEventEmitters(instance));
  }

  private dispose(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    // `destroy()` will remove all events listeners
    this.animationItem!.destroy();
    this.animationItem = null;
  }

  private addEventListenersToObservedEventEmitters(instance: BaseDirective): void {
    const observedEmitters = getObservedEventEmitters(instance, this.eventsMap);

    for (const { name, eventEmitter } of observedEmitters) {
      this.animationItem!.addEventListener(name, (event: LottieEvent) => {
        eventEmitter.emit(event);
      });
    }
  }
}
