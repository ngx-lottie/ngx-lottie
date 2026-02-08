import { AfterViewChecked, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { LoadEvent } from '@lottiefiles/dotlottie-web';
import { DotLottieWorkerComponent } from 'ngx-lottie/dotlottie-web';

@Component({
  selector: 'app-dotlottie-demo',
  templateUrl: './dotlottie-demo.component.html',
  styleUrl: './dotlottie-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DotLottieWorkerComponent],
})
export default class DotLottieDemoComponent implements AfterViewChecked {
  readonly shown = signal(true);
  readonly src = signal('http://localhost:4200/assets/animations/sm.lottie');

  private instance: import('@lottiefiles/dotlottie-web').DotLottieWorker | null = null;

  ngAfterViewChecked(): void {
    // Notice that it's not logged every ms
    if (!ngServerMode) {
      console.log('DotLottieDemoComponent.ngAfterViewChecked');
    }
  }

  dotLottieCreated(instance: import('@lottiefiles/dotlottie-web').DotLottieWorker): void {
    console.log('dotLottieCreated -> ', instance);
    this.instance = instance;
  }

  load(loadEvent: LoadEvent): void {
    console.log('load -> ', loadEvent);
  }

  setSpeed(speed: number): void {
    this.instance?.setSpeed(speed);
  }

  showAnimation(): void {
    this.shown.set(true);
  }

  destroyAnimation(): void {
    this.shown.set(false);
    this.instance = null;
  }

  play(): void {
    this.instance?.play();
  }

  pause(): void {
    this.instance?.pause();
  }

  stop(): void {
    this.instance?.stop();
  }

  updateAnimation(): void {
    this.src.set('http://localhost:4200/assets/animations/17893-work-from-home.json');
  }
}
