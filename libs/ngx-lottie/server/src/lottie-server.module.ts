import {
  NgModule,
  ModuleWithProviders,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';

import { appInitializer } from './internals';
import { LOTTIE_SERVER_OPTIONS, LottieServerOptions } from './symbols';

@NgModule()
export class LottieServerModule {
  static forRoot(options: LottieServerOptions): ModuleWithProviders<LottieServerModule> {
    return {
      ngModule: LottieServerModule,
      providers: [
        {
          provide: LOTTIE_SERVER_OPTIONS,
          useValue: options,
        },
        provideAppInitializer(appInitializer),
      ],
    };
  }
}

export function provideLottieServerOptions(options: LottieServerOptions) {
  return makeEnvironmentProviders([
    {
      provide: LOTTIE_SERVER_OPTIONS,
      useValue: options,
    },
    provideAppInitializer(appInitializer),
  ]);
}
