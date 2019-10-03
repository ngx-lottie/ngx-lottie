import { OnDestroy, EventEmitter, Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import {
  CamelizedAnimationEventName,
  LottieEvent,
  AnimationEventName,
  AnimationItem
} from './symbols';
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

  /**
   * Save listeners so we're able to remove them from `AnimationItem`
   * by references in the future when this service is destroyed
   */
  private listeners = new Map<AnimationEventName, (event: LottieEvent) => void>();

  private animationItem: AnimationItem | null = null;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: string) {}

  ngOnDestroy(): void {
    this.dispose();
  }

  addEventListeners(instance: BaseDirective, animationItem: AnimationItem): void {
    this.animationItem = animationItem;

    for (const name of this.eventNames) {
      const listenerFn = this.addEventListener(instance, name);
      // We don't have to save `destroy` listener, because `AnimationItem`
      // is able to remove `destroy` event listener itself
      if (name !== 'destroy') {
        this.listeners.set(name, listenerFn);
      }
    }
  }

  private dispose(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    for (const [name, listenerFn] of this.listeners.entries()) {
      this.animationItem!.removeEventListener(name, listenerFn);
    }

    // We cannot call `destroy` before removing event listeners
    // as after calling `destroy` - `removeEventListener` becomes unavailable
    this.animationItem!.destroy();
    this.animationItem = null;
    // Release listeners as we don't need them
    this.listeners.clear();
  }

  private addEventListener(
    instance: BaseDirective,
    name: AnimationEventName
  ): (event: LottieEvent) => void {
    const listenerFn = this.handleEventClosure(instance, name);
    // `AnimationItem` triggers different events every ms, we have to listen
    // them outside Angular's context, thus it won't affect performance
    this.ngZone.runOutsideAngular(() => {
      this.animationItem!.addEventListener(name, listenerFn);
    });

    return listenerFn;
  }

  private handleEventClosure(instance: BaseDirective, name: AnimationEventName) {
    return (event: LottieEvent) => {
      const emitter = this.retrieveEventEmitter(instance, name);
      emitter.emit(event);
    };
  }

  /**
   * @param name - Name of the event in the `snake_case` dispatched by Lottie
   * @returns - Resolved event name in the `camelCase`
   */
  private camelizeNativeEventName(name: AnimationEventName): CamelizedAnimationEventName {
    return this.eventsMap[name];
  }

  private retrieveEventEmitter(
    instance: BaseDirective,
    name: AnimationEventName
  ): EventEmitter<LottieEvent> {
    return instance[this.camelizeNativeEventName(name)] as EventEmitter<LottieEvent>;
  }
}
