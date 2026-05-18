module.exports = {
  testEnvironment: "node",
  maxWorkers: 2,
  setupFiles: ["<rootDir>/src/test/jestSetUp.ts"],
  testPathIgnorePatterns: ["<rootDir>/build"],
  globalSetup: "<rootDir>/src/test/globalSetup.ts",
  globalTeardown: "<rootDir>/src/test/globalTeardown.ts",
  transform: {
    "^.+\\.(ts|js)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
};

