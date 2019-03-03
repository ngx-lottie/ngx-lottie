import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Inject,
  NgZone,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  Self,
  Output,
  EventEmitter
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { LottieEventsService } from './lottie-events.service';
import { resolveOptions, loadAnimation } from './internals';
import {
  LottieOptions,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
  BMDestroyEvent,
  AnimationItem,
  LottieComponentConfigurable
} from './symbols';

@Component({
  selector: 'ng-lottie',
  template: `
    <div #container></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LottieEventsService]
})
export class LottieComponent implements OnInit, LottieComponentConfigurable {
  @Input()
  public options: LottieOptions = {};

  @ViewChild('container')
  public container: ElementRef<HTMLElement> = null!;

  @Output()
  public readonly animationLoaded = new EventEmitter<AnimationItem>();

  @Output()
  public readonly complete = new EventEmitter<BMCompleteEvent>();

  @Output()
  public readonly loopComplete = new EventEmitter<BMCompleteLoopEvent>();

  @Output()
  public readonly enterFrame = new EventEmitter<BMEnterFrameEvent>();

  @Output()
  public readonly segmentStart = new EventEmitter<BMSegmentStartEvent>();

  @Output()
  public readonly configReady = new EventEmitter<void>();

  @Output()
  public readonly dataReady = new EventEmitter<void>();

  @Output()
  public readonly dataFailed = new EventEmitter<void>();

  @Output()
  public readonly loadedImages = new EventEmitter<void>();

  @Output()
  public readonly domLoaded = new EventEmitter<void>();

  @Output()
  public readonly destroy = new EventEmitter<BMDestroyEvent>();

  constructor(
    private readonly zone: NgZone,
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Self() private readonly lottieEventsService: LottieEventsService
  ) {}

  public ngOnInit(): void {
    this.loadAnimation();
  }

  private loadAnimation(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const animationItem = loadAnimation(
      this.zone,
      resolveOptions(this.options, this.container.nativeElement)
    );

    this.lottieEventsService.animationLoaded(animationItem, this.animationLoaded);
    this.lottieEventsService.setAnimationItemAndLottieEventListeners(animationItem, this);
  }
}
