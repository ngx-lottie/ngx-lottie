import { provideHttpClient } from '@angular/common/http';
import { APP_ID, ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'ngx-lottie-universal' },
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideLottieOptions({
      // Temporary disabled because ESBuild renames the `workerSelf` variable.
      // useWebWorker: true,
      player: () => import('lottie-web'),
    }),
    provideCacheableAnimationLoader(),
  ],
};
