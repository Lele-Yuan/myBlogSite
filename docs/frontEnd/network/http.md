---
id: http
sidebar_position: 1
title: http
---

## HTTP 请求方法
- GET
- POST
- HEAD - 获取资源的元信息
- PUT
- DELETE
- CONNECT - 简历连接隧道，用户代理服务器
- OPTIONS - 列出可对资源实行的请求方法，用来跨域请求
- TRACE - 追踪请求/响应的传输路径

### GET POST 的区别
- 缓存 - GET 会被浏览器缓存起来； POST 默认是不会缓存的。
- 编码 - GET 需要对URL进行ACCII编码；POST 无限制。
- 参数 - GET 一般放在URL中；POST放在请求体中。
- TCP - GET 把请求报文一次性发出去；POST 分两个TCP数据包，一个header部分，服务器响应100后在发送body部分。

## URI 是什么
URI，Uniform Resource Identifier 统一资源表示符。作用：区分互联网上的不同资源。

URI 包含 URL 。完整的格式为 scheme://user:passwd@host:port/path?query#hash

URI 引入了编码机制，将所有非 ASCII 码字符和界定符转为十六进制字节值，然后在前面加个%。例如**空格被转义成了%20**

## HTTP 请求状态码
- 1xx - 信息提示
  - 101 - Switching Protocols。在HTTP升级为WebSocket的时候，如果服务器同意变更，就会发送状态码 101。
- 2xx - 成功
  - 200 - OK 响应正常，GET 和 POST 请求的响应应答文档会跟在其后
  - 201 - Created 服务器已经创建了文档，Location头给出了它的URL
  - 204 - No Content 没有新文档，浏览器应该继续显示原来的文档
  - 206 - Partial Content 部分内容，它的使用场景为 HTTP 分块下载和断点续传，当然也会带上相应的响应头字段Content-Range。
- 3xx - 重定向
  - 301 - Moved Permanently 客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL。
  - 304 - Not Modified 客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用。
- 4xx - 客户端错误
  - 400 - Bad Request 请求出现语法错误
  - 401 - Unauthorized 访问被拒绝
  - 403 - Forbidden 资源不可用
  - 404 - Not Found 无法找到指定位置的资源
  - 405 - Method Not Allowed 请求方法。（GET、POST、HEAD、Delete、PUT、TRACE等）对指定的资源不适用
  - 408 - Request Timeout 服务器等待了太长时间。
- 5xx - 服务器错误
  - 500 - Internal Server Error 服务器遇到了意料不到的情况，不能完成客户的请求。
  - 502 - Bad Gateway 服务器作为网关或者代理时
  - 504 - Gateway Timeout 网关超时

## 请求/响应头
- 请求头
  - Accept - 可接受的响应内容类型（Content-Types）。例如：
    - text： text/html, text/plain, text/css 等
    - image: image/gif, image/jpeg, image/png 等
    - audio/video: audio/mpeg, video/mp4 等
    - application: application/json, application/javascript, application/pdf, application/octet-stream  
  - Accept-Charset - 可接受的字符集。	例如：Accept-Charset: utf-8
  - Accept-Encoding - 可接受的响应内容的编码方式。例如：Accept-Encoding: gzip, deflate, br
  - Accept-Language - 可接受的响应内容语言列表。例如：Accept-Language: en-US
  - Authorization - 用于表示HTTP协议中需要认证资源的认证信息。
  - Cache-Control	- 用来指定当前的请求/回复中的，是否使用缓存机制。例如：Cache-Control: no-cache
  - Connection - 客户端（浏览器）想要优先使用的连接类型。例如：Connection: keep-alive；Connection: Upgrade
  - Cookie - 设置的一个HTTP协议Cookie。
  - Content-Type - 请求体的MIME类型 （用于POST和PUT请求中）。例如：Content-Type: application/json
  - Host - 表示服务器的域名以及服务器所监听的端口号。
  - If-Modified-Since - 允许在对应的资源未被修改的情况下返回304未修改。
  - If-None-Match - 允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ）。
  - Origin - 发起一个针对跨域资源共享的请求。
  - User-Agent - 浏览器的身份标识字符串。
