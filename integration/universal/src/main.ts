import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await platformBrowserDynamic().bootstrapModule(AppModule);
  } catch (e) {
    console.error(e);
  }
});
