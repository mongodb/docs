/** @type {import('jest').Config} */
const config = {
  displayName: 'unit-tests',
  verbose: false,
  testTimeout: 10000,
  testEnvironment: 'jest-environment-node',
  maxWorkers: 1,

  testMatch: [
    '<rootDir>/src/persistence/tests/**/*.test.(ts|js)',
    '<rootDir>/tests/**/*.test.(ts|js)',
  ],

  setupFilesAfterEnv: ['<rootDir>/src/persistence/tests/setupAfterEnv.ts'],

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    '^.+\\.(ts|js)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        useESM: false,
      },
    ],
  },
};

module.exports = config;
