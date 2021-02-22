/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-17 15:13:12
 * @LastEditTime: 2021-02-17 15:47:09
 * @Description: file content
 */
/** useBuiltIns: 'usage' *
module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: ['./index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  // targets: "> 0.25%"

                }]
              ],
              plugins: [
                "@babel/plugin-transform-runtime"
              ]
            }
          }
        ]
      }
    ]
  }
}
/** */
/** entry & useBuiltIns: false 占用空间更大 */
module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: ["@babel/polyfill", './index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: false,
                  // targets: "> 0.25%"

                }]
              ],
              plugins: [
                "@babel/plugin-transform-runtime"
              ]
            }
          }
        ]
      }
    ]
  }
}
/** */

