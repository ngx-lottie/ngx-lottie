import { isPlatformServer } from '@angular/common';
import {
  afterNextRender,
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  NgZone,
  OutputEmitterRef,
  PLATFORM_ID,
  runInInjectionContext,
  signal,
  untracked,
  viewChild,
  ɵisPromise,
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { Observable, switchMap, EMPTY } from 'rxjs';

import { coerceBooleanAttribute } from './types';
import { DOT_LOTTIE_OPTIONS, DOT_LOTTIE_WASM_URL } from './symbols';
import type {
  Event,
  Data,
  DotLottie,
  DotLottieWorker,
  EventType,
  Layout,
  Mode,
  RenderConfig,
  StateMachineConfig,
} from '@lottiefiles/dotlottie-web';

type EventByType<T extends EventType> = Extract<
  Event,
  {
    type: T;
  }
>;

@Directive()
export abstract class ɵɵBaseDotLottieDirective {
  /**
   * Static flag to track if WASM URL has been configured globally.
   */
  private static wasmUrlConfigured = false;

  protected readonly instance = signal<DotLottie | DotLottieWorker | undefined>(undefined);

  private readonly isLoaded = signal(false);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private readonly ngZone = inject(NgZone);

  readonly className = input<string>();
  readonly containerStyles = input<Record<string, string>>();
  readonly animationId = input<string>();
  readonly autoplay = input(false, { transform: coerceBooleanAttribute });
  readonly backgroundColor = input<string>();
  readonly data = input<Data>();
  readonly layout = input<Layout>();
  readonly loop = input(false, { transform: coerceBooleanAttribute });
  readonly marker = input<string>();
  readonly mode = input<Mode>();
  readonly renderConfig = input<RenderConfig>();
  readonly segment = input<[number, number]>();
  readonly speed = input<number>();
  readonly src = input<string>();
  readonly themeId = input<string>();
  readonly useFrameInterpolation = input(true, { transform: coerceBooleanAttribute });
  readonly stateMachineId = input<string>();
  readonly stateMachineConfig = input<StateMachineConfig>();

  abstract readonly dotLottieCreated: OutputEmitterRef<DotLottie | DotLottieWorker>;

  /**
   * Emitted when the animation completes playback.
   */
  readonly complete = outputFromObservable(this.awaitInstanceAndStartListening('complete'));

  /**
   * Emitted when the animation has successfully loaded.
   */
  readonly load = outputFromObservable(this.awaitInstanceAndStartListening('load'));

  /**
   * Emitted when an error occurs during animation loading.
   */
  readonly loadError = outputFromObservable(this.awaitInstanceAndStartListening('loadError'));

  /**
   * Emitted when an error occurs during animation rendering.
   */
  readonly renderError = outputFromObservable(this.awaitInstanceAndStartListening('renderError'));

  /**
   * Emitted when the animation is paused.
   */
  readonly pause = outputFromObservable(this.awaitInstanceAndStartListening('pause'));

  /**
   * Emitted when the animation starts playing.
   */
  readonly play = outputFromObservable(this.awaitInstanceAndStartListening('play'));

  /**
   * Emitted when the animation is stopped.
   */
  readonly stop = outputFromObservable(this.awaitInstanceAndStartListening('stop'));

  /**
   * Emitted when the animation instance is destroyed.
   */
  readonly destroy = outputFromObservable(this.awaitInstanceAndStartListening('destroy'));

  /**
   * Emitted when the WASM module is initialized and ready.
   */
  readonly ready = outputFromObservable(this.awaitInstanceAndStartListening('ready'));

  /**
   * Emitted on each frame change. Useful for tracking the current frame.
   */
  readonly frame = outputFromObservable(this.awaitInstanceAndStartListening('frame'));

  /**
   * Emitted when the animation is frozen (rendering paused).
   */
  readonly freeze = outputFromObservable(this.awaitInstanceAndStartListening('freeze'));

  /**
   * Emitted when the animation is unfrozen (rendering resumed).
   */
  readonly unfreeze = outputFromObservable(this.awaitInstanceAndStartListening('unfreeze'));

  protected readonly mergedContainerStyles = computed(() => ({
    width: '100%',
    height: '100%',
    lineHeight: '0',
    ...this.containerStyles(),
  }));

  protected canvasStyles = { width: '100%', height: '100%' };

  constructor() {
    if (
      (typeof ngServerMode !== 'undefined' && ngServerMode) ||
      isPlatformServer(inject(PLATFORM_ID))
    ) {
      return;
    }

    const injector = inject(Injector);
    const destroyRef = inject(DestroyRef);
    const options = inject(DOT_LOTTIE_OPTIONS);
    const wasmUrl = inject(DOT_LOTTIE_WASM_URL, { optional: true });

    afterNextRender(async () => {
      const DotLottie = await this.ngZone.runOutsideAngular(() => {
        const player = options.player();
        return ɵisPromise(player) ? player : Promise.resolve(player);
      });

      if (wasmUrl !== null && ɵɵBaseDotLottieDirective.wasmUrlConfigured === false) {
        ɵɵBaseDotLottieDirective.wasmUrlConfigured = true;
        DotLottie.setWasmUrl(wasmUrl);
      }

      // Guard against component destruction during async import.
      if (destroyRef.destroyed) {
        return;
      }

      runInInjectionContext(injector, () => this.render(destroyRef, DotLottie));
    });
  }

  private render(
    destroyRef: DestroyRef,
    DotLottieConstructor: typeof DotLottie | typeof DotLottieWorker,
  ): void {
    const canvas = this.canvas().nativeElement;

    const instance = this.ngZone.runOutsideAngular(() => {
      return new DotLottieConstructor({
        canvas,
        ...this.buildConfig(),
      });
    });

    this.instance.set(instance);
    this.dotLottieCreated.emit(instance);

    // Track when the DotLottie animation is fully loaded.
    // This is necessary for state machine initialization, which requires
    // the animation to be loaded before a state machine can be started.
    this.ngZone.runOutsideAngular(() => {
      const onLoad = () => this.isLoaded.set(true);
      instance.addEventListener('load', onLoad);
      destroyRef.onDestroy(() => instance.removeEventListener('load', onLoad));
    });

    // Each effect tracks a single input signal and updates the corresponding
    // DotLottie instance property when that input changes. This provides
    // fine-grained reactivity similar to React's `useEffect` with dependency arrays.
    effect(() => {
      this.ngZone.runOutsideAngular(() => instance.loadAnimation(this.animationId() ?? ''));
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() =>
        instance.setBackgroundColor(this.backgroundColor() ?? ''),
      );
    });
    effect(() => {
      const data = this.data();
      if (typeof data !== 'string' && typeof data !== 'object') return;
      this.ngZone.runOutsideAngular(() => instance.load({ ...this.buildConfig(), data }));
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() => instance.setLayout(this.layout() ?? {}));
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() => instance.setLoop(this.loop() ?? false));
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() => instance.setMarker(this.marker() ?? ''));
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() => instance.setMode(this.mode() ?? 'forward'));
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() => instance.setRenderConfig(this.renderConfig() ?? {}));
    });
    effect(() => {
      const segment = this.segment();
      if (typeof segment?.[0] === 'number' && typeof segment?.[1] === 'number') {
        this.ngZone.runOutsideAngular(() => instance.setSegment(segment[0], segment[1]));
      }
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() => instance.setSpeed(this.speed() ?? 1));
    });
    effect(() => {
      const src = this.src();
      if (typeof src !== 'string') return;
      this.ngZone.runOutsideAngular(() => instance.load({ ...this.buildConfig(), src }));
    });
    effect(() => {
      const themeId = this.themeId();
      if (typeof themeId !== 'string') return;
      this.ngZone.runOutsideAngular(() => instance.setTheme(themeId));
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() =>
        instance.setUseFrameInterpolation(this.useFrameInterpolation() ?? true),
      );
    });
    effect(() => {
      const isLoaded = this.isLoaded();
      const stateMachineId = this.stateMachineId();

      // Wait for instance to be ready and loaded.
      if (!isLoaded) return;

      if (typeof stateMachineId === 'string' && stateMachineId) {
        this.ngZone.runOutsideAngular(() => {
          const smLoaded = instance.stateMachineLoad(stateMachineId);
          if (smLoaded) {
            instance.stateMachineStart();
          }
        });
      } else {
        this.ngZone.runOutsideAngular(() => instance.stateMachineStop());
      }
    });
    effect(() => {
      this.ngZone.runOutsideAngular(() =>
        instance.stateMachineSetConfig(this.stateMachineConfig() ?? null),
      );
    });

    destroyRef.onDestroy(() => {
      // Since `destroy()` calls `eventManager.dispatch` with `destroy`,
      // we're unaware of any upcoming asynchronous jobs scheduled in the
      // Angular context that might redundantly trigger change detection.
      this.ngZone.runOutsideAngular(() => {
        instance.destroy();
      });
    });
  }

  private buildConfig() {
    return untracked(() => ({
      animationId: this.animationId(),
      autoplay: this.autoplay(),
      backgroundColor: this.backgroundColor(),
      data: this.data(),
      layout: this.layout(),
      loop: this.loop(),
      marker: this.marker(),
      mode: this.mode(),
      renderConfig: this.renderConfig(),
      segment: this.segment(),
      speed: this.speed(),
      src: this.src(),
      themeId: this.themeId(),
      useFrameInterpolation: this.useFrameInterpolation(),
    }));
  }

  private awaitInstanceAndStartListening<T extends EventType>(name: T): Observable<EventByType<T>> {
    return toObservable(this.instance).pipe(
      switchMap(instance => {
        if (instance === undefined) return EMPTY;

        return new Observable<EventByType<T>>(subscriber => {
          const onEvent = (event: EventByType<T>) => {
            subscriber.next(event);
          };

          this.ngZone.runOutsideAngular(() => {
            instance.addEventListener(name, onEvent as any);
          });

          return () => {
            instance.removeEventListener(name, onEvent as any);
          };
        });
      }),
    );
  }
}
