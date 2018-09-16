const path = require('path');
const externalWebpackConfig = require('./webpack.config');

const resolve = pathname => {
  return path.resolve(__dirname, pathname);
};

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        includePaths: [resolve('node_modules')],
      },
    },
  },
  configureWebpack: externalWebpackConfig,
  chainWebpack: config => {
    // .mjs もトランスパイルの対象とするため
    config.module.rule('js').test(/\.m?jsx?$/);
    // doc ブロックの loader を定義（なにもしない）
    config.module
      .rule('doc')
      .oneOf('doc')
      .resourceQuery(/blockType=doc/)
      .use('through-loader')
      .loader(require.resolve('./loaders/through-loader.js'))
      .end();
  },
};
