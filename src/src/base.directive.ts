import {
  Directive,
  Input,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { Subject } from 'rxjs';

import {
  AnimationOptions,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
  BMDestroyEvent,
  BMRenderFrameErrorEvent,
  BMConfigErrorEvent,
  AnimationItem,
} from './symbols';
import { AnimationLoader } from './animation-loader';
import { LottieEventsFacade } from './events-facade';

@Directive({ selector: '[lottie]' })
export class BaseDirective implements OnDestroy {
  @Input() options: AnimationOptions | null = null;

  @Input() containerClass: string | null = null;

  @Input() styles: Partial<CSSStyleDeclaration> | null = null;

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

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private animationLoader: AnimationLoader,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected loadAnimation(
    changes: SimpleChanges,
    container: HTMLElement,
    eventsFacade: LottieEventsFacade,
    instance: BaseDirective,
  ): void {
    if (isPlatformServer(this.platformId) || !changes.options) {
      return;
    }

    eventsFacade.destroyAnimation();

    this.animationLoader.resolveLoaderAndLoadAnimation(
      changes.options.currentValue,
      container,
      eventsFacade,
      this.animationCreated,
      instance,
      this.destroy$,
    );
  }
}
