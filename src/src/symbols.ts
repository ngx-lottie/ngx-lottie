import { InjectionToken } from '@angular/core';

import { AnimationCache } from './animation-cache';

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
  player: LottiePlayerFactoryOrLoader;
  useCache?: boolean;
}

export type AnimationConfigWithData = import('lottie-web').AnimationConfigWithData;
export type AnimationConfigWithPath = import('lottie-web').AnimationConfigWithPath;

export type AnimationOptions = Partial<AnimationConfigWithData> | Partial<AnimationConfigWithPath>;

export const LOTTIE_OPTIONS = new InjectionToken<LottieOptions>('LottieOptions');
export const ANIMATION_CACHE = new InjectionToken<AnimationCache | null>('AnimationCache');
