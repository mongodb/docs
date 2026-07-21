/** @type {import('jest').Config} */
const config = {
  displayName: 'unit-tests',
  verbose: false,
  testTimeout: 10000,
  testEnvironment: 'jest-environment-jsdom',
  maxWorkers: 8,

  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],

  setupFiles: ['<rootDir>/src/tests/setup-env.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/test-setup.ts'],

  snapshotSerializers: ['@emotion/jest/serializer'],

  moduleNameMapper: {
    // CSS Modules (mock with identity-obj-proxy)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Static file imports (mock as empty string or stub)
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.ts',
    // gitignored generated files — point to committed stubs so jest.mock() factories can override them
    '^@/context/toc-data/data\\.copied$': '<rootDir>/src/tests/__mocks__/toc-data-stub.ts',
    '^@/generated/prefix-map\\.json$': '<rootDir>/src/tests/__mocks__/prefix-map-stub.json',
    // Aliases like @components/*, @utils/*
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transformIgnorePatterns: [
    // Ignore (do NOT transform) every pnpm-virtual-store package EXCEPT the allowlisted ESM-only
    // packages below, which jest (CJS) must transform to import. The remark/unified/mdast/micromark/
    // unist/vfile ecosystem is pure ESM and is exercised by remark-resolve-imports tests. The pattern
    // requires the `.pnpm/<name>@` segment so the package's nested `node_modules/<name>/` re-export
    // path does not get spuriously ignored.
    'node_modules/\\.pnpm/(?!(react-children-utilities|github-slugger|unified|bail|trough|is-plain-obj|extend|vfile|vfile-message|remark|remark-parse|remark-stringify|remark-mdx|remark-frontmatter|remark-gfm|mdast-util-[^@]+|micromark[^@]*|unist-util-[^@]+|decode-named-character-reference|character-entities[^@]*|character-reference-invalid|ccount|escape-string-regexp|longest-streak|markdown-table|zwitch|estree-util-[^@]+|devlop|parse-entities|stringify-entities|space-separated-tokens|comma-separated-tokens|html-void-elements|property-information|hast-util-[^@]+|is-decimal|is-hexadecimal|is-alphanumerical|is-alphabetical|fault|format)@)',
  ],

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        useESM: false,
      },
    ],
  },
};

module.exports = config;
