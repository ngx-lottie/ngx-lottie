import {
  Directive,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  Inject,
  Self,
  ElementRef,
  Attribute,
  PLATFORM_ID
} from '@angular/core';

import { BaseDirective } from './base.directive';
import { LottieEventsService } from '../services/lottie-events.service';

@Directive({
  selector: '[lottie]',
  providers: [LottieEventsService]
})
export class LottieDirective extends BaseDirective implements OnInit {
  constructor(
    private ref: ChangeDetectorRef,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
    @Self() private host: ElementRef<HTMLElement>,
    @Self() private lottieEventsService: LottieEventsService,
    @Attribute('detach') detach: string | null
  ) {
    super();
    super.setDetach(detach);
  }

  ngOnInit(): void {
    super.loadAnimation(
      this.ref,
      this.zone,
      this.platformId,
      this.lottieEventsService,
      this.host.nativeElement,
      this
    );
  }
}
