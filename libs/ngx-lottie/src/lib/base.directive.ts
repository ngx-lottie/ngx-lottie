import {
  Directive,
  Input,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  NgZone,
  inject,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  @Output() readonly animationCreated = this.getAnimationItem();

  /**
   * `complete` is dispatched after completing the last frame.
   */
  @Output() readonly complete =
    this.awaitAnimationItemAndStartListening<BMCompleteEvent>('complete');

  /**
   * `loopComplete` is dispatched after completing the frame loop.
   */
  @Output() readonly loopComplete =
    this.awaitAnimationItemAndStartListening<BMCompleteLoopEvent>('loopComplete');

  /**
   * `enterFrame` is dispatched after entering the new frame.
   */
  @Output() readonly enterFrame =
    this.awaitAnimationItemAndStartListening<BMEnterFrameEvent>('enterFrame');

  /**
   * `segmentStart` is dispatched when the new segment is adjusted.
   */
  @Output() readonly segmentStart =
    this.awaitAnimationItemAndStartListening<BMSegmentStartEvent>('segmentStart');

  /**
   * Original event name is `config_ready`. `config_ready` is dispatched
   * after the needed renderer is configured.
   */
  @Output() readonly configReady = this.awaitAnimationItemAndStartListening<void>('config_ready');

  /**
   * Original event name is `data_ready`. `data_ready` is dispatched
   * when all parts of the animation have been loaded.
   */
  @Output() readonly dataReady = this.awaitAnimationItemAndStartListening<void>('data_ready');

  /**
   * Original event name is `DOMLoaded`. `DOMLoaded` is dispatched
   * when elements have been added to the DOM.
   */
  @Output() readonly domLoaded = this.awaitAnimationItemAndStartListening<void>('DOMLoaded');

  /**
   * `destroy` will be dispatched when the component gets destroyed,
   * it's handy for releasing resources.
   */
  @Output() readonly destroy = this.awaitAnimationItemAndStartListening<BMDestroyEvent>('destroy');

  /**
   * `error` will be dispatched if the Lottie player could not render
   * some frame or parse config.
   */
  @Output() readonly error = this.awaitAnimationItemAndStartListening<
    BMRenderFrameErrorEvent | BMConfigErrorEvent
  >('error');

  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private animationLoader = inject(AnimationLoader);

  private loadAnimation$ = new Subject<[SimpleChanges, HTMLElement]>();
  private animationItem$ = new BehaviorSubject<AnimationItem | null>(null);

  constructor() {
    this.setupLoadAnimationListener();
  }

  ngOnDestroy(): void {
    this.destroyAnimation();
  }

  protected loadAnimation(changes: SimpleChanges, container: HTMLElement): void {
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
              animationItem.addEventListener(name, event => {
                this.ngZone.runOutsideAngular(() => {
                  observer.next(event as T);
                });
              });
            });
          }),
      ),
    );
  }

  private setupLoadAnimationListener(): void {
    const loadAnimation$ = this.loadAnimation$.pipe(
      filter(([changes]) => this.isBrowser && changes.options !== undefined),
    );

    loadAnimation$
      .pipe(
        switchMap(([changes, container]) => {
          this.destroyAnimation();
          return this.animationLoader.loadAnimation(
            this.animationLoader.resolveOptions(changes.options.currentValue, container),
          );
        }),
        takeUntilDestroyed(),
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
