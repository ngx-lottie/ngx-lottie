import {
  Directive,
  Input,
  Output,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { Subject, BehaviorSubject, Observable, defer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

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
  AnimationEventName,
} from './symbols';
import { AnimationLoader } from './animation-loader';

@Directive({ selector: '[lottie]' })
export class BaseDirective implements OnDestroy {
  @Input() options: AnimationOptions | null = null;

  @Input() containerClass: string | null = null;

  @Input() styles: Partial<CSSStyleDeclaration> | null = null;

  /**
   * `animationCreated` is dispatched after calling `loadAnimation`.
   */
  @Output() animationCreated = this.getAnimationItem();

  /**
   * `complete` is dispatched after completing the last frame
   */
  @Output() complete = this.awaitAnimationItemAndStartListening<BMCompleteEvent>('complete');

  /**
   * `loopComplete` is dispatched after completing frame loop
   */
  @Output() loopComplete = this.awaitAnimationItemAndStartListening<BMCompleteLoopEvent>(
    'loopComplete',
  );

  /**
   * `enterFrame` is dispatched after entering the new frame
   */
  @Output() enterFrame = this.awaitAnimationItemAndStartListening<BMEnterFrameEvent>('enterFrame');

  /**
   * `segmentStart` is dispatched when the new segment is adjusted
   */
  @Output() segmentStart = this.awaitAnimationItemAndStartListening<BMSegmentStartEvent>(
    'segmentStart',
  );

  /**
   * Original event name is `config_ready`. `config_ready` is dispatched
   * after the needed renderer is configured
   */
  @Output() configReady = this.awaitAnimationItemAndStartListening<void>('config_ready');

  /**
   * Original event name is `data_ready`. `data_ready` is dispatched
   * when all parts of the animation have been loaded
   */
  @Output() dataReady = this.awaitAnimationItemAndStartListening<void>('data_ready');

  /**
   * Original event name is `DOMLoaded`. `DOMLoaded` is dispatched
   * when elements have been added to the DOM
   */
  @Output() domLoaded = this.awaitAnimationItemAndStartListening<void>('DOMLoaded');

  /**
   * `destroy` will be dispatched in the `ngOnDestroy` hook of the service,
   * it's useful for releasing resources
   */
  @Output() destroy = this.awaitAnimationItemAndStartListening<BMDestroyEvent>('destroy');

  /**
   * `error` will be dispatched if the lottie player could not render
   * some frame or parse config
   */
  @Output() error = this.awaitAnimationItemAndStartListening<
    BMRenderFrameErrorEvent | BMConfigErrorEvent
  >('error');

  private destroy$ = new Subject<void>();

  private animationItem$ = new BehaviorSubject<AnimationItem | null>(null);

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
    private animationLoader: AnimationLoader,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyAnimation();
  }

  protected loadAnimation(changes: SimpleChanges, container: HTMLElement): void {
    if (isPlatformServer(this.platformId) || changes.options === undefined) {
      return;
    }

    this.destroyAnimation();

    this.animationLoader.resolveLoaderAndLoadAnimation(
      changes.options.currentValue,
      container,
      this.animationItem$,
      this.destroy$,
    );
  }

  private destroyAnimation(): void {
    // The `ng-lottie` component or the `lottie` directive can be destroyed
    // before the `animationItem` is set, thus it will fail with
    // `Cannot read property 'destroy' of null`.
    // Potentially it can happen if the directive gets destroyed before change
    // detection is run.
    if (this.animationItem$.value === null) {
      return;
    }

    // `destroy()` will remove all events listeners.
    this.animationItem$.value.destroy();
    this.animationItem$.next(null);
  }

  private getAnimationItem(): Observable<AnimationItem> {
    return defer(() => this.animationItem$).pipe(
      filter(
        (animationItem: AnimationItem | null): animationItem is AnimationItem =>
          animationItem !== null,
      ),
    );
  }

  private awaitAnimationItemAndStartListening<T>(name: AnimationEventName): Observable<T> {
    return this.getAnimationItem().pipe(
      switchMap(
        animationItem =>
          // `fromEvent` will try to call `removeEventListener` when `unsubscribe()` is invoked.
          // The problem is that `ngOnDestroy()` is called before Angular unsubscribes from
          // `@Output()` properties, thus `animationItem` will be `null` already, also `lottie-web`
          // removes event listeners when calling `destroy()`.
          new Observable<T>(observer => {
            this.ngZone.runOutsideAngular(() => {
              animationItem.addEventListener<T>(name, event => observer.next(event));
            });
          }),
      ),
    );
  }
}
