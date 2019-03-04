import { EventEmitter } from '@angular/core';

export interface LottieOptions {
  animationData?: any;
  container?: HTMLElement;
  renderer?: 'svg' | 'canvas' | 'html';
  autoloadSegments?: boolean;
  loop?: boolean | number;
  autoplay?: boolean;
  name?: string;
  path?: string;
  renderSettings?: {
    context?: CanvasRenderingContext2D;
    scaleMode?: string;
    viewBoxOnly?: boolean;
    viewBoxSize?: boolean;
    clearCanvas?: boolean;
    progressiveLoad?: boolean;
    hideOnTransparent?: boolean;
    preserveAspectRatio?: string;
    imagePreserveAspectRatio?: string;
    className?: string;
  };
}

export interface Lottie {
  // with 1 optional parameter name to target a specific animation
  play(name?: string): void;
  // with 1 optional parameter name to target a specific animation
  stop(name?: string): void;
  // first argument speed (1 is normal speed) - with 1 optional parameter name
  // to target a specific animation
  setSpeed(speed: number, name?: string): void;
  // first argument direction (1 is normal direction.) - with 1 optional parameter name
  // to target a specific animation
  setDirection(direction: number, name?: string): void;
  // default 'high', set 'high','medium','low', or a number > 1 to improve player performance.
  // In some animations as low as 2 won't show any difference
  setQuality(quality: 'high' | 'medium' | 'low' | number): void;
  // returns an animation instance to control individually
  loadAnimation(params: LottieOptions): AnimationItem;
  // you can register an element directly with registerAnimation.
  // It must have the "data-animation-path" attribute pointing at the data.json url
  registerAnimation(element: any, animationData?: any): AnimationItem;
  // looks for elements with class "lottie" or "bodymovin"
  searchAnimations(animationData?: any, standalone?: boolean, renderer?: string): void;
  // to destroy and release resources. The DOM element will be emptied
  destroy(name?: string): void;
}

export interface AnimationItem {
  play(): void;
  stop(): void;
  pause(): void;
  // one param speed (1 is normal speed)
  setSpeed(speed: number): void;
  // if false, it will respect the original AE fps. If true, it will update as much as possible
  // (true by default)
  setSubframe(flag: boolean): void;
  // first param is a numeric value. second param is a boolean
  // that defines time or frames for first param
  goToAndPlay(value: number, isFrame: boolean): void;
  // first param is a numeric value. second param is a boolean
  // that defines time or frames for first param
  goToAndStop(value: number, isFrame: boolean): void;
  // first param is a single array or multiple arrays of two values each(fromFrame,toFrame)
  // second param is a boolean for forcing the new segment right away
  playSegments(segments: number[] | number[][], forceFlag: boolean): void;
  // to destroy and release resources
  destroy(): void;
  // returns duration in seconds or in frames
  getDuration(inFrames: boolean): number;
  // listen to the specific event dispatched by `AnimationItem`
  addEventListener(name: LottieEventName, callback: (event: LottieEvent) => void): void;
  // remove specific event listener
  removeEventListener(name: LottieEventName, callback: (event: LottieEvent) => void): void;
  // sets `display = none` on the rendered element
  hide(): void;
  // can be used if the animation is rendered on the canvas element
  resize(): void;
  // sets `display = block` on the rendered element
  show(): void;
  // one param direction (1 is normal direction)
  setDirection(direction: Direction): void;
  // configures animation using provided options
  configAnimation(animationData: any): void;
  getAssetsPath(assetData: any): string;
  getAssetData(id: number): any | undefined;
}

export type Direction = 1 | -1;

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

export type LottieEvent =
  | BMEnterFrameEvent
  | BMCompleteLoopEvent
  | BMCompleteEvent
  | BMSegmentStartEvent
  | BMDestroyEvent
  | void;

export type LottieEventName =
  | 'complete'
  | 'loopComplete'
  | 'enterFrame'
  | 'segmentStart'
  | 'config_ready'
  | 'data_ready'
  | 'data_failed'
  | 'loaded_images'
  | 'DOMLoaded'
  | 'destroy';

export type MappedLottieEventName =
  | 'complete'
  | 'loopComplete'
  | 'enterFrame'
  | 'segmentStart'
  | 'configReady'
  | 'dataReady'
  | 'dataFailed'
  | 'loadedImages'
  | 'domLoaded'
  | 'destroy';

export type LottieCSSStyleDeclaration = Partial<CSSStyleDeclaration>;

export interface LottieComponentConfigurable {
  complete: EventEmitter<BMCompleteEvent>;
  loopComplete: EventEmitter<BMCompleteLoopEvent>;
  enterFrame: EventEmitter<BMEnterFrameEvent>;
  segmentStart: EventEmitter<BMSegmentStartEvent>;
  configReady: EventEmitter<void>;
  dataReady: EventEmitter<void>;
  dataFailed: EventEmitter<void>;
  loadedImages: EventEmitter<void>;
  domLoaded: EventEmitter<void>;
  destroy: EventEmitter<BMDestroyEvent>;
}
