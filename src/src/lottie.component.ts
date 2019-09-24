import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
  Self,
  OnChanges,
  SimpleChanges,
  Renderer2,
  PLATFORM_ID
} from '@angular/core';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';
import { LottieEventsService } from './events.service';

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
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: string,
    @Self() private lottieEventsService: LottieEventsService,
    animationLoader: AnimationLoader
  ) {
    super(platformId, animationLoader);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.containerClass === undefined ||
      typeof changes.containerClass.currentValue !== 'string'
    ) {
      return;
    }

    this.renderer.addClass(this.container.nativeElement, changes.containerClass.currentValue);
  }

  ngOnInit(): void {
    super.loadAnimation(this.container.nativeElement, this.lottieEventsService, this);
  }
}
