import { Injectable, OnDestroy, NgZone, EventEmitter } from '@angular/core';

import {
  AnimationItem,
  LottieEvent,
  LottieEventName,
  LottieComponentConfigurable
} from './symbols';
import { lottieEvents, getEventEmitterFromComponentInstance } from './internals';

@Injectable()
export class LottieEventsService implements OnDestroy {
  private animationItem: AnimationItem | null = null;

  /**
   * Save listeners so we're able to remove them from `AnimationItem`
   * by references in the future when this service is destroyed
   */
  private readonly listeners = new Map<LottieEventName, (event: LottieEvent) => void>();

  constructor(private zone: NgZone) {}

  public ngOnDestroy(): void {
    this.dispose();
  }

  /**
   * This method is invoked after calling `loadAnimation` and dispatches the new one
   * created `AnimationItem` instance
   */
  public animationLoaded(
    animationItem: AnimationItem,
    animationLoaded: EventEmitter<AnimationItem>
  ): void {
    animationLoaded.emit(animationItem);
  }

  public setAnimationItemAndLottieEventListeners(
    animationItem: AnimationItem,
    instance: LottieComponentConfigurable
  ): void {
    this.animationItem = animationItem;
    // `AnimationItem` triggers different events every ms, we have to listen
    // them outside Angular's context, thus it won't affect performance
    this.zone.runOutsideAngular(() => this.setupLottieEventsListeners(instance));
  }

  private setupLottieEventsListeners(instance: LottieComponentConfigurable): void {
    lottieEvents.forEach((name) => {
      this.setupLottieEventListener(name, instance);
    });
  }

  private setupLottieEventListener(name: LottieEventName, instance: LottieComponentConfigurable) {
    const listener = (event: LottieEvent): void => {
      const emitter: EventEmitter<LottieEvent> = getEventEmitterFromComponentInstance(
        instance,
        name
      );

      emitter.emit(event);
    };

    this.animationItem!.addEventListener(name, listener);
    this.listeners.set(name, listener);
  }

  private dispose(): void {
    for (const [name, callback] of this.listeners.entries()) {
      if (name === 'destroy') {
        continue;
      }

      this.animationItem!.removeEventListener(name, callback);
    }

    // We cannot call `destroy` before removing event listeners
    // as after calling `destroy` - `removeEventListener` becomes unavailable
    this.animationItem!.destroy();
    this.animationItem = null;
  }
}
