import { Component } from '@angular/core';
import { LottieOptions, AnimationItem, BMDestroyEvent } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public options: LottieOptions = {
    path: '/assets/data.json'
  };

  public shown = true;

  private animationItem: AnimationItem = null!;

  public animationCreated(animationItem: AnimationItem): void {
    console.log('animationCreated -> ', animationItem);
    this.animationItem = animationItem;
  }

  public destroy(destroyEvent: BMDestroyEvent): void {
    console.log('destroy -> ', destroyEvent);
  }

  public showAnimation(): void {
    this.shown = true;
  }

  public destroyAnimation(): void {
    this.shown = false;
    this.animationItem = null!;
  }

  public setSpeed(speed: number): void {
    this.skipIfDestroyed(() => {
      this.animationItem.setSpeed(speed);
    });
  }

  public play(): void {
    this.skipIfDestroyed(() => {
      this.animationItem.play();
    });
  }

  public pause(): void {
    this.skipIfDestroyed(() => {
      this.animationItem.pause();
    });
  }

  public stop(): void {
    this.skipIfDestroyed(() => {
      this.animationItem.stop();
    });
  }

  private skipIfDestroyed(callback: () => void): void {
    if (this.animationItem) {
      callback();
    }
  }
}
