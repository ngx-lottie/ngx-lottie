import { NgModule, ModuleWithProviders, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { LottieServerOptions } from './symbols';
import { appInitializerFactory } from './internals';

export const LOTTIE_SERVER_OPTIONS = new InjectionToken<LottieServerOptions>(
  'LOTTIE_SERVER_OPTIONS'
);

@NgModule()
export class LottieServerModule {
  static forRoot(options: LottieServerOptions): ModuleWithProviders<LottieServerModule> {
    return {
      ngModule: LottieServerModule,
      providers: [
        {
          provide: LOTTIE_SERVER_OPTIONS,
          useValue: options
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFactory,
          multi: true,
          deps: [LOTTIE_SERVER_OPTIONS, TransferState]
        }
      ]
    };
  }
}
