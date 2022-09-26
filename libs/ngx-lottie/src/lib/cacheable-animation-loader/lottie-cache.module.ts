import { ModuleWithProviders, NgModule } from '@angular/core';

import { AnimationLoader } from '../animation-loader';
import { CacheableAnimationLoader } from './cacheable-animation-loader';

@NgModule()
export class LottieCacheModule {
  static forRoot(): ModuleWithProviders<LottieCacheModule> {
    return {
      ngModule: LottieCacheModule,
      providers: [
        {
          provide: AnimationLoader,
          useExisting: CacheableAnimationLoader,
        },
      ],
    };
  }
}
