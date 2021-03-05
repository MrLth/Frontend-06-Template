/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-04 16:47:59
 * @LastEditTime: 2021-03-05 11:04:01
 * @Description: file content
 */
const http = require('http')
const https = require('https')
const archiver = require('archiver');
const { resolve: _resolve } = require('path')
const childProcess = require('child_process')

const p = _resolve.bind(null, __dirname)



function publish(req, res) {
  const token = new URLSearchParams(req.url.split('?')[1]).get('token')
  publishRequest(token)
    .then((res1) => {
      console.log(res1)
      res.end(res1)
    })
}

function publishRequest(token) {
  return new Promise((resolve, reject) => {
    const request = http.request({
      hostname: 'localhost',
      port: 3001,
      method: 'POST',
      path: `/publish?token=${token}`,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Token': token
      },
    }, res => {
      let body = ''
      res.on('data', chunk => body += chunk.toString())
      res.on('end', () => resolve(body))
    })

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.directory(p('public'), false);
    archive.finalize();
    archive.pipe(request)
  })
}


http.createServer((req, res) => {
  if (req.url.startsWith('/publish?token=')) {
    publish(req, res)
  }
}).listen(3002)

childProcess.exec('open https://github.com/login/oauth/authorize?client_id=Iv1.3523ac288f0f5c54')
