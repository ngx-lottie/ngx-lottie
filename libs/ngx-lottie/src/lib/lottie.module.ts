import { NgModule, ModuleWithProviders } from '@angular/core';

import { LottieDirective } from './lottie.directive';
import { LottieComponent } from './lottie.component';
import { LottieOptions, LOTTIE_OPTIONS } from './symbols';

@NgModule({
  imports: [LottieDirective, LottieComponent],
  exports: [LottieDirective, LottieComponent],
})
export class LottieModule {
  static forRoot(options: LottieOptions): ModuleWithProviders<LottieModule> {
    return {
      ngModule: LottieModule,
      providers: [
        {
          provide: LOTTIE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
