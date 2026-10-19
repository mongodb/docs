/** @type {import('jest').Config} */
const config = {
  displayName: 'ssg-extension-unit-tests',
  verbose: false,
  testEnvironment: 'node',
  testTimeout: 10000,
  maxWorkers: 1,

  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/tests/**/*.test.ts'],

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
