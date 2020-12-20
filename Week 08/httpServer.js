/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-18 13:48:44
 * @LastEditTime: 2020-12-19 18:04:39
 * @Description: file content
 */

const http = require("http")
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
            response.end('Hello world\n' + body)
        })
}).listen(8000)
console.log('server started')

// http://127.0.0.1:8000