import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, LottieModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
