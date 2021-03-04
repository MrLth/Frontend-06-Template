/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-04 16:42:12
 * @LastEditTime: 2021-03-04 17:04:20
 * @Description: file content
 */
const http = require('http')
const fs = require('fs')
const { resolve: _resolve } = require('path')

const resolve = _resolve.bind(null, __dirname)

console.log('123')
http.createServer((req, res) => {


  console.log('111')
  // const file = fs.createWriteStream(resolve('./public/index.html'))

  // req.pipe(file)
  req.on('data', chunk => console.log(chunk.toString()))

  req.on('end', () => {
    console.log('hello world')
    res.end('hello world')
  })

}).listen(3001)