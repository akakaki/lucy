/*
  webpack 載入方式為從右至左從上到下。
  https://pjchender.dev/webpack/note-webpack/
*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PAGE_LIST, ENTRY_LIST } = require('./../src/route')
const webpack = require('webpack')

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  }),
  // new webpack.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  // })
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
  // mode: 'none',
  entry: ENTRY_LIST,
  output: {
    clean: true,
    path: path.resolve('dist'),
  },

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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },

      {
        /*
          webpack 5 已經棄用file-loader 記得拔掉
          https://stackoverflow.com/questions/67250804/html-loader-is-not-getting-correct-img-src-path
        */
        test: /\.(png|jpg|gif|jpe?g|svg)$/,
        type: 'asset/resource',
        generator: {
          // filename: 'img/[hash][ext]'
          filename: 'images/[name][ext]'
        }
      },

      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
    ]
  },
  plugins,
}

module.exports = config
