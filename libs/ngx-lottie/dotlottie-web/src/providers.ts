import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DOT_LOTTIE_OPTIONS, DOT_LOTTIE_WASM_URL, type DotLottieOptions } from './symbols';

/**
 * Provides DotLottie configuration and optional features for the application.
 *
 * @param options - Configuration specifying how to load the `DotLottie` player class
 * @param features - Additional feature providers (e.g., `withDotLottieWasmUrl`)
 * @returns Environment providers for dependency injection
 *
 * @example
 * // Synchronous loading
 * import { DotLottie } from '@lottiefiles/dotlottie-web';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDotLottie({
 *       player: () => DotLottie,
 *     }),
 *   ],
 * };
 *
 * @example
 * // Lazy loading with custom WASM URL
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDotLottie(
 *       {
 *         player: () => import('@lottiefiles/dotlottie-web').then(m => m.DotLottie),
 *       },
 *       withDotLottieWasmUrl('/assets/dotlottie-player.wasm'),
 *     ),
 *   ],
 * };
 */
export function provideDotLottie(options: DotLottieOptions, ...features: EnvironmentProviders[]) {
  return makeEnvironmentProviders([
    {
      provide: DOT_LOTTIE_OPTIONS,
      useValue: options,
    },
    features,
  ]);
}

/**
 * Feature provider that configures a custom URL for the DotLottie WASM file.
 * The WASM URL is set lazily when the first DotLottie component renders,
 * rather than during app initialization.
 *
 * @param wasmUrl - Path or URL to the dotlottie-player WASM file.
 *                  Relative URLs will be resolved to absolute URLs automatically.
 *
 * @example
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDotLottie(
 *       { player: () => import('@lottiefiles/dotlottie-web').then(m => m.DotLottieWorker) },
 *       withDotLottieWasmUrl(() => 'http://localhost:4200/assets/dotlottie-player.wasm'),
 *     ),
 *   ],
 * };
 */
export function withDotLottieWasmUrl(wasmUrl: () => string) {
  return makeEnvironmentProviders([
    {
      provide: DOT_LOTTIE_WASM_URL,
      useFactory: wasmUrl,
    },
  ]);
}
