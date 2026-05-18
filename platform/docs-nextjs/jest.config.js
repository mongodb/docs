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
    'node_modules/(?!(\\.pnpm/(react-children-utilities|github-slugger)@|react-children-utilities/|github-slugger/))',
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
