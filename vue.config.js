const externalWebpackConfig = require('./webpack.config');

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: externalWebpackConfig,
};
