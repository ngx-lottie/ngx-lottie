import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseDirective } from './base.directive';
import { AnimationLoader } from './animation-loader';
import { LottieDirective } from './lottie.directive';
import { LottieComponent } from './lottie.component';
import { LottiePlayerFactoryOrLoader, LOTTIE_PLAYER_FACTORY_OR_LOADER, IS_SAFARI } from './symbols';

export function isSafariFactory(): boolean {
  // This `try-catch` block will also handle server-side rendering
  // as `navigator` is not accessable there
  try {
    const { vendor, userAgent } = navigator;
    return (
      vendor.indexOf('Apple') > -1 &&
      userAgent.indexOf('CriOS') === -1 &&
      userAgent.indexOf('FxiOS') === -1
    );
  } catch {
    return false;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [BaseDirective, LottieDirective, LottieComponent],
  exports: [BaseDirective, LottieDirective, LottieComponent]
})
export class LottieModule {
  static forRoot(options: {
    player: LottiePlayerFactoryOrLoader;
  }): ModuleWithProviders<LottieModule> {
    return {
      ngModule: LottieModule,
      providers: [
        AnimationLoader,
        {
          provide: LOTTIE_PLAYER_FACTORY_OR_LOADER,
          useValue: options.player
        },
        {
          provide: IS_SAFARI,
          useFactory: isSafariFactory
        }
      ]
    };
  }
}
