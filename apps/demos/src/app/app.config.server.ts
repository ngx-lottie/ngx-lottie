import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideLottieServerOptions } from 'ngx-lottie/server';

import { appConfig } from './app.config';

declare const ngDevMode: boolean;

export const appServerConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    provideLottieServerOptions({
      preloadAnimations: {
        folder: ngDevMode
          ? 'apps/demos/src/assets/animations'
          : 'dist/apps/demos/browser/assets/animations',
        animations: ['data.json', '17893-work-from-home.json'],
      },
    }),
  ],
});
