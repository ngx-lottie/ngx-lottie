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
import { isPlatformBrowser } from '@angular/common';

import { Subject, BehaviorSubject, Observable, defer } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

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
   * `complete` is dispatched after completing the last frame.
   */
  @Output() complete = this.awaitAnimationItemAndStartListening<BMCompleteEvent>('complete');

  /**
   * `loopComplete` is dispatched after completing the frame loop.
   */
  @Output() loopComplete =
    this.awaitAnimationItemAndStartListening<BMCompleteLoopEvent>('loopComplete');

  /**
   * `enterFrame` is dispatched after entering the new frame.
   */
  @Output() enterFrame = this.awaitAnimationItemAndStartListening<BMEnterFrameEvent>('enterFrame');

  /**
   * `segmentStart` is dispatched when the new segment is adjusted.
   */
  @Output() segmentStart =
    this.awaitAnimationItemAndStartListening<BMSegmentStartEvent>('segmentStart');

  /**
   * Original event name is `config_ready`. `config_ready` is dispatched
   * after the needed renderer is configured.
   */
  @Output() configReady = this.awaitAnimationItemAndStartListening<void>('config_ready');

  /**
   * Original event name is `data_ready`. `data_ready` is dispatched
   * when all parts of the animation have been loaded.
   */
  @Output() dataReady = this.awaitAnimationItemAndStartListening<void>('data_ready');

  /**
   * Original event name is `DOMLoaded`. `DOMLoaded` is dispatched
   * when elements have been added to the DOM.
   */
  @Output() domLoaded = this.awaitAnimationItemAndStartListening<void>('DOMLoaded');

  /**
   * `destroy` will be dispatched when the component gets destroyed,
   * it's handy for releasing resources.
   */
  @Output() destroy = this.awaitAnimationItemAndStartListening<BMDestroyEvent>('destroy');

  /**
   * `error` will be dispatched if the Lottie player could not render
   * some frame or parse config.
   */
  @Output() error = this.awaitAnimationItemAndStartListening<
    BMRenderFrameErrorEvent | BMConfigErrorEvent
  >('error');

  private destroy$ = new Subject<void>();
  private loadAnimation$ = new Subject<[SimpleChanges, HTMLElement]>();
  private animationItem$ = new BehaviorSubject<AnimationItem | null>(null);

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
    private animationLoader: AnimationLoader,
  ) {
    this.setupLoadAnimationListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroyAnimation();
  }

  protected loadAnimation(changes: SimpleChanges, container: HTMLElement): void {
    // The `loadAnimation` may load `lottie-web` asynchronously and also pipes the player
    // with `animationFrameScheduler`, which schedules an animation task and triggers change
    // detection. We'll trigger change detection only once when the animation item is created.
    this.ngZone.runOutsideAngular(() => this.loadAnimation$.next([changes, container]));
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
              animationItem.addEventListener<T>(name, event => {
                this.ngZone.runOutsideAngular(() => {
                  observer.next(event);
                });
              });
            });
          }),
      ),
    );
  }

  private setupLoadAnimationListener(): void {
    const loadAnimation$ = this.loadAnimation$.pipe(
      filter(([changes]) => isPlatformBrowser(this.platformId) && changes.options !== undefined),
    );

    loadAnimation$
      .pipe(
        switchMap(([changes, container]) => {
          this.destroyAnimation();
          return this.animationLoader.loadAnimation(
            this.animationLoader.resolveOptions(changes.options.currentValue, container),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(animationItem => {
        this.ngZone.run(() => this.animationItem$.next(animationItem));
      });
  }

  private destroyAnimation(): void {
    const animationItem = this.animationItem$.getValue();
    // The `ng-lottie` component or the `lottie` directive can be destroyed
    // before the `animationItem` is set, thus it will fail with
    // `Cannot read property 'destroy' of null`.
    // Potentially it can happen if the directive gets destroyed before change
    // detection is run.
    if (animationItem === null) {
      return;
    }

    // `destroy()` will remove all events listeners.
    animationItem.destroy();
    this.animationItem$.next(null);
  }
}
