import { Provider } from '@angular/core';

import { AnimationLoader } from './animation-loader';
import { LottieOptions, LOTTIE_OPTIONS } from './symbols';
import { CacheableAnimationLoader } from './cacheable-animation-loader/cacheable-animation-loader';

export function provideCacheableAnimationLoader(): Provider[] {
  return [
    {
      provide: AnimationLoader,
      useExisting: CacheableAnimationLoader,
    },
  ];
}

export function provideLottieOptions(options: LottieOptions): Provider[] {
  return [
    {
      provide: LOTTIE_OPTIONS,
      useValue: options,
    },
  ];
}
