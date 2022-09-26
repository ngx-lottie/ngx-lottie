import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LottieComponent, provideLottieOptions, provideCacheableAnimationLoader } from 'ngx-lottie';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ngx-lottie-universal' }),
    HttpClientModule,
    LottieComponent,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    provideLottieOptions({
      useWebWorker: true,
      player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
    }),
    provideCacheableAnimationLoader(),
  ],
})
export class AppModule {}
