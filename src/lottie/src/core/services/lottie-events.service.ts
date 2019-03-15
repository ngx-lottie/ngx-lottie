import { Injectable, OnDestroy, NgZone, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { AnimationItem, LottieEvent, LottieEventName } from '../../symbols';
import { lottieEvents, getEventEmitterFromDirectiveInstance } from '../../internals';
import { BaseDirective } from '../directives/base.directive';

@Injectable()
export class LottieEventsService implements OnDestroy {
  private animationItem: AnimationItem | null = null;

  /**
   * Save listeners so we're able to remove them from `AnimationItem`
   * by references in the future when this service is destroyed
   */
  private readonly listeners = new Map<LottieEventName, (event: LottieEvent) => void>();

  constructor(
    private readonly zone: NgZone,
    @Inject(PLATFORM_ID) private readonly platformId: string
  ) {}

  public ngOnDestroy(): void {
    this.dispose();
  }

  /**
   * This method is invoked after calling `loadAnimation` and dispatches the new one
   * created `AnimationItem` instance
   */
  public animationCreated(
    animationItem: AnimationItem,
    animationCreated: EventEmitter<AnimationItem>
  ): void {
    animationCreated.emit(animationItem);
  }

  public setAnimationItemAndLottieEventListeners(
    animationItem: AnimationItem,
    instance: BaseDirective
  ): void {
    this.animationItem = animationItem;
    // `AnimationItem` triggers different events every ms, we have to listen
    // them outside Angular's context, thus it won't affect performance
    this.zone.runOutsideAngular(() => this.setupLottieEventListeners(instance));
  }

  private setupLottieEventListeners(instance: BaseDirective): void {
    lottieEvents.forEach((name) => {
      this.setupLottieEventListener(name, instance);
    });
  }

  private setupLottieEventListener(name: LottieEventName, instance: BaseDirective): void {
    const emitter: EventEmitter<LottieEvent> = getEventEmitterFromDirectiveInstance(instance, name);
    const listener = (event: LottieEvent): void => emitter.emit(event);

    this.animationItem!.addEventListener(name, listener);

    // We don't have to save `destroy` listener, because `AnimationItem`
    // is able to remove `destroy` event listener itself
    if (name !== 'destroy') {
      this.listeners.set(name, listener);
    }
  }

  private dispose(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    for (const [name, callback] of this.listeners.entries()) {
      this.animationItem!.removeEventListener(name, callback);
    }

    // Release listeners as we don't need them
    this.listeners.clear();

    // We cannot call `destroy` before removing event listeners
    // as after calling `destroy` - `removeEventListener` becomes unavailable
    this.animationItem!.destroy();
    this.animationItem = null;
  }
}
