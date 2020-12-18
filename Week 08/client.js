/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-18 14:15:37
 * @LastEditTime: 2020-12-18 17:01:34
 * @Description: file content
 */

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


        if (config.headers['Content-type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body)
        else if (config.headers['Content-type'] === 'application/x-www-form-urlencoded')
            this.bodyText = Object.entries(this.body).map(([k, v]) => `${k}=${v}`).join('&')

        this.headers['Content-length'] = this.bodyText.length

    }


}

void async function () {
    const request = new Request({
        method: "post",
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            a: 1,
            b: 2
        }
    })

    console.log(request)
    // response = await request.send()
    // console.log(response)
}()
// void IIFE 和 (null, function)() IIFE 还是有区别的，后者可以使 this 失效，有一层语义上的效果
