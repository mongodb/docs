module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'plugin:testing-library/react'],
  env: {
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-new': 'off',
    'jsx-quotes': 0, // do not remove this line, this removes the requirement for double quotes in jsx/tsx. The single quotes in jsx help bluehawk replace testIDs in the generated snippets for the docs
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-max-props-per-line': [0, {'maximum': 4, 'when': 'multiline'}],
  },
};
