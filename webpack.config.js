const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "node",
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname + "/dist")
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.ts/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js/, loader: "source-map-loader" }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
