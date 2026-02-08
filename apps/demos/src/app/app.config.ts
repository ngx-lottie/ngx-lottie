import { provideHttpClient } from '@angular/common/http';
import {
  APP_ID,
  ApplicationConfig,
  DOCUMENT,
  inject,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';

import { routes } from './app.routes';
import { provideDotLottie, withDotLottieWasmUrl } from 'ngx-lottie/dotlottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'ngx-lottie-universal' },
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideLottieOptions({
      // Temporary disabled because ESBuild renames the `workerSelf` variable.
      // useWebWorker: true,
      player: () => import('lottie-web'),
    }),
    provideDotLottie(
      {
        player: () => import('./dotlottie-worker').then(m => m.DotLottieWorker),
      },
      // Workers don't have access to the same base URL resolution as the main thread.
      withDotLottieWasmUrl(() => {
        const document = inject(DOCUMENT);
        return `${document.location.origin}/assets/dotlottie-player.wasm`;
      }),
    ),
    provideCacheableAnimationLoader(),
  ],
};
