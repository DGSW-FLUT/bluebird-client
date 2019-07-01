/* eslint-disable import/no-extraneous-dependencies */
const {
  override,
  fixBabelImports
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
);
