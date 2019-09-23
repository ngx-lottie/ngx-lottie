import { EventEmitter, Injectable, NgZone } from '@angular/core';

import {
  CamelizedAnimationEventName,
  LottieEvent,
  AnimationEventName,
  AnimationItem
} from './symbols';
import { BaseDirective } from './base.directive';

@Injectable()
export class LottieEventsFacade {
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
  private eventNames: readonly AnimationEventName[] = [
    'complete',
    'loopComplete',
    'enterFrame',
    'segmentStart',
    'config_ready',
    'data_ready',
    'DOMLoaded',
    'destroy',
    'error'
  ];

  constructor(private ngZone: NgZone) {}

  addEventListeners(
    instance: BaseDirective,
    animationItem: AnimationItem
  ): Map<AnimationEventName, (event: LottieEvent) => void> {
    const listeners = new Map();

    for (const name of this.eventNames) {
      const listenerFn = this.addEventListener(instance, animationItem, name);
      // We don't have to save `destroy` listener, because `AnimationItem`
      // is able to remove `destroy` event listener itself
      if (name !== 'destroy') {
        listeners.set(name, listenerFn);
      }
    }

    return listeners;
  }

  private addEventListener(
    instance: BaseDirective,
    animationItem: AnimationItem,
    name: AnimationEventName
  ): (event: LottieEvent) => void {
    const listenerFn = this.handleEventClosure(instance, name);
    // `AnimationItem` triggers different events every ms, we have to listen
    // them outside Angular's context, thus it won't affect performance
    this.ngZone.runOutsideAngular(() => {
      animationItem.addEventListener(name, listenerFn);
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