- 响应头
  - Access-Control-Allow-Origin - 指定哪些网站可以跨域源资源共享。例如：Access-Control-Allow-Origin: *	
  - Allow - 对于特定资源的有效动作。Allow: GET, HEAD
  - Cache-Control - 通知从服务器到客户端内的所有缓存机制，表示它们是否可以缓存这个对象及缓存有效时间。其单位为秒。例如：Cache-Control: max-age=3600
  - Content-Encoding - 响应资源所使用的编码类型。例如：Content-Encoding: gzip
  - Content-Type - 当前内容的MIME类型。例如：Content-Type: text/html; charset=utf-8
  - Expires - 指定一个日期/时间，超过该时间则认为此回应已经过期。例如：Expires: Thu, 01 Dec 1994 16:00:00 GMT
  - Last-Modified - 所请求的对象的最后修改日期。例如：Last-Modified: Dec, 26 Dec 2015 17:30:00 GMT
  - Server - 服务器的名称。
  - Status - 通用网关接口的响应头字段，用来说明当前HTTP连接的响应状态。例如：Status: 200 OK
- 自定义头
  - HTTP消息头支持自定义， 自定义的专用消息头一般会添加'X-'前缀。

## 如何处理表单提交
有两种提交表单的方式，从请求头中的 **Content-Type** 上体现
- application/x-www-form-urlencoded
  - 数据为以&分割的键值对
  - 字符以URI编码方式编码
- multipart/form-data 应用场景上传文件
  - 请求头Content-Type字段会包含**boundary**，且由浏览器指定
  - 数据会分成多段通过分割符来分割，每段均有http头部描述.
    ```
    Content-Disposition: form-data;name="data1";
    Content-Type: text/plain
    data1
    ----WebkitFormBoundaryRRJKeWfHPGrS4LKe
    Content-Disposition: form-data;name="data2";
    Content-Type: text/plain
    data2
    ----WebkitFormBoundaryRRJKeWfHPGrS4LKe--
    ```

## HTTP 缓存
### 强缓存
**强缓存**是利用http的响应头 `response` 中的`Expires`或者`Cache-Control`两个字段来控制的，用来表示资源的缓存时间。

`Expires` 表示过期时间(是服务器端的具体的时间点)。**Expires = max-age + 请求时间**

`Cache-Control` 是一个相对时间，和 `Expires` 同时启用的时候 `Cache-Control` 优先级高。主要有以下几个取值：
  - no-cache 强制所有缓存了该响应的用户，在使用已缓存的数据前，发送带验证器的请求到服务器。
  - no-store 禁止缓存，每次请求都要向服务器重新获取数据。
  - max-age 指定一个时间长度，在这个时间段内缓存是有效的。

### 协商缓存
若未命中强缓存，则浏览器会将请求发送至服务器，服务器根据http头信息中的 Last-Modify/If-Modify-Since或Etag/If-None-Match 来判断是否命中协商缓存。
- Last-Modify / If-Modify-Since 
  浏览器第一次发送请求时，服务器会返回的 header 中会包含一个时间标识 Last-Modify ，表示该资源的最后修改时间。
  当浏览器再次发送请求时，请求头中需要包含 If-Modify-Since 存储之前返回的 Last-Modify 
  服务器收到 If-Modify-Since 会根据资源的最后修改时间，来判断是否命中协商缓存。
  如果命中协商缓存，则返回状态码**304**
- ETag / If-None-Match
  和 Last-Modify / If-Modify-Since 不同的是，Etag/If-None-Match 返回的是一个唯一的校验码。
  ETag 是服务器返回头中携带的信息，值的变更则说明资源状态已经被修改。
  服务器根据浏览器上发送的请求头中携带的 If-None-Match 值来判断是否命中缓存。
  ETag 可以保证每一个资源的唯一性。

