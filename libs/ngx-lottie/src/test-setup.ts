import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
globalThis.ngServerMode = false;
setupZoneTestEnv();
