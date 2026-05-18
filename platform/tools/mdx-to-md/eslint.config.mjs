import { base } from '@platform/eslint-config/base';

export default [
  ...base,
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
];
