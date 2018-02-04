const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin') // webpack插件，用于清除目录文件
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
const config = require('../config')
const utils = require('./utils')

const resolve = dir => path.resolve(__dirname, dir)

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin // 对指定的chunks进行公共模块的提取 多个html共用一个js文件(chunk)，可用CommonsChunkPlugin

const entry = { main: resolve('../src/main.js') } // 主入口
const entryKeys = []

const propWebpackConfig = {
  entry,
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // 在编译出现错误时, 来跳过输出阶段
    new ExtractTextPlugin(utils.assetsPath('css/[name]-[ContentHash:7].css')), // 页面中提取的css名字
    new CleanPlugin( // 每次打包 自动删除之前的旧文件
      [config.build.assetsSubDirectory], {
        root: config.build.assetsRoot, // 基于此目录查找
        verbose: true, // 是否开启在控制台输出信息
        watch: true, // 默认false 为true时删除所有的编译文件
        // exclude: [] // 要排除的目录
      }
    ),
    new CommonsChunkPlugin({ // 提取JS中公共模块
      name: ['main', ...entryKeys], // or   names: Array 对应entry上的键值
      filename: utils.assetsPath('js/vendor.[ChunkHash:7].js'), // 生成文件的名字，如果没有默认为输出文件名
      minChunks: 3, // 模块被引用的次数多少才会被独立打包>=2
      //  chunks: // 表示需要在哪些chunk（也可以理解为webpack配置中entry的每一项）里寻找公共代码进行打包。不设置此参数则默认提取范围为所有的chunk
    })
  ]
}

utils.addQueueFile(propWebpackConfig, entryKeys)

module.exports = merge(baseWebpackConfig, propWebpackConfig)
