import { base } from '@platform/eslint-config/base';
import jsdocPlugin from 'eslint-plugin-jsdoc';

export default [
  ...base,
  {
    ignores: ['build/**'],
  },
  {
    plugins: { jsdoc: jsdocPlugin },
    rules: {
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'jsdoc/require-asterisk-prefix': ['error', 'never'],
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
    },
  },
];
