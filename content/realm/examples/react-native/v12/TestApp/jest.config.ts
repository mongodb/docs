// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'react-native',
  testTimeout: 30000,
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './testSetup.ts',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testRegex: '(/components/.*.(test|spec)).(tsx?|ts?)$',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@realm/react)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
