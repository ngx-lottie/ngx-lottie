import { Directive, OnInit, Inject, Self, ElementRef, PLATFORM_ID } from '@angular/core';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';
import { LottieEventsService } from './events.service';

@Directive({
  selector: '[lottie]',
  providers: [LottieEventsService]
})
export class LottieDirective extends BaseDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Self() private host: ElementRef<HTMLElement>,
    @Self() private lottieEventsService: LottieEventsService,
    animationLoader: AnimationLoader
  ) {
    super(platformId, animationLoader);
  }

  ngOnInit(): void {
    super.loadAnimation(this.host.nativeElement, this.lottieEventsService, this);
  }
}
