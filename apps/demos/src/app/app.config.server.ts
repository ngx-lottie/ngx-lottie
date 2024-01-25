import { importProvidersFrom, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { LottieServerModule } from 'ngx-lottie/server';

import { appConfig } from './app.config';

export const appServerConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      LottieServerModule.forRoot({
        preloadAnimations: {
          folder: 'dist/apps/demos/browser/assets/animations',
          animations: ['data.json', '17893-work-from-home.json'],
        },
      }),
    ),
  ],
});
