const resolve = dir => require('path').resolve(__dirname, dir)

module.exports = {
  build: {
    env: require('./prod.env'),
    entrysPath: resolve('../src/views'), // 入口文件夹路径
    viewsPath: resolve('../dist/views'), // 打包后的HTML存放路径
    assetsRoot: resolve('../dist'), // 构建后的文件存放位置
    assetsSubDirectory: 'static', // 静态资源存放位置(JS,CSS,IMG,FONT...)
    assetsPublicPath: '/', // 给静态资源添加的绝对路径前缀 eg: src
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 2335,
    autoOpenBrowser: false,
    devtool: '#cheap-module-eval-source-map', // cheap-module-eval-source-map is faster for development
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
