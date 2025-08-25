const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

module.exports = mergeConfig(config, {});
