import { createTransformer } from 'babel-jest';

const babelOptions = {
  presets: ['next/babel', '@emotion/babel-preset-css-prop', '@babel/preset-typescript'],
  plugins: ['@emotion'],
};

export default createTransformer(babelOptions);
