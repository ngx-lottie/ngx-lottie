import { Directive, Input, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { loadAnimation } from '../../internals';
import { LottieEventsService } from '../services/lottie-events.service';
import {
  LottieOptions,
  LottieCSSStyleDeclaration,
  AnimationItem,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
  BMDestroyEvent,
  LottieContainerClass
} from '../../symbols';

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
   * Original event name is `data_failed`. `data_failed` can be dispatched
   * if the `XMLHttpRequest`, that tried to load animation data using
   * provided `path`, has errored
   */
  @Output() dataFailed = new EventEmitter<void>();

  /**
   * Original event name is `loaded_images`. `loaded_images` can be
   * dispatched after all assets are preloaded
   */
  @Output() loadedImages = new EventEmitter<void>();

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

  protected loadAnimation(
    zone: NgZone,
    platformId: string,
    lottieEventsService: LottieEventsService,
    container: HTMLElement | HTMLCanvasElement,
    instance: BaseDirective
  ): void {
    if (isPlatformServer(platformId)) {
      return;
    }

    const animationItem = loadAnimation(zone, this.options, container);
    lottieEventsService.animationCreated(animationItem, this.animationCreated);
    lottieEventsService.setAnimationItemAndLottieEventListeners(animationItem, instance);
  }
}
