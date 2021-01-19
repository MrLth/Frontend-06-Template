/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-19 13:25:20
 * @LastEditTime: 2021-01-19 15:13:14
 * @Description: file content
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path')
const https = require('https');
const http = require('http');

const app = express();

const privateKey = fs.readFileSync(path.resolve(__dirname, './private.pem'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, './file.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };




app.use('/api', createProxyMiddleware({
    target: 'https://baidu.com',
    changeOrigin: true,
    pathRewrite: { '/api': '/' }
}));

app.use('/', express.static(__dirname))

http.createServer(app).listen(3000)
https.createServer(credentials, app).listen(3001)
