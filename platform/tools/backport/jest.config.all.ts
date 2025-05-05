import baseConfig from './jest.config';

const config = {
  ...baseConfig,

  modulePathIgnorePatterns: [],
  testSequencer: './jest.testSequencer.js',
};

export default config;
