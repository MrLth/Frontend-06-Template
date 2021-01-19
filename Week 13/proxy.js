/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-19 13:25:20
 * @LastEditTime: 2021-01-19 13:52:22
 * @Description: file content
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const path = require('path')

const app = express();

app.use('/api', createProxyMiddleware({ target: 'https://baidu.com', changeOrigin: true }));

app.use('/static', express.static(__dirname))

// console.log(typeof express.static)

app.listen(3000);
