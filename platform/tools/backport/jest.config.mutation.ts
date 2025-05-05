import baseConfig from './jest.config';

const config = {
  ...baseConfig,

  // only include "mutation" tests that cannot run on in parallel (like they are on CI) because they mutate shared state
  testRegex: ['.*.mutation.test.ts$'],
  modulePathIgnorePatterns: [],
};

export default config;
