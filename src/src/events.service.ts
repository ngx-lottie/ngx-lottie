import { Injectable, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { BaseDirective } from './base.directive';
import { LottieEventsFacade } from './events-facade';
import { AnimationItem, AnimationEventName, LottieEvent } from './symbols';

@Injectable()
export class LottieEventsService implements OnDestroy {
  private animationItem: AnimationItem | null = null;

  /**
   * Save listeners so we're able to remove them from `AnimationItem`
   * by references in the future when this service is destroyed
   */
  private listeners: Map<AnimationEventName, (event: LottieEvent) => void> = null!;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private lottieEventsFacade: LottieEventsFacade
  ) {}

  ngOnDestroy(): void {
    this.dispose();
  }

  bootstrapEventsService(instance: BaseDirective, animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    this.listeners = this.lottieEventsFacade.addEventListeners(instance, animationItem);
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
}
