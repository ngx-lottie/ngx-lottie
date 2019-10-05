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
import { LottieEventsFacade } from './events-facade';

@Component({
  selector: 'ng-lottie',
  template: `
    <div #container [style.width]="width" [style.height]="height" [ngStyle]="styles"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LottieEventsFacade]
})
export class LottieComponent extends BaseDirective implements OnChanges, OnInit {
  @ViewChild('container', { static: true }) container: ElementRef<HTMLElement> = null!;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: string,
    @Self() private eventsFacade: LottieEventsFacade,
    animationLoader: AnimationLoader
  ) {
    super(platformId, animationLoader);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const containerClass = changes.containerClass;

    if (containerClass === undefined || typeof containerClass.currentValue !== 'string') {
      return;
    }

    this.renderer.addClass(this.container.nativeElement, containerClass.currentValue);
  }

  ngOnInit(): void {
    super.setWidthAndHeight();
    super.loadAnimation(this.container.nativeElement, this.eventsFacade, this);
  }
}
