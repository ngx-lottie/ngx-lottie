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
  PLATFORM_ID
} from '@angular/core';

import { LottieEventsService } from '../services/lottie-events.service';
import { BaseDirective } from '../directives/base.directive';

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
  @ViewChild('container')
  public container: ElementRef<HTMLElement> = null!;

  constructor(
    private readonly ref: ChangeDetectorRef,
    private readonly zone: NgZone,
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Self() private readonly lottieEventsService: LottieEventsService
  ) {
    super();
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
