import { base } from '@platform/eslint-config/base';

export default [
  ...base,
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
];
