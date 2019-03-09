import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottieComponent } from './lottie.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LottieComponent],
  exports: [LottieComponent]
})
export class LottieModule {}
