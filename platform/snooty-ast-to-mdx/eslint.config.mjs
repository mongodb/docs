import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

const ALL_FILES = '**/*.{ts,tsx,js,jsx,mjs,cjs}';

export default defineConfig([
  globalIgnores(['node_modules/*', 'dist/*']),
  {
    files: [ALL_FILES],
    plugins: { js },
    extends: ['js/recommended'],
  },
  // this needs to be after the js-specific rules, because of overrides
  {
    files: [ALL_FILES],
    plugins: { tseslint },
    extends: [tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  // prettier rules need to be last
  {
    files: [ALL_FILES],
    plugins: { prettier },
    extends: [eslintConfigPrettier],
    rules: { 'prettier/prettier': 'error' },
  },
]);
