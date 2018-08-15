const externalWebpackConfig = require('./webpack.config');

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: externalWebpackConfig,
  chainWebpack: config => {
    // .mjs もトランスパイルの対象とするため
    config.module.rule('js').test(/\.m?jsx?$/);
  },
};
