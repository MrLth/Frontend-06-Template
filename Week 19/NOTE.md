## 参考

https://expressjs.com/en/starter/generator.html

http://nodejs.cn/api/fs.html#fs_fs_createreadstream_path_options

https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps



## 工具库

1. archiver 压缩
2. unzipper 



## node.js api

1. queryString

1. 1. parse

1. children_process

1. 1. exec

1. https

##  

## 编写 server

```
md server
cd server
npx express-generator
npm install
// 删除不必要的文件，只需留下public
npm start
```



## 部署

```
// 启动 SSH 连接服务器, 默认监听 22 端口
service ssh start
scp -P 22 -r ./localPath user@127.0.0.1:/serverPath 
scp -P 22 -r ./* mrlth@xxxx:/Users/mrlth/git/extension-server
```

> 不推荐在 server 上再执行 npm install , 需要保持环境尽可能的一致
>
> package-lock.json



## 发布系统

### publish-server

```
const http = require('http')
const fs = require('fs')

http.createServer((req, res)=>{
  const file = fs.createWriteStream(path)
  req.on('data', chunk => file.write(chunk))
  req.on('end', () => {
    file.end()
    res.end('hello world')
  })

}).listen(3000)
```

#### readable.pipe

```
const http = require('http')
const fs = require('fs')

http.createServer((req, res)=>{
  const file = fs.createWriteStream(path)
  req.pipe(file)
  req.on('end', ()=> res.end())
}).listen(3000)
```

### publish-tool

```
const http = require('http')
const fs = require('fs')
const file = fs.createReadStream(path)

const request = http.request({
    hostname:'127.0.0.1',
  port:22,
  method:'PORT',
  headers:{
    'Content-type':'application/octet-stream'
  }
}, res => {
    console.log(res)
})

file.on('data', chunk => request.write(chunk))
file.on('end', () => request.end())
```

#### readable.pipe

```
const http = require('http')
const fs = require('fs')
const file = fs.createReadStream(path)

const request = http.request({
    hostname:'127.0.0.1',
  port:22,
  method:'PORT',
  headers:{
    'Content-type':'application/octet-stream'
  }
}, res => {
    console.log(res)
})

file.pipe(request)
file.on('end', ()=> request.end())
```



## 多文件上传

压缩+解压



## Github oAtuh

1. settings > Devlopment settings > Github Apps > New Github App
2. 填写以下字段并生成 Github App

1. 1. GitHub App name
   2. Homepage URL：`http://localhost`
   3. Identifying and authorizing users > Callback URL : `http://localhost/oAuth`
   4. Identifying and authorizing users > Expire user authorization tokens : `false`
   5. Webhook > Active : `false`
   6. Where can this GitHub App be installed? `Any account`

1. Client secrets > generate a new client secret
2. 鉴权

1. 1. client: 

1. 1. 1. get 访问 [`https://github.com/login/oauth/authorize?client_id=xxx`](https://github.com/login/oauth/authorize?client_id=xxx)
      2. 跳转到我们填写的 Callback URL ， 并会传递一个  code

1. 1. server/

1. 1. 1. 接收 code, 用 code+client-id+client-secret 换 tokon

      2. 用 token 获取用户信息，检查权限

         