import type { Config } from 'jest';

const config: Config = {
  displayName: 'unit-tests',
  verbose: true,
  testTimeout: 10000,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',

  testMatch: [
    '<rootDir>/src/**/*.test.(ts|tsx)',
  ],

  setupFilesAfterEnv: ['<rootDir>/src/tests/testSetup.ts'],

  moduleNameMapper: {
    // CSS Modules (mock with identity-obj-proxy)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Static file imports (mock as empty string or stub)
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$':
      '<rootDir>/src/tests/__mocks__/fileMock.ts',
    // Aliases like @components/*, @utils/*
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};

export default config;
