/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-04 16:47:59
 * @LastEditTime: 2021-03-05 00:43:56
 * @Description: file content
 */
const http = require('http')
const archiver = require('archiver');
const { resolve: _resolve } = require('path')
const childProcess = require('child_process')

const resolve = _resolve.bind(null, __dirname)

childProcess.exec('open https://github.com/login/oauth/authorize?client_id=Iv1.3523ac288f0f5c54')

const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
})

function publish() {
  const request = http.request({
    hostname: 'localhost',
    port: 3001,
    method: 'POST',
    headers: {
      'Content-type': 'application/octet-stream',
    }
  }, res => {
    let rstStr = ''
    res.on('data', chunk => rstStr += chunk.toString())
    res.on('end', () => console.log(rstStr))
  })

  archive.directory(resolve('public'), false);
  archive.pipe(request)
  archive.finalize();
  archive.on('end', () => request.end())
}

http.createServer((req, res) => {
  console.log(req)
}).listen(3002)