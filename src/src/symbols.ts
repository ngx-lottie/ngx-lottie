import { InjectionToken } from '@angular/core';

export interface BMEnterFrameEvent {
  currentTime: number;
  duration: number;
  totalTime: number;
  type: 'enterFrame';
}

export interface BMCompleteLoopEvent {
  type: 'loopComplete';
  loop: number;
  playCount: number;
  frameMult: number;
}

export interface BMCompleteEvent {
  type: 'complete';
  duration: number;
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

export type AnimationFilename = string;

export type AnimationEventName = import('lottie-web').AnimationEventName;

export type AnimationItem = import('lottie-web').AnimationItem;
export type AnimationConfigWithData = import('lottie-web').AnimationConfigWithData;
export type AnimationConfigWithPath = import('lottie-web').AnimationConfigWithPath;

export type LottiePlayer = typeof import('lottie-web').default;

/**
 * This looks as follows
 * @example
 * import player from 'lottie-web';
 * const factory = () => player;
 */
export type LottiePlayerFactory = () => typeof import('lottie-web').default;

/**
 * This looks as follows
 * @example
 * const factory = () => import('lottie-web');
 */
export type LottieLoader = () => Promise<typeof import('lottie-web')>;

export type LottiePlayerFactoryOrLoader = LottiePlayerFactory | LottieLoader;

export const LOTTIE_PLAYER_FACTORY_OR_LOADER = new InjectionToken<LottiePlayerFactoryOrLoader>(
  'LottiePlayerFactoryOrLoader'
);

export const IS_SAFARI = new InjectionToken<boolean>('IsSafari');

export type AnimationOptions = Partial<AnimationConfigWithData> | Partial<AnimationConfigWithPath>;
