/** @type {import('jest').Config} */
const config = {
  displayName: 'unit-tests',
  verbose: true,
  testTimeout: 10000,
  testEnvironment: 'jest-environment-jsdom',

  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],

  setupFiles: ['<rootDir>/src/tests/setup-env.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/test-setup.ts'],

  snapshotSerializers: ['@emotion/jest/serializer'],

  moduleNameMapper: {
    // CSS Modules (mock with identity-obj-proxy)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Static file imports (mock as empty string or stub)
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.ts',
    // data.copied is gitignored — point to a committed stub so jest.mock() factories can override it
    '^@/context/toc-data/data\\.copied$': '<rootDir>/src/tests/__mocks__/toc-data-stub.ts',
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

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

module.exports = config;
