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
  PLATFORM_ID,
  OnChanges,
  SimpleChanges,
  Renderer2
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
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LottieEventsService]
})
export class LottieComponent extends BaseDirective implements OnChanges, OnInit {
  @ViewChild('container', { static: true }) container: ElementRef<HTMLElement> = null!;

  constructor(
    private ref: ChangeDetectorRef,
    private zone: NgZone,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string,
    @Self() private lottieEventsService: LottieEventsService,
    @Attribute('detach') detach: string | null
  ) {
    super();
    super.setDetach(detach);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.containerClass !== undefined) {
      this.renderer.addClass(this.container.nativeElement, changes.containerClass.currentValue);
    }
  }

  ngOnInit(): void {
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
