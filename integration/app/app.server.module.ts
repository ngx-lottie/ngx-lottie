import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { LottieServerModule } from 'ngx-lottie-es5/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    LottieServerModule.forRoot({
      preloadAnimations: {
        folder: 'dist-integration/assets/animations',
        animations: ['data.json', '17893-work-from-home.json'],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
