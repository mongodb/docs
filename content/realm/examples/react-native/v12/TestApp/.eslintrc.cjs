module.exports = {
  root: '',
  extends: ['@react-native', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-max-props-per-line': [1, {when: 'multiline'}],
  },
};
