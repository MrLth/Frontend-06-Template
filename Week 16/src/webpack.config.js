/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:16:28
 * @LastEditTime: 2021-02-16 10:43:53
 * @Description: file content
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'index.js'),
    button: path.resolve(__dirname, 'Button.js'),
    list: path.resolve(__dirname, 'List.js'),
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
      chunks: ['index'],
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['button'],
      filename: 'button.html',
      template: path.resolve(__dirname, 'index.html')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['list'],
      filename: 'list.html',
      template: path.resolve(__dirname, 'index.html')
    }),
  ]
}
