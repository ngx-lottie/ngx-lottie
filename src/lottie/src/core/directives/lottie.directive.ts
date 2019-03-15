import { Directive, OnInit, NgZone, Inject, Self, PLATFORM_ID, ElementRef } from '@angular/core';

import { LottieEventsService } from '../services/lottie-events.service';
import { BaseDirective } from './base.directive';

@Directive({
  selector: '[lottie]',
  providers: [LottieEventsService]
})
export class LottieDirective extends BaseDirective implements OnInit {
  constructor(
    private readonly zone: NgZone,
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Self() private readonly lottieEventsService: LottieEventsService,
    @Self() private readonly host: ElementRef<HTMLElement>
  ) {
    super();
  }

  public ngOnInit(): void {
    super.loadAnimation(
      this.zone,
      this.platformId,
      this.lottieEventsService,
      this.host.nativeElement,
      this
    );
  }
}
