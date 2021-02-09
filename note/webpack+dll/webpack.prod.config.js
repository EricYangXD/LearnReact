// webpack production config
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const { HashedModuleIdsPlugin } = require("webpack");

module.exports = require("./webpack.base.babel")({
  mode: "production",
  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), "app/app.js")],
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    nodeEnv: "production",
    sideEffects: true,
    concatenateModules: true,
    splitChunks: { chunks: "all" },
    runtimeChunk: true,
  },
  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: "app/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      chunksSortMode: "none",
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: "/",
      appShell: "/",
      excludes: [".htaccess"],
      caches: {
        main: [":rest:"],
        additional: ["*.chunk.js"],
      },
      safeToUseOptionalCaches: true,
    }),
    new HashedModuleIdsPlugin({
      hashFunction: "sha256",
      hashDigest: "hex",
      hashDigestLength: 20,
    }),
  ],
  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
