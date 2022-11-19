import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  chromeWebSecurity: false,
  fileServerFolder: '.',
  screenshotOnRunFailure: false,
  e2e: {
    supportFile: false,
    fixturesFolder: false,
    specPattern: './src/e2e/**/*.cy.ts',
  },
});
