// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: "node",
  projects: [
    {
      displayName: "JavaScript",
      moduleFileExtensions: ["js"],
      testMatch: ["<rootDir>/Examples/**/*.js"],
      setupFilesAfterEnv: ["<rootDir>/testSetup.js"],
      modulePathIgnorePatterns: [
        "<rootDir>/Examples/rn",
        "<rootDir>/Examples/server_google_auth",
        "<rootDir>/Examples/schemas",
      ],
    },
    {
      displayName: "TypeScript",
      moduleFileExtensions: ["ts", "js"],
      preset: "ts-jest/presets/js-with-ts",
      setupFilesAfterEnv: ["<rootDir>/testSetup.js"],
      modulePathIgnorePatterns: ["<rootDir>/Examples/rn"],
      testMatch: ["<rootDir>/Examples/**/*.ts"],
      transform: {
        "^.+\\.ts$": "ts-jest",
      },
    },
  ],
};
