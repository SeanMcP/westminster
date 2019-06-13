const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "node",
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "app.js",
    path: path.join(__dirname + "/dist")
  },
  watch: true,
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.ts/, loader: "awesome-typescript-loader", exclude: "/node_modules/" },
      { enforce: "pre", test: /\.js/, loader: "source-map-loader" }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
