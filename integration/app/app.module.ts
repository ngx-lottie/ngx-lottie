import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie-es5';

import { AppComponent } from './app.component';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ngx-lottie-universal' }),
    BrowserTransferStateModule,
    HttpClientModule,
    LottieModule.forRoot({
      player: playerFactory,
      useCache: true,
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
