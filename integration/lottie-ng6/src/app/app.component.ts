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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public options: LottieOptions = {
    path: '/assets/data.json'
  };

  public shown = true;

  private animationItem: AnimationItem | null = null;

  public animationCreated(animationItem: AnimationItem): void {
    console.log('animationCreated -> ', animationItem);
    this.animationItem = animationItem;
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

  public destroyAnimation(): void {
    this.shown = false;
  }

  public play(): void {
    this.animationItem!.play();
  }

  public pause(): void {
    this.animationItem!.pause();
  }

  public stop(): void {
    this.animationItem!.stop();
  }
}
