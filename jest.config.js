const path = require('path');

/**
 * @type {import('@jest/types/build').Config.DefaultOptions}
 */
module.exports = {
  displayName: 'ngx-lottie',
  rootDir: path.resolve(),
  roots: ['src'],
  cacheDirectory: '<rootDir>/.cache',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json',
    },
  },
  bail: true,
  clearMocks: true,
  resetModules: true,
};
