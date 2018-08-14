/**
 * このwebpack.config.jsはvue.config.jsでimportして使う
 */

const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.mjs'],
  },
  plugins: [
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