## TCP 是如何发起和关闭连接
[参考链接](https://www.cnblogs.com/zzjdbk/p/13028290.html)
[猿人谷](https://www.cnblogs.com/heyonggang/p/11634228.html)
- 名次解释
  - ISN - 
- 三次握手：最开始的时候客户端和服务器都是处于CLOSED状态。主动打开连接的为客户端，被动打开连接的是服务器。
  - 第一次握手：客户端给服务端发一个 SYN 报文，并指明客户端的初始化序列号 ISN（c）。此时客户端处于 **SYN_Send** 状态。
  - 第二次握手：服务器收到客户端的 SYN 报文之后，会以自己的 SYN 报文作为应答，并且也是指定了自己的初始化序列号 ISN(s)，同时会把客户端的 ISN + 1 作为 ACK 的值，表示自己已经收到了客户端的 SYN，此时服务器处于 **SYN_REVD** 的状态。
  - 第三次握手：客户端收到 SYN 报文之后，会发送一个 ACK 报文，当然，也是一样把服务器的 ISN + 1 作为 ACK 的值，表示已经收到了服务端的 SYN 报文，此时客户端处于 **establised** 状态。
  - 服务器收到 ACK 报文之后，也处于 **establised** 状态，此时，双方以建立起了链接。

- 三次握手的作用
  - 确认服务器和客户端都有接收、传输的能力
  - 指定自己的初始化序列号，为后面的可靠传送做准备。
  - 如果是 https 协议的话，三次握手这个过程，还会进行数字证书的验证以及加密密钥的生成到。
  - 第一次握手不可以携带数据，如果携带大量数据而忽略服务器的接收能力的话让服务器花大量时间和内存存储这些数据，可能会让服务器收到攻击。
  - 第三次可以携带数据，

- 四次挥手
  - 第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 **FIN_WAIT1** 状态。
  - 第二次握手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 + 1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于  **CLOSE_WAIT** 状态。
  - 第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 **LAST_ACK** 的状态。
  - 第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 + 1 作为自己 ACK 报文的序列号值，此时客户端处于 **TIME_WAIT** 状态。需要过一阵子(至少是一个报文的来回时间，如果过了这个计时没有再次收到 FIN 报文，则代表对方成功就是 ACK 报文)以确保服务端收到自己的 ACK 报文之后才会进入 **CLOSED** 状态
  - 服务端收到 ACK 报文之后，就处于关闭连接了，处于 **CLOSED** 状态。

## 跨域
### 什么是跨域
浏览器遵循同源策略，协议、主机、端口都相同则为**同源**。
### 不同源的限制
- 不能读取和修改对方的DOM
- 不能访问对方的cookid indexDB LocalStorage
- **限制 xmlHttpRequest 请求**
### 解决跨域的方案
- CORS **跨域资源共享**
  - Origin 表示请求来自哪个源。
  - Access-Control-Allow-Origin 字段是服务器用来决定浏览器是否拦截这个响应的。
  - Access-Control-Allow-Origin 不包含 Origin 的范围，浏览器就会将响应拦截。
  - CORS 请求是非简单请求，会提前发送一个预检请求
    - 预检请求的方法是 OPTIONS 请求头会携带 Origin 
    - 另外会加两个字段 Access-Control-Request-Method - 本次请求方式 Access-Control-Request-Headers - 本次请求自定义头字段
    - 响应字段中 Access-Control-Allow-Origin Access-Control-Allow-Methods Access-Control-Allow-Credentials Access-Control-Allow-Headers Access-Control-Max-Age 这几个字段控制是否可以发送 CORS 请求。
      - Access-Control-Allow-Credentials - 否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回
      - Access-Control-Max-Age - 预检结果缓存时间
      - Access-Control-Request-Methods - 指定允许的请求类型
      - Access-Control-Request-Headers - 允许的请求头字段
- jsonp
XMLHttpRequest 对象需要遵循同源策略，但是 script 不需要，可以通过src填充地址发送get请求。[JSONP实现方式](https://juejin.cn/post/6844904100035821575#heading-72)
- nginx
Nginx 是一种高性能的反向代理服务器。

正向代理帮助客户端访问客户端自己访问不到的服务器，然后将结果返回给客户端。反向代理拿到客户端的请求，将请求转发给其他的服务器。

客户端的域名为 client.com 服务器的域名为server.com 。客户端直接发送请求会跨域。
```
server {
  listen  80;
  server_name  client.com;
  location /api {
    proxy_pass server.com;
  }
}
```
这里 Nginx 相当于一个跳板机，跳板机域名和客户端相同，让客户端访问 client.com/api Nginx 服务器作为反响代理将请求转发到 server.com 当响应后再返回给客户端。
- iframe postMessage
[跨域窗口通信](https://blog.csdn.net/qq_21423689/article/details/83783322)