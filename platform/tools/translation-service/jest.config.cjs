/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
        // Tests compile as CommonJS, which rejects `with { type: "json" }`
        // (TS2823). The real ESM build accepts it; only the test transpile
        // needs this.
        diagnostics: { ignoreCodes: ["TS2823"] },
      },
    ],
  },
};
