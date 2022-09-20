import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Inject,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  OnChanges,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';

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
  standalone: true,
  imports: [CommonModule],
})
export class LottieComponent extends BaseDirective implements OnChanges {
  @Input() width: string | null = null;
  @Input() height: string | null = null;

  @ViewChild('container', { static: true }) container: ElementRef<HTMLElement> = null!;

  constructor(
    ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: string,
    animationLoader: AnimationLoader,
  ) {
    super(ngZone, platformId, animationLoader);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.loadAnimation(changes, this.container.nativeElement);
  }
}
