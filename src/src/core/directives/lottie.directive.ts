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

import { LottieEventsService } from '../services/lottie-events.service';
import { BaseDirective } from './base.directive';

@Directive({
  selector: '[lottie]',
  providers: [LottieEventsService]
})
export class LottieDirective extends BaseDirective implements OnInit {
  constructor(
    private readonly ref: ChangeDetectorRef,
    private readonly zone: NgZone,
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Self() private readonly lottieEventsService: LottieEventsService,
    @Self() private readonly host: ElementRef<HTMLElement>,
    @Attribute('detach') detach: string | null
  ) {
    super();
    super.setDetach(detach);
  }

  public ngOnInit(): void {
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
