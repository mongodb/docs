/* eslint-disable */
const { defaultsESM } = require('ts-jest/presets');

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  maxWorkers: 1,
  transform: {
    ...defaultsESM.transform,
    '^.+\\.m?[jt]s$': ['ts-jest', { useESM: true }],
  },
  transformIgnorePatterns: [],
};
