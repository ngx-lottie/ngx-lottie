import baseConfig from '../../eslint.config.mjs';
import nx from '@nx/eslint-plugin';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/no-output-native': ['off'],
      '@typescript-eslint/no-non-null-assertion': ['off'],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
        },
      ],
    },
  },
];
