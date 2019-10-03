import { Directive, OnInit, Inject, Self, ElementRef, PLATFORM_ID } from '@angular/core';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';
import { LottieEventsFacade } from './events-facade';

@Directive({
  selector: '[lottie]',
  providers: [LottieEventsFacade]
})
export class LottieDirective extends BaseDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Self() private host: ElementRef<HTMLElement>,
    @Self() private eventsFacade: LottieEventsFacade,
    animationLoader: AnimationLoader
  ) {
    super(platformId, animationLoader);
  }

  ngOnInit(): void {
    super.loadAnimation(this.host.nativeElement, this.eventsFacade, this);
  }
}
