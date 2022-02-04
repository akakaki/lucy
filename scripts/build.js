const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { PAGE_LIST } = require('./../src/route')

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  })
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

plugins.push(new CleanWebpackPlugin())

const config = {
  mode: 'development',
  entry: [
    path.resolve('src/css/common.scss'),
    path.resolve('src/css/style.scss'),
    // path.resolve('src/images/截圖 2021-12-21 上午11.02 1.jpg'),
    // path.resolve('src/js/jquery.min.js'),
    // path.resolve('src/js/common.js'),
  ],
  output: {
    path: path.resolve('dist'),
    // filename: 'bundle/[name].[ext]'
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

      // {
      //   test: /\.(png|jpg|gif|jpe?g|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'images/[name].[ext]',
      //         emitFile: false
      //       }  
      //     },
      //   ]
      // },

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
