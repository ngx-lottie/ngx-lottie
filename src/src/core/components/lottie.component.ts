import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  ChangeDetectorRef,
  NgZone,
  ElementRef,
  ViewChild,
  Self,
  Attribute,
  PLATFORM_ID
} from '@angular/core';

import { BaseDirective } from '../directives/base.directive';
import { LottieEventsService } from '../services/lottie-events.service';

@Component({
  selector: 'ng-lottie',
  template: `
    <div
      #container
      [style.width.px]="width"
      [style.height.px]="height"
      style="margin: 0 auto"
      [ngStyle]="styles"
      [ngClass]="containerClass"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LottieEventsService]
})
export class LottieComponent extends BaseDirective implements OnInit {
  @ViewChild('container', { static: true })
  public container: ElementRef<HTMLElement> = null!;

  constructor(
    private readonly ref: ChangeDetectorRef,
    private readonly zone: NgZone,
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Self() private readonly lottieEventsService: LottieEventsService,
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
      this.container.nativeElement,
      this
    );
  }
}
