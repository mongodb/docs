/** @type {import('jest').Config} */
const config = {
  displayName: 'ssg-extension-unit-tests',
  verbose: false,
  testEnvironment: 'node',
  maxWorkers: 1,

  testMatch: ['<rootDir>/src/**/*.test.ts'],

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
