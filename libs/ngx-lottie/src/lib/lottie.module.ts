import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';
import { LottieDirective } from './lottie.directive';
import { LottieComponent } from './lottie.component';
import { LottieOptions, LOTTIE_OPTIONS } from './symbols';

@NgModule({
  imports: [CommonModule],
  declarations: [BaseDirective, LottieDirective, LottieComponent],
  exports: [BaseDirective, LottieDirective, LottieComponent],
})
export class LottieModule {
  static forRoot(options: LottieOptions): ModuleWithProviders<LottieModule> {
    return {
      ngModule: LottieModule,
      providers: [
        AnimationLoader,
        {
          provide: LOTTIE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
