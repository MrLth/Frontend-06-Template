/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-18 13:48:44
 * @LastEditTime: 2020-12-25 15:38:28
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
            response.end(`<html>
                    <head>
                        <title>TEST</title>
                        <style>
                            .container {
                                width: 100px;
                            }

                            #b {
                                background-color: #f00;
                            }

                            .container a {
                                background-color: #faa;
                            }

                            div .wrapper {
                                font-weight: 700;
                                ;
                            }

                            div div {
                                font-weight: normal;
                            }
                        </style>
                    </head>

                    <body>
                        <div class="container">
                            <a href="#a">a</a>
                            <a id="#b" href="#b">b</a>
                            <div class="wrapper">wrapper</div>
                        </div>
                    </body>

                    </html>`)
        })
}).listen(8080)
console.log('server started')

// http://127.0.0.1:8080