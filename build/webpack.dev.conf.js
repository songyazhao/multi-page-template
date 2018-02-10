/**
 * @author SongYaZhao
 * email: syazhao@foxmail.com
 * github: https://github.com/songyazho
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
const config = require('../config')
const utils = require('./utils')

const resolve = dir => path.resolve(__dirname, dir)

const devWebpackConfig = {
  entry: { main: resolve('../src/main.js') }, // 主入口
  devtool: config.dev.devtool,
  plugins: [
    new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
    new webpack.DefinePlugin({ 'process.env': config.dev.env }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
}

utils.addQueueFile(devWebpackConfig)

module.exports = merge(baseWebpackConfig, devWebpackConfig)
