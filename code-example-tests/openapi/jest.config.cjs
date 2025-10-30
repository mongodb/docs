const SECONDS = 1000;

const config = {
  testTimeout: 120 * SECONDS,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(oasprey)/)'
  ]
};
module.exports = config;
