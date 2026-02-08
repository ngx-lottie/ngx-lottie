import { InjectionToken } from '@angular/core';

/**
 * Factory function that returns the `DotLottie` player class synchronously.
 * Use this when bundling package directly in your application bundle.
 *
 * @example
 * import { DotLottieWorker } from '@lottiefiles/dotlottie-web';
 * const player = () => DotLottieWorker;
 */
type DotLottiePlayerFactory = () =>
  | typeof import('@lottiefiles/dotlottie-web').DotLottie
  | typeof import('@lottiefiles/dotlottie-web').DotLottieWorker;

/**
 * Loader function that returns a Promise resolving to the `DotLottie` player class.
 * Use this for lazy-loading package to reduce initial bundle size.
 * The library will only be loaded when the first animation is created.
 *
 * @example
 * const player = () => import('@lottiefiles/dotlottie-web').then(({ DotLottie }) => DotLottie);
 */
type DotLottiePlayerLoader = () => Promise<
  | typeof import('@lottiefiles/dotlottie-web').DotLottie
  | typeof import('@lottiefiles/dotlottie-web').DotLottieWorker
>;

/**
 * Union type allowing either synchronous or asynchronous `DotLottie` player class loading.
 */
export type DotLottiePlayerFactoryOrLoader = DotLottiePlayerFactory | DotLottiePlayerLoader;

export interface DotLottieOptions {
  player: DotLottiePlayerFactoryOrLoader;
}

export const DOT_LOTTIE_OPTIONS = new InjectionToken<DotLottieOptions>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'DOT_LOTTIE_OPTIONS' : '',
);

/**
 * Optional injection token for custom WASM URL.
 * If provided, the base directive will configure it before creating DotLottie instances.
 */
export const DOT_LOTTIE_WASM_URL = new InjectionToken<string>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'DOT_LOTTIE_WASM_URL' : '',
);
