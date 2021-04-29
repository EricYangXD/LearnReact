# 举个实际的配置例子

## webpack 配置文件组成和结构

1. 一般分成三个文件：

- webpack.base.config.js:基础配置
- webpack.dev.config.js:开发环境配置
- webpack.prod.config.js:生产环境配置

2. package.json script，dll 命令用于项目优化。初次运行项目时，先执行 npm run dll，再执行 npm run dev。

```json
{
  "dev": "corsproxy & cross-env NODE_ENV=development webpack-dev-server --config webpack/webpack.dev.config.js --max_old_space_size=8192",
  "dll": "cross-env webpack --config webpack/webpack.dll.config.js"
}
```

3. webpack.base.config.js
