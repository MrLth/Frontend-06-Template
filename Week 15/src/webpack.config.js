/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:16:28
 * @LastEditTime: 2021-02-04 13:54:11
 * @Description: file content
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    // main: path.resolve(__dirname, 'main.js'),
    mouse: path.resolve(__dirname, 'mouse.js'),
    pause: path.resolve(__dirname, './pause/pause.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[chunkhash:8].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]
            ]
          }
        }]
      },

    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['mouse'],
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['pause'],
      filename: 'pause.html',
      template: path.resolve(__dirname, './pause/pause.html')
    }),
  ]
}
