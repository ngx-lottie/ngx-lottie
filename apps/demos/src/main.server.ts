import { bootstrapApplication } from '@angular/platform-browser';

import { appServerConfig } from './app/app.config.server';
import { AppComponent } from './app/app.component';

const bootstrap = () => bootstrapApplication(AppComponent, appServerConfig);

export default bootstrap;
