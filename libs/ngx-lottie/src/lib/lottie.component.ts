import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

import { BaseDirective } from './base.directive';

@Component({
  selector: 'ng-lottie',
  template: `
    <div
      #container
      [style.width]="width() || '100%'"
      [style.height]="height() || '100%'"
      [ngStyle]="styles()"
      [ngClass]="containerClass()"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, NgClass],
})
export class LottieComponent extends BaseDirective implements OnChanges {
  width = input<string | null>(null);
  height = input<string | null>(null);

  @ViewChild('container', { static: true }) container: ElementRef<HTMLElement> = null!;

  ngOnChanges(changes: SimpleChanges): void {
    super.loadAnimation(changes, this.container.nativeElement);
  }
}
