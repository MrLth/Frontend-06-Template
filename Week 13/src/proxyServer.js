/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-19 13:25:20
 * @LastEditTime: 2021-01-20 00:22:18
 * @Description: 解决 iframe 跨域不可访问 DOM 的问题
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config.js')

const app = express();

for (const [name, target] of config) {
    app.use(`/${name}`, createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: { [`/${name}`]: '' }
    }));
}

app.use('/', express.static(__dirname))

app.listen(3000)
