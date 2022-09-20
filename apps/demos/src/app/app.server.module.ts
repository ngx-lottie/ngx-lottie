import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { LottieServerModule } from 'ngx-lottie/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    LottieServerModule.forRoot({
      preloadAnimations: {
        folder: 'dist/apps/demos/browser/assets/animations',
        animations: ['data.json', '17893-work-from-home.json'],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
