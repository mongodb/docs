module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-react-jsx',
  ],
};
