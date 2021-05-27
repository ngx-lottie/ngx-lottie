import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewChecked,
  NgZone,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, BMDestroyEvent, LottieTransferState } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewChecked {
  options!: AnimationOptions;

  shown = true;

  styles: Partial<CSSStyleDeclaration> = {
    margin: '0 auto',
  };

  private animationItem: AnimationItem | null = null;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
    private lottieTransferState: LottieTransferState,
  ) {
    this.createOptions();
  }

  ngAfterViewChecked(): void {
    // Notice that it's not logged every ms
    if (isPlatformBrowser(this.platformId)) {
      console.log('ngAfterViewChecked');
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    NgZone.assertInAngularZone();
    console.log('animationCreated -> ', animationItem);
    this.animationItem = animationItem;
  }

  destroy(destroyEvent: BMDestroyEvent): void {
    NgZone.assertNotInAngularZone();
    console.log('destroy -> ', destroyEvent);
  }

  showAnimation(): void {
    this.shown = true;
  }

  destroyAnimation(): void {
    this.shown = false;
    this.animationItem = null;
  }

  setSpeed(speed: number): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem?.setSpeed(speed);
    });
  }

  play(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem?.play();
    });
  }

  pause(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem?.pause();
    });
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem?.stop();
    });
  }

  updateAnimation(): void {
    this.options = {
      path: '/assets/animations/17893-work-from-home.json',
    };
  }

  private createOptions(): void {
    const tranferredAnimationData = this.lottieTransferState.get('data.json');

    if (tranferredAnimationData) {
      this.options = {
        animationData: tranferredAnimationData,
      };
    } else {
      this.options = {
        path: '/assets/animations/data.json',
      };
    }
  }
}
