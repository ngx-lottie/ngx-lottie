import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { isSafariFactory } from './utils';
import { BaseDirective } from './base.directive';
import { AnimationCache } from './animation-cache';
import { AnimationLoader } from './animation-loader';
import { LottieDirective } from './lottie.directive';
import { LottieComponent } from './lottie.component';
import { LottieOptions, LOTTIE_OPTIONS, IS_SAFARI, ANIMATION_CACHE } from './symbols';

@NgModule({
  imports: [CommonModule],
  declarations: [BaseDirective, LottieDirective, LottieComponent],
  exports: [BaseDirective, LottieDirective, LottieComponent]
})
export class LottieModule {
  static forRoot(options: LottieOptions): ModuleWithProviders<LottieModule> {
    return {
      ngModule: LottieModule,
      providers: [
        AnimationLoader,
        {
          provide: LOTTIE_OPTIONS,
          useValue: options
        },
        {
          provide: IS_SAFARI,
          useFactory: isSafariFactory
        },
        {
          provide: ANIMATION_CACHE,
          useFactory: AnimationCache.create,
          deps: [LOTTIE_OPTIONS]
        }
      ]
    };
  }
}
