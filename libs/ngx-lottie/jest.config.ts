/* eslint-disable */
export default {
  bail: true,
  name: 'ngx-lottie',
  displayName: 'ngx-lottie',
  preset: '../../jest.preset.js',
  coverageReporters: ['lcov', 'cobertura'],
  coverageDirectory: '../../coverage/libs/ngx-lottie',
  collectCoverageFrom: ['./src/**/!(index).ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\\.(html|svg)$',

        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
