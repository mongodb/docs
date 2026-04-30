/** @type {import('jest').Config} */
const config = {
  displayName: 'unit-tests',
  verbose: true,
  testTimeout: 10000,
  testEnvironment: 'jest-environment-node',

  testMatch: [
    '<rootDir>/src/persistence/tests/**/*.test.(ts|js)',
    '<rootDir>/tests/**/*.test.(ts|js)',
  ],

  setupFilesAfterEnv: ['<rootDir>/src/persistence/tests/setupAfterEnv.ts'],

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
