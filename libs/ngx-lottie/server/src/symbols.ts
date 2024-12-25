import { InjectionToken } from '@angular/core';

export interface LottieServerOptions {
  preloadAnimations: {
    folder: string;
    animations: string[];
  };
}

export type PathToAnimation = string;
export type AnimationData = string;

export const LOTTIE_SERVER_OPTIONS = new InjectionToken<LottieServerOptions>('LottieServerOptions');
