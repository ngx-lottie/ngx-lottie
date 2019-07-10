import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, LottieModule],
  declarations: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  public ngDoBootstrap(app: ApplicationRef): void {
    app.bootstrap(AppComponent);
  }
}
