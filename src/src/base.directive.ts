import { Directive, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import {
  LottieOptions,
  LottieCSSStyleDeclaration,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
  BMDestroyEvent,
  LottieContainerClass,
  BMRenderFrameErrorEvent,
  BMConfigErrorEvent,
  AnimationItem
} from './symbols';
import { AnimationLoader } from './animation-loader';
import { LottieEventsService } from './events.service';

@Directive({ selector: '[lottie]' })
export class BaseDirective {
  @Input() options: LottieOptions | null = null;

  @Input() containerClass: LottieContainerClass = null;

  @Input() styles: LottieCSSStyleDeclaration | null = null;

  @Input() width: string = null!;

  @Input() height: string = null!;

  /**
   * `animationCreated` is dispatched after calling `loadAnimation`
   */
  @Output() animationCreated = new EventEmitter<AnimationItem>();

  /**
   * `complete` is dispatched after completing the last frame
   */
  @Output() complete = new EventEmitter<BMCompleteEvent>();

  /**
   * `loopComplete` is dispatched after completing frame loop
   */
  @Output() loopComplete = new EventEmitter<BMCompleteLoopEvent>();

  /**
   * `enterFrame` is dispatched after entering the new frame
   */
  @Output() enterFrame = new EventEmitter<BMEnterFrameEvent>();

  /**
   * `segmentStart` is dispatched when the new segment is adjusted
   */
  @Output() segmentStart = new EventEmitter<BMSegmentStartEvent>();

  /**
   * Original event name is `config_ready`. `config_ready` is dispatched
   * after the needed renderer is configured
   */
  @Output() configReady = new EventEmitter<void>();

  /**
   * Original event name is `data_ready`. `data_ready` is dispatched
   * when all parts of the animation have been loaded
   */
  @Output() dataReady = new EventEmitter<void>();

  /**
   * Original event name is `DOMLoaded`. `DOMLoaded` is dispatched
   * when elements have been added to the DOM
   */
  @Output() domLoaded = new EventEmitter<void>();

  /**
   * `destroy` will be dispatched in the `ngOnDestroy` hook of the service,
   * it's useful for releasing resources
   */
  @Output() destroy = new EventEmitter<BMDestroyEvent>();

  /**
   * `error` will be dispatched if the lottie player could not render
   * some frame or parse config
   */
  @Output() error = new EventEmitter<BMRenderFrameErrorEvent | BMConfigErrorEvent>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private animationLoader: AnimationLoader
  ) {}

  protected loadAnimation(
    container: HTMLElement | HTMLCanvasElement,
    lottieEventsService: LottieEventsService,
    instance: BaseDirective
  ): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.animationLoader.resolveLoaderAndLoadAnimation(
      this.options,
      container,
      lottieEventsService,
      this.animationCreated,
      instance
    );
  }
}
