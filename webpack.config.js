/**
 * このwebpack.config.jsはvue.config.jsでimportして使う
 */

const workboxPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [];
if (isProduction) {
  plugins.push(
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: false,
    }),
  );
}

module.exports = {
  resolve: {
    extensions: ['.mjs'],
    alias: {
      '~~': __dirname,
    },
  },

  plugins,
};
