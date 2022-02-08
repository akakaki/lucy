const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PAGE_LIST, ENTRY_LIST } = require('./../src/route')

const plugins = [
  new MiniCssExtractPlugin(),
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
  // devtool: 'eval-cheap-module-source-map' ??,
  devtool: 'inline-source-map',
  target: 'web',
  entry: ENTRY_LIST,
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ]
  },
  plugins,
}

module.exports = config
