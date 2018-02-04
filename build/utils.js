const rd = require('rd')
const path = require('path')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.addQueueFile = function (WebpackConfig, entryKeys) {
  const s = path.sep
  const { entrysPath } = config.build
  const folder = path.basename(entrysPath)
  const reg = new RegExp(`(${folder})${s + s}\(\\b[a-z]\+\\b)`, 'i')
  // 枚举目录下的所有文件夹
  rd.eachDirFilterSync(entrysPath, reg, f => {
    f = f.split(s).join(s + s)

    rd.eachFilterSync(f, /\.html$/i, files => { // 枚举对应文件夹下的文件
      let temp = files.split(s).slice(-3)
      let filename = [...temp.slice(0, 1), ...temp.slice(2, 3)].join(s)
      let entryKey = filename.replace('.html', '')
      let template = path.join(path.dirname(entrysPath), entryKey, temp[2])
      let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

      WebpackConfig.entry[entryKey] = [template.replace('.html', '.js'), hotMiddlewareScript] // 批量添加入口文件

      filename = process.env.NODE_ENV === 'production' ?
        config.build.viewsPath + s + filename :
        filename.replace(s, '/')

      temp = new HtmlWebpackPlugin({
        template, // 模板html路径
        filename, // 编译后的html存放路径
        inject: 'body',
        chunks: ['main', entryKey]
      })

      entryKeys && entryKeys.push(entryKey)
      WebpackConfig.plugins.push(temp) // 枚举到的页面加入打包队列
    })

  }, err => {
    assert.equal(err, null)
  })
}
