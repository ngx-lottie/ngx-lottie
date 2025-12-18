import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';

import { appServerConfig } from './app/app.config.server';
import { AppComponent } from './app/app.component';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, appServerConfig, context);

export default bootstrap;
