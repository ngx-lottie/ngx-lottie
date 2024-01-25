import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, appConfig);
});
