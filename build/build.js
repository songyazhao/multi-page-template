const config = require('../config')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV)
}

const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  编译完成...'))
  console.log(chalk.yellow(`
  Tip: 接下来你可以将编译后的文件上传到服务器上了
       页面存放路径: ${config.build.viewsPath}
       静态资源存放路径: ${path.join(config.build.assetsRoot, config.build.assetsSubDirectory)}
  `))
})
