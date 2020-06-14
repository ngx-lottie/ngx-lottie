import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Inject,
  ElementRef,
  ViewChild,
  Self,
  PLATFORM_ID,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';
import { LottieEventsFacade } from './events-facade';

@Component({
  selector: 'ng-lottie',
  template: `
    <div
      #container
      [style.width]="width || '100%'"
      [style.height]="height || '100%'"
      [ngStyle]="styles"
      [ngClass]="containerClass"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LottieEventsFacade],
})
export class LottieComponent extends BaseDirective implements OnChanges {
  @Input() width: string | null = null;
  @Input() height: string | null = null;

  @ViewChild('container', { static: true }) container: ElementRef<HTMLElement> = null!;

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Self() private eventsFacade: LottieEventsFacade,
    animationLoader: AnimationLoader,
  ) {
    super(platformId, animationLoader);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.loadAnimation(changes, this.container.nativeElement, this.eventsFacade, this);
  }
}
