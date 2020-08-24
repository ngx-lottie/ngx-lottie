import {
  Directive,
  Inject,
  Self,
  ElementRef,
  PLATFORM_ID,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';

@Directive({
  selector: '[lottie]',
})
export class LottieDirective extends BaseDirective implements OnChanges {
  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Self() private host: ElementRef<HTMLElement>,
    animationLoader: AnimationLoader,
  ) {
    super(platformId, animationLoader);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.loadAnimation(changes, this.host.nativeElement);
  }
}
