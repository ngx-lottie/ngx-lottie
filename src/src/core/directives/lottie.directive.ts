import { Directive, OnInit, NgZone, Inject, Self, ElementRef, PLATFORM_ID } from '@angular/core';

import { BaseDirective } from './base.directive';
import { LottieEventsService } from '../services/lottie-events.service';

@Directive({
  selector: '[lottie]',
  providers: [LottieEventsService]
})
export class LottieDirective extends BaseDirective implements OnInit {
  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
    @Self() private host: ElementRef<HTMLElement>,
    @Self() private lottieEventsService: LottieEventsService
  ) {
    super();
  }

  ngOnInit(): void {
    super.loadAnimation(
      this.zone,
      this.platformId,
      this.lottieEventsService,
      this.host.nativeElement,
      this
    );
  }
}
