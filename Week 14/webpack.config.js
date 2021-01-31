/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:16:28
 * @LastEditTime: 2021-01-30 19:52:06
 * @Description: file content
 */


module.exports = {
  mode: 'development',
  entry: {
    main:'./main.js',
    mouse:'./mouse.js'
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
  }
}
