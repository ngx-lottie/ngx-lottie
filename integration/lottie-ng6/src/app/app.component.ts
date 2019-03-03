import { Component } from '@angular/core';
import {
  LottieOptions,
  AnimationItem,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMDestroyEvent
} from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public options: LottieOptions = {
    path: '/assets/data.json'
  };

  public shown = true;

  constructor() {
    setTimeout(() => {
      this.shown = false;
    }, 300);
  }

  public animationLoaded(animationItem: AnimationItem): void {
    console.log('animationLoaded -> ', animationItem);
  }

  public configReady(): void {
    console.log('configReady');
  }

  public dataReady(): void {
    console.log('dataReady');
  }

  public domLoaded(): void {
    console.log('domLoaded');
  }

  public enterFrame(enterFrameEvent: BMEnterFrameEvent): void {
    console.log('enterFrame -> ', enterFrameEvent);
  }

  public segmentStart(segmentStartEvent: BMSegmentStartEvent): void {
    console.log('segmentStart -> ', segmentStartEvent);
  }

  public complete(completeEvent: BMCompleteEvent): void {
    console.log('complete -> ', completeEvent);
  }

  public loopComplete(completeLoopEvent: BMCompleteLoopEvent): void {
    console.log('loopComplete -> ', completeLoopEvent);
  }

  public destroy(destroyEvent: BMDestroyEvent): void {
    console.log('destroy -> ', destroyEvent);
  }
}
