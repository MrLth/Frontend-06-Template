/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-19 13:25:20
 * @LastEditTime: 2021-01-19 16:15:37
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




app.use('/d', createProxyMiddleware({
    target: 'https://www.w3.org/TR/SVG11/expanded-toc.html',
    changeOrigin: true,
    pathRewrite: { '/d': '' }
}));

app.use('/', express.static(__dirname))

http.createServer(app).listen(3002)
https.createServer(credentials, app).listen(3001)
