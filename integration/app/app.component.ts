import { Component, ChangeDetectionStrategy, AfterViewChecked, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, BMDestroyEvent, LottieTransferState } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewChecked {
  options!: AnimationOptions;

  shown = true;

  styles: Partial<CSSStyleDeclaration> = {
    margin: '0 auto'
  };

  private animationItem: AnimationItem | null = null;

  constructor(private ngZone: NgZone, private lottieTransferState: LottieTransferState) {
    this.createOptions();
  }

  ngAfterViewChecked(): void {
    // Notice that it's not logged every ms
    console.log('ngAfterViewChecked');
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log('animationCreated -> ', animationItem);
    this.animationItem = animationItem;
  }

  destroy(destroyEvent: BMDestroyEvent): void {
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
    if (this.animationItem) {
      this.ngZone.runOutsideAngular(() => this.animationItem!.setSpeed(speed));
    }
  }

  play(): void {
    if (this.animationItem) {
      this.ngZone.runOutsideAngular(() => this.animationItem!.play());
    }
  }

  pause(): void {
    if (this.animationItem) {
      this.ngZone.runOutsideAngular(() => this.animationItem!.pause());
    }
  }

  stop(): void {
    if (this.animationItem) {
      this.ngZone.runOutsideAngular(() => this.animationItem!.stop());
    }
  }

  private createOptions(): void {
    if (this.lottieTransferState.get('data.json')) {
      this.options = {
        animationData: this.lottieTransferState.get('data.json')
      };
    } else {
      this.options = {
        path: '/assets/animations/data.json'
      };
    }
  }
}
