const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PAGE_LIST } = require('./../src/route')

const plugins = [
  new MiniCssExtractPlugin()
]

for (const item of PAGE_LIST) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: item.path,
      filename: item.file,
      minify: {
        collapseWhitespace: false,
        removeComments: true,
      }
    }),
  )
}

const config = {
  mode: 'development',
  entry: [
    path.resolve('src/css/common.scss'),
  ],
  // output: {
  //   clear: true,
  //   path: path.join(__dirname, './dist'),
  //   filename: '[name].js'
  // },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          }, {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        // 把 sass-loader 放在首要處理 (第一步)
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },

      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  plugins,
}

module.exports = config

// https://soarlin.github.io/2020/07/18/pug-sass-boilerplate/
// https://medium.com/%E5%B0%8F%E5%BD%A5%E5%BD%A5%E7%9A%84%E5%89%8D%E7%AB%AF%E4%BA%94%E5%9B%9B%E4%B8%89/%E5%9C%A8webpack%E4%B8%AD%E4%BD%BF%E7%94%A8pug%E7%94%A2%E7%94%9Fhtml-24eb9fec22c7
// https://github.com/johnnywang1994/vue3-ssr/blob/master/config/server.config.js
// https://johnnywang1994.github.io/book/articles/js/vue3-ssr.html#%E5%B0%88%E6%A1%88%E7%92%B0%E5%A2%83%E6%9E%B6%E8%A8%AD
// https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/HotReload.html
// https://ithelp.ithome.com.tw/articles/10247999
// https://zhuanlan.zhihu.com/p/109527475
// https://medium.com/@toumasaya/webpack-2-%E5%AF%A6%E4%BD%9C%E7%AD%86%E8%A8%98-8-%E4%BD%BF%E7%94%A8-pug-957fdcd81329
// https://zhuanlan.zhihu.com/p/117656993
// https://medium.com/html-test/%E5%BE%9E%E7%84%A1%E5%88%B0%E6%9C%89%E5%BB%BA%E7%AB%8B-webpack-%E8%A8%AD%E5%AE%9A%E6%AA%94-%E4%B8%80-42fbc76a2d37


// vue
// https://magiclen.org/webpack/