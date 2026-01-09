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
    // Aliases like @components/*, @utils/*
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.(ts|tsx)$': [
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
