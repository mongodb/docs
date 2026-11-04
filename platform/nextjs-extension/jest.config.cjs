/** @type {import('jest').Config} */
const config = {
  displayName: 'unit-tests',
  verbose: false,
  testTimeout: 10000,
  testEnvironment: 'jest-environment-node',
  maxWorkers: 1,

  testMatch: ['<rootDir>/tests/**/*.test.(ts|js)'],

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
