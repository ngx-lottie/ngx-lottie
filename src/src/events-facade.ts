import { OnDestroy, Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import {
  LottieEvent,
  AnimationItem,
  AnimationEventName,
  CamelizedAnimationEventName
} from './symbols';
import { retrieveEventEmitter } from './utils';
import { BaseDirective } from './base.directive';

@Injectable()
export class LottieEventsFacade implements OnDestroy {
  /**
   * Some dispatched events are in the `snake_case` registry, for convenience,
   * we create this object that will map event name to the `camelCase` registry
   */
  private eventsMap: { [key in AnimationEventName]: CamelizedAnimationEventName } = {
    complete: 'complete',
    loopComplete: 'loopComplete',
    enterFrame: 'enterFrame',
    segmentStart: 'segmentStart',
    config_ready: 'configReady',
    data_ready: 'dataReady',
    DOMLoaded: 'domLoaded',
    destroy: 'destroy',
    error: 'error'
  };

  /**
   * Events that can be dispatched by `Animationitem`
   * @see https://github.com/airbnb/lottie-web#events
   */
  private eventNames = Object.keys(this.eventsMap) as readonly AnimationEventName[];

  private animationItem: AnimationItem | null = null;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: string) {}

  ngOnDestroy(): void {
    this.dispose();
  }

  addEventListeners(instance: BaseDirective, animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    // `AnimationItem` triggers different events every ms, we have to listen
    // them outside Angular's context, thus it won't affect performance
    this.ngZone.runOutsideAngular(() => {
      this.eventNames.forEach(name => this.addEventListener(instance, name));
    });
  }

  private dispose(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    // `destroy()` will remove all events listeners
    this.animationItem!.destroy();
    this.animationItem = null;
  }

  private addEventListener(instance: BaseDirective, name: AnimationEventName): void {
    const camelizedName = this.eventsMap[name];

    this.animationItem!.addEventListener(name, (event: LottieEvent) => {
      const emitter = retrieveEventEmitter(instance, camelizedName);
      emitter.emit(event);
    });
  }
}
