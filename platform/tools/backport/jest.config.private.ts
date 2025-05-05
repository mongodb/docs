import baseConfig from './jest.config';

const config = {
  ...baseConfig,

  // only include (private) tests that cannot run on CI because they require credentials and thus exclude external contributors
  testRegex: ['.*.private.test.ts$'],
  modulePathIgnorePatterns: [],
};

export default config;
