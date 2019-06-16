import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseDirective } from './core/directives/base.directive';
import { LottieDirective } from './core/directives/lottie.directive';
import { LottieComponent } from './core/components/lottie.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BaseDirective, LottieDirective, LottieComponent],
  exports: [BaseDirective, LottieDirective, LottieComponent]
})
export class LottieModule {}
