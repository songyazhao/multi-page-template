/**
 * @author SongYaZhao
 * email: syazhao@foxmail.com
 * github: https://github.com/songyazho
 */

const utils = require('./utils')
const config = require('../config')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = (dir) => path.join(__dirname, '..', dir)

const publicPath = process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath

module.exports = {
  context: resolve('/'),
  resolve: {
    extensions: ['.js', '.ejs', '.json', '.styl'],
    alias: {
      '@': resolve('src')
    }
  },
  output: {
    path: config.build.assetsRoot,
    filename: process.env.NODE_ENV === 'production' ? utils.assetsPath('js/[name].[ChunkHash:7].js') : '[name].js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'ejs-compiled-loader',
            options: {
              compileDebug: true,
              'htmlmin': true,
              'htmlminOptions': {
                // https://github.com/kangax/html-minifier#options-quick-reference
                removeComments: true
              }
            }
          }, {
            loader: 'extract-loader',
            options: {
              publicPath
            }
          }, {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href']
            }
          }
        ]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1!postcss-loader'
        })
      }, {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader!stylus-loader'
        })
      }, {
        test: /\.js$/,
        loader: 'babel-loader', // ES6转ES5
        include: resolve('src'), // 包含的检测目录
        exclude: resolve('node_modules'), // 排除的检测目录
        options: {
          presets: ['latest']
        }
      }, {
        test: /\.(png|jpg|gif|webp|svg)$/i,
        exclude: [resolve('src/icons')],
        loader: 'url-loader', // limit小于指定值会转base64
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader', // limit小于指定值会转base64
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
