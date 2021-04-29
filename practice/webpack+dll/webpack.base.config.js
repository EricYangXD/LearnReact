/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
process.noDeprecation = true;

const getPath = (pathStr) => path.resolve(process.cwd(), pathStr);
// 以函数的形式导出，在对应环境的配置文件中引入并传入对应环境的的配置参数
module.exports = (options) => ({
  // 环境，必须设置
  mode: options.mode,
  // 入口
  entry: options.entry,
  // 出口
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), "build"),
    },
    options.output
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    noParse: (content) =>
      /html2canvas|object_hash.js|less.js|@antv\/g6/.test(content),
    // 配置loader
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src"), resolve("test")],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      $: "jquery",
      moment: "moment",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyWebpackPlugin([
      { from: "backbone/img", to: "img" },
      { from: "app/images", to: "images" },
    ]),
  ]),
  resolve: {
    modules: ["node_modules", "app", "backbone", "cards"],
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"],
    alias: {
      // 配置路径别名
      src: resolve("src"),
      assets: resolve("src/assets"),
      components: resolve("src/components"),
    },
  },
  devtool: options.devtool,
  target: "web", // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  devServer: {
    contentBase: process.cwd(),
    port: process.env.PORT || 3003,
    hot: true,
    compress: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    stats: {
      colors: true,
      assets: false,
      modules: false,
      children: false,
    },
    historyApiFallback: true,
    proxy: {
      //跨域设置
      "/api": {
        target: "http://www.baidu.com/",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // 引用CDN资源
  externals: {
    antd: "antd", // 672KB
    moment: "moment", // 34.5KB
    jquery: "jQuery", // 61KB
  },
});
