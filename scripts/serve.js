const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PAGE_LIST, ENTRY_LIST } = require('./../src/route')

const plugins = []

for (const item of PAGE_LIST) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: item.path,
      filename: item.file,
    }),
  )
}

plugins.push(new MiniCssExtractPlugin())

const config = {
  mode: 'development',
  // devtool: 'eval-cheap-module-source-map' ??,
  devtool: 'inline-source-map',
  target: 'web',
  entry: ENTRY_LIST,
  // {
  //   'index.pug': path.resolve('src/index.pug'),
  //   'about.pug': path.resolve('src/about.pug'),
  // }
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
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
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.s[ac]ss$/i,
        // 把 sass-loader 放在首要處理 (第一步)
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ]
  },
  plugins,
}

module.exports = config
