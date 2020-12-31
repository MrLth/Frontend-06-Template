/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-18 14:15:37
 * @LastEditTime: 2020-12-31 16:59:18
 * @Description: file content
 */
const net = require('net')
const { parseHTML } = require('./parser')
const { render } = require('./render')
const images = require('images')

class ChunkedBodyParser {
    isFinished = false
    bodyText = ''

    stateMachine() {
        const self = this
        let length = 0

        function end() {
            return end
        }

        function waitLength(c) {
            if (c === '\r') {
                return waitLengthEnd
            } else {
                length = length * 16 + parseInt(c, 16)
                return waitLength
            }
        }

        function waitLengthEnd(c) {
            if (length === 0) {
                self.isFinished = true
                return end
            } else if (c === '\n') {
                return waitBodyContent
            } else {
                return waitLengthEnd
            }
        }

        function waitBodyContent(c) {
            length--
            self.bodyText += c
            if (length === 0) {
                return waitLength
            } else {
                return waitBodyContent
            }
        }

        return waitLength
    }

    constructor() {
        this.next = this.stateMachine()
    }

    receiveChar(char) {
        this.next = this.next(char)
    }
}
class ResponseParser {
    isFinished = false
    response = {
        status: null,
        statusLine: '',
        headers: {},
        body: ''
    }

    stateMachine() {
        const self = this
        let tmpHeaderName = ''
        let tmpHeaderValue = ''
        let bodyParser = null

        function statusLine(c) {
            if (c === '\r')
                return statusLineEnd
            else {
                self.response.statusLine += c
                return statusLine
            }
        }

        function statusLineEnd(c) {
            if (c === '\n') {
                self.response.status = +self.response.statusLine.split(' ')[1]
                return waitHeaderName
            } else {
                return statusLineEnd
            }

        }

        function waitHeaderName(c) {
            if (c === ':')
                return waitHeaderSpace
            else if (c === '\r') {
                return headerEnd
            } else {
                tmpHeaderName += c
                return waitHeaderName
            }
        }

        function waitHeaderSpace(c) {
            if (c === ' ')
                return waitHeaderValue
            else {
                return waitHeaderSpace
            }
        }


        function waitHeaderValue(c) {
            if (c === '\r') {
                self.response.headers[tmpHeaderName] = tmpHeaderValue
                return waitHeaderEnd
            } else {
                tmpHeaderValue += c
                return waitHeaderValue
            }
        }

        function waitHeaderEnd(c) {
            if (c === '\n') {
                tmpHeaderName = ''
                tmpHeaderValue = ''
                return waitHeaderName
            } else {
                return waitHeaderEnd
            }
        }

        function headerEnd(c) {
            if (c === '\n') {
                if (self.response.headers['Transfer-Encoding'] === 'chunked')
                    bodyParser = new ChunkedBodyParser()
                return waitBody
            } else {
                return headerEnd
            }
        }

        function waitBody(c) {
            bodyParser.receiveChar(c)
            if (bodyParser.isFinished) {
                self.isFinished = true
                self.response.body = bodyParser.bodyText
                return end
            }
            return waitBody
        }

        function end() {
            return end
        }

        return statusLine
    }

    constructor() {
        this.next = this.stateMachine()
    }

    receive(string) {
        for (const char of string) {
            this.receiveChar(char)
        }
    }

    receiveChar(char) {
        this.next = this.next(char)
    }
}

class Request {
    constructor(config) {
        config.headers = Object.assign({
            'Content-type': 'application/x-www-form-urlencoded'
        }, config?.headers)

        Object.assign(
            this,
            {
                method: 'get',
                port: '80',
                path: '/',
                body: {},
                bodyText: ''
            },
            config
        )


        /**/ if (config.headers['Content-type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body)
        else if (config.headers['Content-type'] === 'application/x-www-form-urlencoded')
            this.bodyText = Object.entries(this.body).map(([k, v]) => `${k}=${v}`).join('&')

        this.headers['Content-length'] = this.bodyText.length

    }

    send(connection) {
        return new Promise((resolve, reject) => {
            // 1. 新建 TCP 连接或者使用传入的 TCP 连接
            // 1.1 生成 request 请求
            if (connection) {
                connection.write(this.toString())
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString())
                })
            }
            // console.log('request\n' + this.toString())

            // 2. 接收数据
            // 2.1 处理 response 数据
            connection.on('data', data => {
                const parser = new ResponseParser()
                parser.receive(data.toString())
                if (parser.isFinished) {
                    resolve(parser.response)
                    connection.end()
                }
            })

            // 3. 处理错误
            connection.on('error', err => {
                reject(err)
                connection.end()
            })
        })
    }

    toString() {
        return [
            `${this.method.toUpperCase()} ${this.path} HTTP/1.1`,
            Object.entries(this.headers).map(([k, v]) => `${k}:${v}`).join('\r\n'),
            '',
            this.bodyText
        ].join('\r\n')
    }

}

void async function () {
    const request = new Request({
        method: "post",
        host: "127.0.0.1",
        port: '8088',
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            a: 1,
            b: 2
        }
    })

    response = await request.send()
    const dom = parseHTML(response.body)
    const viewport = images(800, 600).fill(255, 255, 255, 1)
    render(viewport, dom)
    viewport.save('viewport.jpg')
    debugger
}()
// void IIFE 和 (null, function)() IIFE 还是有区别的，后者可以使 this 失效，有一层语义上的效果
