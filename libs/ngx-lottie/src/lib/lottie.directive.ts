import { Directive, ElementRef, OnChanges, SimpleChanges, inject } from '@angular/core';

import { BaseDirective } from './base.directive';

@Directive({ selector: '[lottie]', standalone: true })
export class LottieDirective extends BaseDirective implements OnChanges {
  private host = inject(ElementRef);

  ngOnChanges(changes: SimpleChanges): void {
    super.loadAnimation(changes, this.host.nativeElement);
  }
}
