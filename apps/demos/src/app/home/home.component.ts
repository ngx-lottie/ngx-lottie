import {
  Component,
  ChangeDetectionStrategy,
  AfterViewChecked,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import type { AnimationItem } from 'lottie-web';
import { AnimationOptions, BMDestroyEvent, LottieComponent, LottieTransferState } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LottieComponent],
})
export default class HomeComponent implements AfterViewChecked {
  options!: WritableSignal<AnimationOptions>;

  readonly shown = signal(true);

  readonly styles: Partial<CSSStyleDeclaration> = {
    margin: '0 auto',
  };

  private animationItem: AnimationItem | null = null;

  private lottieTransferState = inject(LottieTransferState);

  constructor() {
    this.createOptions();
  }

  ngAfterViewChecked(): void {
    // Notice that it's not logged every ms
    if (!ngServerMode) {
      console.log('ngAfterViewChecked');
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log('animationCreated -> ', animationItem);
    this.animationItem = animationItem;
  }

  destroy(destroyEvent: BMDestroyEvent): void {
    console.log('destroy -> ', destroyEvent);
  }

  showAnimation(): void {
    this.shown.set(true);
  }

  destroyAnimation(): void {
    this.shown.set(false);
    this.animationItem = null;
  }

  setSpeed(speed: number): void {
    this.animationItem?.setSpeed(speed);
  }

  play(): void {
    this.animationItem?.play();
  }

  pause(): void {
    this.animationItem?.pause();
  }

  stop(): void {
    this.animationItem?.stop();
  }

  updateAnimation(): void {
    this.options.set({
      path: '/assets/animations/17893-work-from-home.json',
    });
  }

  private createOptions(): void {
    const tranferredAnimationData = this.lottieTransferState.get('data.json');

    if (tranferredAnimationData) {
      this.options = signal({
        animationData: tranferredAnimationData,
      });
    } else {
      this.options = signal({
        path: '/assets/animations/data.json',
      });
    }
  }
}
