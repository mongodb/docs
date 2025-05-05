import type { JestConfigWithTsJest } from 'ts-jest';

// ensure timezone is always in UTC
process.env.TZ = 'UTC';
process.env.NODE_ENV = 'jest';

const baseConfig: JestConfigWithTsJest = {
  prettierPath: null, // disable prettier until it is supported by jest
  transform: {
    '^.+\\.ts?$': ['ts-jest', { diagnostics: false }],
  },
  snapshotSerializers: ['jest-snapshot-serializer-ansi'],
  setupFiles: ['./src/test/setupFiles/automatic-mocks.ts'],
  setupFilesAfterEnv: ['./src/test/setupFiles/setup-after-env.ts'],
  preset: 'ts-jest',
  testRegex: 'src/.*test.ts$',
  testEnvironment: 'node',

  // exclude "private" tests that requires credentials and can therefore not run on CI for external contributors
  // exclude "mutation" tests that cannot run on in parallel (like they are on CI) because they mutate shared state
  modulePathIgnorePatterns: ['.*.private.test.ts$', '.*.mutation.test.ts$'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};

export default baseConfig;
