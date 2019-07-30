/* eslint-disable import/no-extraneous-dependencies */
const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackPlugin
} = require('customize-cra');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addDecoratorsLegacy(),
  addWebpackPlugin(new MomentLocalesPlugin({
    localesToKeep: ['ko-kr']
  }))
);
