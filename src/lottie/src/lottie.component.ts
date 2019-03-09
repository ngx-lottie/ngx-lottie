import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Inject,
  NgZone,
  ElementRef,
  ViewChild,
  Self,
  PLATFORM_ID,
  Output,
  EventEmitter
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { loadAnimation } from './internals';
import { LottieEventsService } from './lottie-events.service';
import {
  LottieOptions,
  LottieCSSStyleDeclaration,
  AnimationItem,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
  BMDestroyEvent,
  ContainerClass
} from './symbols';

@Component({
  selector: 'ng-lottie',
  template: `
    <div
      #container
      [style.width.px]="width"
      [style.height.px]="height"
      style="margin: 0 auto"
      [ngStyle]="styles"
      [ngClass]="containerClass"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LottieEventsService]
})
export class LottieComponent implements OnInit {
  @Input()
  public options: LottieOptions | null = null;

  @ViewChild('container')
  public container: ElementRef<HTMLElement> = null!;

  @Input()
  public containerClass: ContainerClass = null;

  @Input()
  public styles: LottieCSSStyleDeclaration | null = null;

  @Input()
  public width: string = null!;

  @Input()
  public height: string = null!;

  /**
   * `animationCreated` is dispatched after calling `loadAnimation`
   */
  @Output()
  public readonly animationCreated = new EventEmitter<AnimationItem>();

  /**
   * `complete` is dispatched after completing the last frame
   */
  @Output()
  public readonly complete = new EventEmitter<BMCompleteEvent>();

  /**
   * `loopComplete` is dispatched after completing frame loop
   */
  @Output()
  public readonly loopComplete = new EventEmitter<BMCompleteLoopEvent>();

  /**
   * `enterFrame` is dispatched after entering the new frame
   */
  @Output()
  public readonly enterFrame = new EventEmitter<BMEnterFrameEvent>();

  /**
   * `segmentStart` is dispatched when the new segment is adjusted
   */
  @Output()
  public readonly segmentStart = new EventEmitter<BMSegmentStartEvent>();

  /**
   * Original event name is `config_ready`. `config_ready` is dispatched
   * after the needed renderer is configured
   */
  @Output()
  public readonly configReady = new EventEmitter<void>();

  /**
   * Original event name is `data_ready`. `data_ready` is dispatched
   * when all parts of the animation have been loaded
   */
  @Output()
  public readonly dataReady = new EventEmitter<void>();

  /**
   * Original event name is `data_failed`. `data_failed` can be dispatched
   * if the `XMLHttpRequest`, that tried to load animation data using
   * provided `path`, has errored
   */
  @Output()
  public readonly dataFailed = new EventEmitter<void>();

  /**
   * Original event name is `loaded_images`. `loaded_images` can be
   * dispatched after all assets are preloaded
   */
  @Output()
  public readonly loadedImages = new EventEmitter<void>();

  /**
   * Original event name is `DOMLoaded`. `DOMLoaded` is dispatched
   * when elements have been added to the DOM
   */
  @Output()
  public readonly domLoaded = new EventEmitter<void>();

  /**
   * `destroy` will be dispatched in the `ngOnDestroy` hook of the service,
   * it's useful for releasing resources
   */
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

  private async loadAnimation(): Promise<void> {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const animationItem = await loadAnimation(
      this.zone,
      this.options,
      this.container.nativeElement
    );

    this.lottieEventsService.animationCreated(animationItem, this.animationCreated);
    this.lottieEventsService.setAnimationItemAndLottieEventListeners(animationItem, this);
  }
}
