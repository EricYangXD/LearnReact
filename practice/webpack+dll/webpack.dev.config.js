// DEVELOPMENT WEBPACK CONFIGURATION
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const template = (() => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../../app/index.dev.html"),
    "utf-8"
  );
  return content.replace(
    '<base href="/">',
    "<base href=\"/\"><script src='build/vendor.dll.js'></script>"
  );
})();
module.exports = require("./webpack.base.babel")({
  mode: "development",
  // Add hot reloading in development
  entry: [
    "eventsource-polyfill", // Necessary for hot reloading with IE
    "webpack-hot-middleware/client?reload=true",
    path.join(process.cwd(), "app/app.js"), // Start with js/app.js
  ],
  // Don't use hashes in dev mode for better performance
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    // 把dll引入
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "../../"),
      manifest: path.resolve(__dirname, "../../build/vendor.manifest.json"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunksSortMode: "none",
      templateContent: () => template,
    }),
  ],
  // 是否生成source-map，调试使用
  // devtool: 'eval-source-map',
  devtool: "none",
  performance: {
    hints: false,
  },
});
