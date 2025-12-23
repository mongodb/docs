export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  testTimeout: 30000,
  maxWorkers: 1,
  detectOpenHandles: true,
  // Ensure CommonJS modules work correctly
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [
    'node_modules/(?!(mongodb)/)',
  ],
  // Global setup/teardown for sample data checking
  globalSetup: './jest.globalSetup.js',
  globalTeardown: './jest.globalTeardown.js',
};

