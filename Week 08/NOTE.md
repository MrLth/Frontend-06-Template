# 1. 有限状态机

```typescript
// 匹配 'abcabx' 的简单示例
const a1 = c => c==='a' ? b1 : a1
const b1 = c => c==='b' ? c1 : a1
const c1  = c => c==='c' ? a2 : a1
const a2 = c => c==='a' ? b2 : a1
const b2 = c => c==='b' ? x  : b1(c)
const x  = c => c==='x' ? end: c1(c)
const end = ()=> end

const match = (string)=> {
  let next = a1
  for (let c of string){
    next = next(c)
  }
  return next === end
}

match('abcabx')
```

# 2. HTTP

## 2.1 两个库

1. [net](http://nodejs.cn/api/net.html#net_net)
2. [http](http://nodejs.cn/api/http.html#http_http)

## 2.2 易忽略知识点

1. CRLF，CR(Carriage Return) 回车，LF(Line Feed) 换行

2. HTTP 的请求行、请求头、请求体之间由一个 CRLF 分隔，即 '\r\n'

3. 请求头、请求体之间有一空行

4. 响应行、响应头、响应体同 2、3 点

   ```typescript
   [
       `${this.method.toUpperCase()} ${this.path} HTTP/1.1`,
       Object.entries(this.headers).map(([k, v]) => `${k}:${v}`).join('\r\n'),
       '',
       this.bodyText
   ].join('\r\n')
   ```

5. 别忽略了请求头和响应的头的大写

6. ~~不太重要：响应头的键值对由一个冒号和一个空格分隔，解析时注意。请求头有没有空格不影响 http 库解析~~

## 2.3 请求头

### 2.3.1 Content-type

1. application/json
2. application/x-www-form-urlencoded，a=1&b=2
3. multipart/form-data，用于传输大型二进制数据或者包含非ASCII字符的数据，boundary 表示分隔符

```typescript
// 由 media-type、charset、boundary 三个字段组成
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

```http
POST /fileUpload HTTP/1.1
Connection: keep-alive
Content-Length: 42552
Content-Type: multipart/form-data; boundary=----splitboundary
Host: 172.18.32.155:18102
 
------splitboundary
Content-Disposition: form-data; name="json"
Content-Type: application/json
Content-Length: 1568
 
{"Channel":0,"Events":[{"AccessInfo":{"PassResult":15},"Action":"Pulse","Channel":0,"Class":"SceneFaceDetection","Code":"EventFaceRecognizeCutout","CommInfo":{"MachineAddress":"","MachineName":"Cam1","PictureType":2,"Resolution":[860,972],"SerialNo":"5L98R010013"},"CompareComplete":1,"CountInGroup":1,"CreateEventPTS":6845187.0,"FaceGroup":{"GroupAlias":"AccessApp","GroupID":1},"FrameSequence":136437,"GroupID":227,"IndexInGroup":2,"IndexInSingle":1,"Inter":{"EncodeSequence":34,"EncodeTimes":0,"NeedEncode":false,"NormalPictureUpload":false,"PicType":2},"Object":{"Age":0,"Belief":233,"Blur":0.0837402343750,"BlurFlag":0,"BoundingBox":[3333,3877,7477,7737],"BoundingBoxInCutout":[3333,3877,7477,7737],"FaceHandle":3030996680.0,"FrameSequence":136437,"Goodness":0.0,"Minority":0,"ObjectID":7393,"ObjectType":"HumanFace","PoseFlag":0,"PosePitch":6.07089090347290,"PoseRoll":3.353461503982544,"PoseYaw":-8.644724845886230,"Quality":0,"RelativeID":40,"SafetyHelmet":0,"Sex":"Unknown","Source":292},"ObjectID":7393,"PTS":6845187.0,"Pass":1,"RecognizeResults":[{"FaceToken":"29eb922cd2e1e0aadf16f436edece8b4","LivenessScore":99.0,"LivenessThreshold":70.0,"PersonInfo":{"Birthday":"1996-03-26","CertificateType":"IC","City":"Unknown","Country":"Unknown","ID":"620523199603265230","Name":"ywy","PersonID":26,"PersonType":1,"Province":"Unknown","Sex":"female","State":0},"SafetyHelmet":0,"SearchScore":76.62004089355469,"SearchThreshold":72.0}],"RuleID":1,"Source":292,"TimeZone":"GMT+00:00","UTC":1579081427,"UTCMS":236}],"PicID":"280","SendTimes":1,"Transfer":"Realtime"}
 
------splitboundary
```



### 2.3.2 Content-length

​	多一个少一个都会影响服务器对 body 的正常解析

## 2.4 响应头

### 2.4.1 Transfer-Encoding: chunked

​	对响应体分块传输，NodeJs 默认传输方式，每个块的第一行表示此块长度（HEX）

```
19
Hello world
{"a":1,"b":2}
19
Hello world
{"a":1,"b":2}
0
```

# 3. 最佳实践

1. `void function(){}()`，较为优雅的 IIFE 书写方式
2. 使用 `Object.assign` 对函数形参对象设置默认值
3. Array.from({length:12}) [undefind\*12]
   Array(12) [empty\*12]

# 4. 常用状态码

## 1. 基础

1. 1xx 信息响应
2. 2xx 成功
3. 3xx 重定向
4. 4xx 客户端错误
5. 5xx 服务端错误

## 2. 3xx

1. 304 缓存可用
   相关请求头：

   1. Cache-Control
      缓存控制
      常用字段：Max-age、no-store、no-cache、must-revalidate、public
   2. If-None-Match:"4f80f-13c-3a1xb12a"
      [ETags](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ#ETags) 缓存验证

2. 301 永久重定向
   http://hahaha.com => http://www.hahaha.com

3. 302 临时重定向

   临时的，之后客户端应当继续向原有地址发送以后的请求。

