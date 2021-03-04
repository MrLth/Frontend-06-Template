/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-04 16:47:59
 * @LastEditTime: 2021-03-04 17:07:54
 * @Description: file content
 */
const http = require('http')
const fs = require('fs')

const { resolve: _resolve } = require('path')
const resolve = _resolve.bind(null, __dirname)


const filePath = resolve('./public/index.html')


fs.stat(filePath, (err, stat) => {
  // console.log(stat)
  const file = fs.createReadStream(filePath)

  const request = http.request({
    hostname: 'localhost',
    port: 3001,
    method: 'POST',
    headers: {
      'Content-type': 'application/octet-stream',
      'Content-length': stat.size
    }
  }, res => {
    console.log('success')
  })


  file.on('data', chunk => {
    request.write(chunk)
    console.log(chunk.toString())
  })
  // file.pipe(request)
  file.on('end', () => {
    console.log('end')
    request.end()
  })
})


