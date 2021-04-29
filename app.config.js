/**
 * NODE_ENV
 * When you run npm start, it is always equal to 'development'
 *  when you run npm test it is always equal to 'test',
 * when you run npm run build to make a production bundle, it is always equal to 'production'
 */
const isProduction = process.env.NODE_ENV === 'production';
const config = {
  /**
   * 修改 webpack 默认配置
   * @param webpackConfig webpack 默认配置
   * @returns 最终实际使用的 webpack 配置
   */
  // eslint-disable-next-line arrow-body-style
  // webpack: (webpackConfig) => {
  //   webpackConfig.output.publicPath = isProduction ? '/test/' : '/';
  //   return webpackConfig;
  // },
};

module.exports = config;
