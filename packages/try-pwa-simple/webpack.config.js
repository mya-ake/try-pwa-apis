const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  plugins: [
    new GenerateSW({
      swDest: "sw.js",
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "/index.html"
    })
  ]
};
