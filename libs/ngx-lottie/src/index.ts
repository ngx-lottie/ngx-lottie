export { AnimationLoader } from './lib/animation-loader';

export { provideLottieOptions, provideCacheableAnimationLoader } from './lib/providers';

export { BaseDirective } from './lib/base.directive';
export { LottieDirective } from './lib/lottie.directive';
export { LottieComponent } from './lib/lottie.component';
export { LottieTransferState } from './lib/transfer-state';
export {
  BMEnterFrameEvent,
  BMCompleteLoopEvent,
  BMCompleteEvent,
  BMSegmentStartEvent,
  BMDestroyEvent,
  BMRenderFrameErrorEvent,
  BMConfigErrorEvent,
  AnimationOptions,
  AnimationFilename,
} from './lib/symbols';
export { transformAnimationFilenameToKey } from './lib/server';

export * from './private_export';
