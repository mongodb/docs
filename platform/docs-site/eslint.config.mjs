import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { next as nextConfig } from '@platform/eslint-config/next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...nextConfig,
  {
    ignores: [
      '.next/**/*',
      'node_modules/**/*',
      'dist/**/*',
      'build/**/*',
      'out/**/*',
      '**/toc-data/data.copied.ts',
      'public/**/*',
      '**/table-of-contents/offline-docs/**/*',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'warn',
        {
          paths: [
            {
              name: '@emotion/styled',
              message:
                'Deprecated in docs-site — use CSS/SCSS modules instead. See UXE-1113.',
            },
          ],
          patterns: [
            {
              group: ['@leafygreen-ui/*'],
              message:
                'Deprecated in docs-site — use the @via-ds equivalent instead: @via-ds/components/* for components, @via-ds/icons for @leafygreen-ui/icon, @via-ds/tokens for @leafygreen-ui/palette and @leafygreen-ui/tokens, and CSS/SCSS modules for @leafygreen-ui/emotion. See UXE-1113.',
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
