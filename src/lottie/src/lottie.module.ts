import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseDirective } from './directives/base.directive';
import { LottieDirective } from './directives/lottie.directive';
import { LottieComponent } from './components/lottie.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BaseDirective, LottieDirective, LottieComponent],
  exports: [BaseDirective, LottieDirective, LottieComponent]
})
export class LottieModule {}
