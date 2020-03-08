import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
  Self,
  PLATFORM_ID
} from '@angular/core';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';
import { LottieEventsFacade } from './events-facade';

@Component({
  selector: 'ng-lottie',
  template: `
    <div
      #container
      [style.width]="width"
      [style.height]="height"
      [ngStyle]="styles"
      [ngClass]="containerClass"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LottieEventsFacade]
})
export class LottieComponent extends BaseDirective implements OnInit {
  @ViewChild('container', { static: true }) container: ElementRef<HTMLElement> = null!;

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Self() private eventsFacade: LottieEventsFacade,
    animationLoader: AnimationLoader
  ) {
    super(platformId, animationLoader);
  }

  ngOnInit(): void {
    super.setWidthAndHeight();
    super.loadAnimation(this.container.nativeElement, this.eventsFacade, this);
  }
}
