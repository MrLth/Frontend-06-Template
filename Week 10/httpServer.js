/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-18 13:48:44
 * @LastEditTime: 2020-12-30 08:37:47
 * @Description: file content
 */

const http = require("http")
const fs = require('fs')

http.createServer((request, response) => {
    let body = []
    request
        .on('error', err => {
            console.error(err)
        })
        .on('data', chunk => {
            console.log(chunk)
            body.push(chunk.toString())
        })
        .on('end', () => {
            console.log(request.headers)
            // body = Buffer.concat(body).toString()
            console.log('body', body)
            response.writeHead(200, { 'Content-type': 'text/html' })
            response.end(fs.readFileSync('./template.html', { encoding: 'utf8' }))
        })
}).listen(8088)
console.log('server started')

// http://127.0.0.1:8088