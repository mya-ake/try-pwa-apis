/**
 * このwebpack.config.jsはvue.config.jsでimportして使う
 */

const webpack = require('webpack');
const workboxPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY),
    },
  }),
];

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
    extensions: ['.mjs', '.scss'],
    alias: {
      '~~': __dirname,
    },
  },

  plugins,
};
