module.exports = {
  env: {
    node: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["jest", "prettier"],
  rules: {
    "no-unused-vars": "warn"
  },
  overrides: [
    {
      "files": ["Examples/**/*.js"],
      "env": {
        "mocha": true,
      }
    },
    {
      "files": ["Examples/**/*.ts"],
      "parser": "@typescript-eslint/parser",
      "plugins": [
        "@typescript-eslint"
      ],
      rules: {
        "@typescript-eslint/ban-ts-comment": "warn",
      },
      "extends": ["eslint:recommended", "plugin:prettier/recommended", "plugin:@typescript-eslint/recommended"]
    }
  ]
};
