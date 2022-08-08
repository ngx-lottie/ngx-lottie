import { InjectionToken } from '@angular/core';

export interface BMEnterFrameEvent {
  type: 'enterFrame';
  currentTime: number;
  totalTime: number;
  duration: number;
}

export interface BMCompleteLoopEvent {
  type: 'loopComplete';
  currentLoop: boolean | number;
  totalLoops: number;
  direction: number;
}

export interface BMCompleteEvent {
  type: 'complete';
  direction: number;
}

export interface BMSegmentStartEvent {
  type: 'segmentStart';
  firstFrame: number;
  totalFrames: number;
}

export interface BMDestroyEvent {
  target: AnimationItem;
  type: 'destroy';
}

export interface BMRenderFrameErrorEvent {
  type: 'renderFrameError';
  nativeError: Error;
  currentTime: number;
}

export interface BMConfigErrorEvent {
  type: 'configError';
  nativeError: Error;
}

export type LottieEvent =
  | BMEnterFrameEvent
  | BMCompleteLoopEvent
  | BMCompleteEvent
  | BMSegmentStartEvent
  | BMDestroyEvent
  | BMRenderFrameErrorEvent
  | BMConfigErrorEvent
  | void;

export type CamelizedAnimationEventName =
  | 'complete'
  | 'loopComplete'
  | 'enterFrame'
  | 'segmentStart'
  | 'configReady'
  | 'dataReady'
  | 'domLoaded'
  | 'destroy'
  | 'error';

export type EventsMap = { [key in CamelizedAnimationEventName]: AnimationEventName };

export type AnimationFilename = string;
export type AnimationEventName = import('lottie-web').AnimationEventName;
export type AnimationItem = import('lottie-web').AnimationItem;
export type LottiePlayer = typeof import('lottie-web').default;

/**
 * @example
 * import player from 'lottie-web';
 * const factory = () => player;
 */
type LottiePlayerFactory = () => LottiePlayer;

/**
 * @example
 * const factory = () => import('lottie-web');
 */
type LottieLoader = () => Promise<typeof import('lottie-web')>;

export type LottiePlayerFactoryOrLoader = LottiePlayerFactory | LottieLoader;

export interface LottieOptions {
  // Determines whether to load files on a separate worker. Note: workers cannot load
  // animations from URLs (if `options.path` is defined).
  useWebWorker?: boolean;
  player: LottiePlayerFactoryOrLoader;
}

export type RendererType = import('lottie-web').RendererType;

export type AnimationConfigWithData<R extends RendererType = 'svg'> =
  import('lottie-web').AnimationConfigWithData<R>;
export type AnimationConfigWithPath<R extends RendererType = 'svg'> =
  import('lottie-web').AnimationConfigWithPath<R>;

export type AnimationOptions<R extends RendererType = 'svg'> =
  | Partial<AnimationConfigWithData<R>>
  | Partial<AnimationConfigWithPath<R>>;

export const LOTTIE_OPTIONS = new InjectionToken<LottieOptions>('LottieOptions');
