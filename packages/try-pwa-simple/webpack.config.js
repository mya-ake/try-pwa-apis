const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  plugins: [
    new GenerateSW({
      swDest: "sw.js"
    })
  ]
};
