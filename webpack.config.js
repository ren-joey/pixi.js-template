const path = require('path')
const webpack = require('webpack')
// const cleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './assets/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'assets/js/[name].bundle.js'
  },
  module: {
    rules: [
      {test: /\.html$/, use: [{loader: 'html-loader'}]},
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [require('autoprefixer')]
              }
            }
          },
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new copyWebpackPlugin([
      {
        from: 'assets/images/fighter.json',
        to: 'assets/images'
      },
      {
        from: 'assets/images/fighter.png',
        to: 'assets/images'
      },
      {
        from: 'assets/images/coin.json',
        to: 'assets/images'
      },
      {
        from: 'assets/images/coin.png',
        to: 'assets/images'
      },
      {
        from: 'assets/images/mc.json',
        to: 'assets/images'
      },
      {
        from: 'assets/images/mc.png',
        to: 'assets/images'
      }
    ]),
    // new cleanWebpackPlugin({
    //   verbose: true
    // })
  ]
}