---
id: browser
sidebar_position: 2
title: 浏览器
---

## 页面加载流程
从输入URL到页面加载发生了什么？
1. 浏览器输入 URL 回车
2. 浏览器查找当前 URL 是否有缓存，并比较缓存是否过期
3. DNS 解析到对应的 IP
4. 根据 IP 简历 TCP 链接(三次握手)
5. HTTP 发起请求
6. 服务器处理请求，浏览器接收HTTP响应
7. 渲染页面，构建DOM树
8. 关闭 TCP 连接(四次挥手)


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

### HTTP 请求的一些状态码
- 1xx - 信息提示
- 2xx - 成功
  - 200 - OK 响应正常，GET 和 POST 请求的响应应答文档会跟在其后
  - 201 - Created 服务器已经创建了文档，Location头给出了它的URL
  - 204 - No Content 没有新文档，浏览器应该继续显示原来的文档
- 3xx - 重定向
  - 301 - Moved Permanently 客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL。
  - 304 - Not Modified 客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用。
- 4xx - 客户端错误
  - 400 - Bad Request 请求出现语法错误
  - 401 - Unauthorized 访问被拒绝
  - 403 - Forbidden 资源不可用
  - 404 - Not Found 无法找到指定位置的资源
  - 405 - Method Not Allowed 请求方法。（GET、POST、HEAD、Delete、PUT、TRACE等）对指定的资源不适用
- 5xx - 服务器错误
  - 500 - Internal Server Error 服务器遇到了意料不到的情况，不能完成客户的请求。
  - 502 - Bad Gateway 服务器作为网关或者代理时
  - 504 - Gateway Timeout 网关超时

### 请求响应头配置
- 请求头
  - Accept - 可接受的响应内容类型（Content-Types）。例如：Accept: text/plain
  - Accept-Charset - 可接受的字符集。	例如：Accept-Charset: utf-8
  - Accept-Encoding - 可接受的响应内容的编码方式。例如：Accept-Encoding: gzip, deflate
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

### TCP 是如何发起和关闭连接
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

