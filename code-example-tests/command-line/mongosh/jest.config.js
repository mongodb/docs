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
};

