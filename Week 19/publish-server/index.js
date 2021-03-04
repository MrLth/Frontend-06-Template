/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-04 16:42:12
 * @LastEditTime: 2021-03-05 00:51:36
 * @Description: file content
 */
const http = require('http')
const https = require('https')
const unzipper = require('unzipper')
const { resolve: _resolve } = require('path')

const resolve = _resolve.bind(null, __dirname)

const clientId = 'Iv1.3523ac288f0f5c54'
const clientSecret = 'a4db7794801f5cc693f824a7edb3b3926c29ad2a'

function oAuth(req, res) {
  const code = new URLSearchParams(req.url.split('?')[1]).get('code')
  getToken(code)
    .then((token) => {
      res.end(`<a href='http://localhost:3002/publish?token=${token}'>publish</a>`)
    })
    .catch(err => {
      res.end(err)
    })
}

function getToken(code) {
  return new Promise((resolve, reject) => {
    https.request({
      hostname: 'github.com',
      path: `/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
      method: 'POST',
    }, res => {
      let rstStr = ''
      res.on('data', chunk => rstStr += chunk.toString())
      res.on('end', () => {
        const params = new URLSearchParams(rstStr)
        console.log(rstStr)
        if (params.has('access_token')) {
          resolve(params.get('access_token'))
        } else {
          reject(rstStr)
        }
      })
    }).end()
  })
}


function publish(req, res) {
  req.pipe(unzipper.Extract({ path: resolve('public') }))
  req.on('end', () => {
    console.log('download successfully')
    res.end('upload successfully')
  })
}

http.createServer((req, res) => {
  console.log(req.url)
  if (req.url.startsWith('/oAuth?code=')) {
    oAuth(req, res)
  }
}).listen(3001)