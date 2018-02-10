## 简介
基于 Webpack3.x 开发(dev)和构建(build)Web多页面应用(普通 Web 站点) 的前端工程化方案。

## 特性
- 前端工程化
- 集成 PostCSS、stylus
- 支持模块化、组件化
- 支持开发、调试和构建

## 目录结构
|-- build                             // Webpack 配置
|-- config                            // 路径、代理域名等配置
|-- dist                              // 构建后的代码默认存放位置，可通过config/index.js重新配置
|-- src                               // 源码目录
|   |-- common                        // HTML中的公用片段（比如header、footer）
|   |-- styles                        // 全局样式
|       |-- index                     // 样式工具集合
|       |-- utils                     // 样式工具目录
|           |-- functions.scss        // Stylus 函数
|           |-- mixins.scss           // Stylus 混合
|           |-- variables.scss        // Stylus 变量
|   |-- utils                         // JS工具库
|   |-- views                         // HTML页面
|   |-- main.js                       // Webpack主入口，页面间公用的模块可放这里

## 使用
#### 1. 相关命令
```bash
# 下载代码
$ git clone https://github.com/songyazhao/multi-page-template.git
# 安装依赖
$ yarn // or `npm install`
# 开发、调试
$ yarn dev // or `npm run dev`
# 构建
$ yarn build // or `npm run build`
```

#### 2. 开发环境的访问地址
http://localhost:2335/index.html
index.html对应 `src/views` 中的html文件

#### 3. 开发自己的项目
- 在 `src/views` 下参照 `index` 文件夹的结构创建其他页面

## 添加 polyfill
用 ES6 开发时，可按需引入 polyfill，提高浏览器兼容性。
```bash
# 安装 core-js
$ yarn add core-js --save
```
polyfill 在 `src/main.js` 文件中引入：
```js
import 'core-js/es6/promise'
```

## IE8 兼容
添加 es3ify-webpack-plugin，解决 es3 语法兼容问题：
```bash
$ yarn add es3ify-webpack-plugin -D
```
在 `build/webpack.prod.conf.js` plugins 项中添加
```js
const es3ifyPlugin = require('es3ify-webpack-plugin');
...
plugins: [
  new es3ifyPlugin()
  ...
]
```
添加 es5-shim 和 es5-sham，解决 es3 环境下 es5 API 缺失问题：
```html
<!--[if lt IE 9]>
<script src="//cdn.bootcss.com/es5-shim/4.5.10/es5-shim.min.js"></script>
<script src="//cdn.bootcss.com/es5-shim/4.5.10/es5-sham.js"></script>
<![endif]-->
```
引入 selectivizr.js，使 IE8 支持 CSS3 伪类以及属性选择器：
```html
<!--[if lt IE 9]>
<script src="//cdn.bootcss.com/nwmatcher/1.4.2/nwmatcher.min.js"></script>
<script src="//cdn.bootcss.com/selectivizr/1.0.2/selectivizr-min.js"></script>
<![endif]-->
```
> 如果无需兼容 IE8，请去掉以上相关操作！
