import { provideHttpClient } from '@angular/common/http';
import { APP_ID, ApplicationConfig } from '@angular/core';
import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'ngx-lottie-universal' },
    provideHttpClient(),
    provideLottieOptions({
      useWebWorker: true,
      player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
    }),
    provideCacheableAnimationLoader(),
  ],
};
