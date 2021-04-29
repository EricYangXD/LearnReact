const { merge } = require("webpack-merge");
const path = require("path");
const libs = ["@antv/g6", "lodash", "axios", "react", "react-dom", "moment"];
const vendors = [
  "./vendor/devicejs/device.js",
  "./vendor/velocity/velocity.js",
];

module.exports = merge({
  mode: "development",
  entry: {
    // 把不需要变化的库、包、文件放在这里
    vendor: [...libs, ...vendors],
  },
  output: {
    // 打包好之后的文件信息
    path: path.resolve(__dirname, "../../build"),
    filename: "[name].dll.js",
    library: "[name]_dll_lib",
  },
  module: {
    rules: [
      {
        // ...
      },
    ],
  },
  plugins: [
    // 配置生成的dll信息
    new webpack.DllPlugin({
      path: path.join(__dirname, "../../build", "[name].manifest.json"),
      name: "[name]_dll_lib",
    }),
  ],
});
