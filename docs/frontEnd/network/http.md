---
id: http
sidebar_position: 1
title: http
---

## 页面加载流程
从输入URL到页面加载发生了什么？
1. 浏览器输入 URL 回车
2. 浏览器查找当前 URL 是否有缓存，并比较缓存是否过期
3. DNS 解析到对应的 IP
4. 根据 IP 建立 TCP 链接(三次握手)
5. HTTP 发起请求
6. 服务器处理请求，浏览器接收HTTP响应（Content-Type：text/html）开始浏览器的解析和渲染工作
7. 关闭 TCP 连接(四次挥手)
8. 解析工作：构建**DOM树**(标记化、建树)；样式计算(格式化样式表、标准化样式属性、计算每个节点的具体样式)；生成**布局树 Layout Tree**
9. 渲染工作：建立图层树 Layer Tree 、生成绘制列表、生成图块和位图、显示器显示内容。

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
### 缓存相关 header 
- Expires：响应头，资源过期时间，GMT 格式的具体时间；
- Cache-Control：请求/响应头，精确控制缓存策略；
- if-Modified-Since：请求头，资源最近修改事件，浏览器告诉服务器；
- Last-Modified：响应头，资源近期修改事件，服务器告诉浏览器 GMT 格式具体时间；
- Etag：响应头，资源标识；
- if-None-Match：请求头，缓存资源标识；

控制强制缓存的字段分别是Expires和Cache-Control；
协商缓存的字段分别有：Last-Modified / If-Modified-Since和Etag / If-None-Match；
其中配对使用的字段有：If-Modified-Since 和 Last-Modified、Etag 和 If-None-Match。

### 浏览器缓存机制
[参考链接](https://juejin.cn/post/6844903634002509832)
网站中的静态资源(js、css、img)可以被缓存；案例假设：浏览器加载JavaScript文件 a.js 
- a.js 大小为 10 KB
- 请求头约定为 1 KB
- 响应头约定为 1 KB
浏览器每次请求 a.js 时，请求头1KB。，服务器读取磁盘文件 a.js 返回给浏览器(a.js 10KB + 响应头1KB)；一次访问总过需要花费**12KB**

1. 若无缓存，下次请求a.js服务器又重新读取磁盘文件返回给浏览器，访问10次，流量大概为 120KB。这样的缺点有：
- 浪费用户流量；
- 浪费服务器资源，每次都要读取磁盘文件，然后发送给浏览器。
- 浏览器要等待 a.js 下载并执行后才能渲染页面，影响用户体验。

2. 增加缓存机制
第一次访问 a.js，浏览器缓存 a.js 到本地磁盘(12KB)；浏览器再次请求，直接从浏览器缓存获取(200，from cache)，不再向服务器发送请求(0KB)。这样做可以减少流量消耗，减少下载时间；缺点有：
- 服务器上 a.js 更新时，浏览器感知不到，拿不到最新的

3. Expires 约定资源过期时间
服务器和浏览器约定过期时间，用 Expires 字段来控制过期的具体时间。第一次访问 a.js 服务器会返回 a.js 和缓存的过期时间(12KB)，浏览器接收到 a.js 并记录过期时间。在这个时间之前，浏览器再次访问 a.js 便不会在发送到服务器上，直接使用上一次缓存的文件(0KB)；过了这个时间，再次访问不再使用缓存，而是请求服务器，服务器重新读取磁盘文件，返回给浏览器，并告诉浏览器一个新的过期时间。优点：
  - 过期时间内，为用户节省了很多流量；
  - 减少了服务器重复读取磁盘的压力；
  - 缓存过期之后，能够得到最新的文件；
缺点：
  - 缓存过期之后，服务器不管 a.js 文件是否有变化，都会重新从磁盘读取文件，返回给浏览器。

4. Last-Modified If-Modified-Since 服务器告诉浏览器上次修改时间
服务器每次返回 a.js 文件的时候，还要告诉浏览器 a.js 在服务器上的最近修改时间 Last-Modified 和缓存过期时间 Expires。当超过过期时间，浏览器带上 if-Modified-Since(= Last-Modified) 请求服务器，服务器比较请求头里的 if-Modified-Since 和服务器上 a.js 的上次修改时间做比对，如果一直，则告诉服务器可以继续使用本地缓存(304)；若不一致，服务器则读取磁盘上的 a.js 文件返回给浏览器，同时告诉浏览器文件的最近的修改时间 Last-Modified 和过期时间 Expires。优点：
  - 缓存过期后，服务器检测文件没变化则不再发送给浏览器，节省了 a.js 文件的 10KB
  - 缓存获取后，服务器检测文件有变化则把最新的文件发送给浏览器
缺点：
  - Expires 过期时间浏览器可以随意修改，导致缓存使用可能不精准
  - Last-Modified 过期时间只能精确到秒。如果文件在1s内经常变动，服务器会检测文件的上次更新时间和缓存的过期时间在同一秒，则返回浏览器 304 ，这时候浏览器将拿不到最新的文件。
  - 如果服务器上文件被修改了，但是实际内容未改变，因为 Last-Modified 时间匹配不上而重新返回文件给浏览器

5. Cache-Control 增加缓存相对时间
为了优化上面可以修改过期过期时间的问题，服务器除了告诉浏览器 Exprise 同时告诉浏览器一个相对时间(单位秒) Cache-Control：max-age=10 ；浏览器优先检测 Catch-Control 如果有则忽略 Expires；如果没有 Cache-Control 则以 Expires 为准。

6. Etag 增加文件内容比对
为了解决文件修改只能精确到秒的问题，服务器引入 Etag 响应头，标识文件内容的唯一 ID。如果Etag没变，则文件内容没变，如果Etag变化，则文件内容有变化。每次浏览器请求服务器的时候，都需要带上 if-None-Match 字段，值为上次请求 a.js 文件时服务器返回给浏览器的 Etag。
  - 浏览器请求 a.js ，服务器从磁盘读取并返回 a.js。同时告诉浏览器过期绝对时间(Expires)、过期相对时间(Catche-Control: max-age=10)、上次修改时间(Last-Modified)、文件标识ID(Etag)
  - 10秒内再次访问 a.js 不再发送请求给服务器，而是直接使用浏览器本地缓存。
  - 11秒时，浏览器访问 a.js ，请求服务器带着 上次修改时间(if-Modified-Since)、上次文件Tag(if-None-Match)
  - 服务器收到请求后，发现有 if-None-Match，则和当前文件的 Etag 比较，忽略 If-Modified-Since 的比较，如果比对一直，则告诉浏览器可以继续使用本地缓存(304) ，若不一致，则从服务器磁盘读取文件返回给浏览器，并携带最新的过期绝对时间(Expires)、过期相对时间(Catche-Control: max-age=10)、上次修改时间(Last-Modified)、文件标识ID(Etag)

7. 请求路径增加版本号
使用 Expires 和 Cache-Control 浏览器都只有当到达缓存过期时间后，才会再次询问服务器。在这之前浏览器不知道服务器上是否有变化。

解决办法：因为浏览器不会缓存 html ，每次 a.js 文件更新时，都修改一下html文件中引入 a.js 文件的路径增加版本号改为为 a.js?version=0.0.1 当 a.js 文件变了，html中的引入路径也变了。除了使用版本号还可以使用 MD5hash 

8. Cache-Control 的其他值
**请求头**
  - max-age 浏览器不愿意接收超过这个时间的缓存，并且不接受过期缓存(除非max-stale存在)。
  - max-stale 如果有值，客户端可以接受过期时间不超过指定值的缓存; 如果没有值，客户端愿意接受过期缓存而无论过期过久。
  - min-fresh 客户端愿意接受一个新鲜度不小于当前age加上指定时间的响应，也就是在指定的后续一段时间内不会过期的响应。
  - no-cache 客户端示意缓存，在使用缓存的时候必须进行校验。
  - no-store 客户端示意缓存，不要存储本次请求的响应。但是对于已经缓存的内容则没有影响。
**响应头**
  - must-revalidate 一旦缓存过期，必须向源服务器进行校验，不得使用过期内容。如果无法连接必须返回504。
  - no-cache 如果值，在没有成功通过源站校验的情况下不得使用缓存；有值，在进行验证的时候不要发送值指示的头域。
  - no-store 不要缓存当前请求的响应
  - public 明确指明缓存可以给所有用户使用
  - private 明确指明缓存不可以给其他用户使用
  - max-age 如果缓存资源的缓存时间值小于指定时间值，则使用缓存；在缓存时间内，缓存服务器不再对缓存的有效性进行检验
  - s-maxage 缓存资源的时间小于指定时间时，直接返回缓存

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

## HTTPS
### https协议是什么？
https 和 http 一样是应用层协议，都是在 TCP 基础上工作的。https 协议在传输的过程中的数据经过加密了，是在TCP协议之上加了一层**SSL协议**来实现加密。

### https 和 http 的区别
- http协议工作在80端口，https协议工作在443端口
- https需要申请证书，用于验证服务器身份
- http在TCP三次握手建立连接之后即可开始传输数据，https协议则需要建立在TCP建立链接之后，客户端和服务端在**进行ssl加密确定对话密钥**，完成加密之后才开始传输数据。
- http协议传输的是明文；https协议传输的是密文

### SSL协议
**对称加密** —— 同一个密钥可以同时用作信息的加密和解密，这种加密方法成为**对称加密**，也被叫做共享密钥加密。**密钥如何交付给对方？**由于http协议是明文传输，所以密钥很容易被窃取而失去了密钥本身的意义。

**公开密钥加密** —— 假如使用着为服务端，服务端有两个密钥，一个私钥一个公钥，服务器端将公钥发送给客户端，客户端使用公钥进行加密，然后发送给服务端，只有服务器自己的私钥才能解析公钥加密的数据，而私钥一直保持在服务端，这种方式就实现了数据的安全传输。每次都使用私钥解析公钥，如果公钥很长，解密的运算会很大占用cpu性能，从而使网络延迟加大。

https协议同时使用了这两种加密方式，通过公开密钥加密的方式产生一个对话密钥，再使用对话密钥进行对称加密的方式传输数据。

**SSL协议的过程**
- 客户端向服务端发送请求 —— 请求中包含支持的ssl协议版本、客户端生成的**随机数(第一个)**、支持的压缩方式
- 服务端接收到客户端请求，并向客户端发送请求 —— 响应中包含确认协议版本、服务器产生的**随机数(第一个)**、确定加密方法、服务器证书(包含公钥)
- 客户端收到请求，对证书进行校验 —— 校验证书的颁发机构、证书中的域名和实际域名是否一致、证书是否过期、如果校验不通过，浏览器则会显示警告；
- 校验通过，客户端会发送回应请求 —— 请求包含客户端生成的随机数，并且该随机数通过服务器返回的公钥进行加密生成一个**新的随机数(第一个)**(表示之后的通讯都会通过双方商定的加密算法进行通信)**发起编码改变通知**；客户端握手结束通知，表示客户端的握手阶段结束，
- 服务器收到最后的回应之后，使用服务器的私钥解析出来客户端发来的第三个随机数，并使用与客户端约定好的加密算法将三个随机数生成对话密钥。服务器返回**响应编码改变通知**；服务器握手结束通知，表示服务器的握手阶段结束。

整个加密过程的核心是客户端和服务端产生的三个随机树，这三个随机数用于产生后续数据传输的加密密钥。这三个随机数是可以被劫持到的，但是由于第三个随机数是使用了服务器的公钥进行了加密传输，理论上只有服务器的私钥才能解析获取到第三个随机数。所以使用这三个随机数生成的对话密钥是安全的。之后的数据传输是使用这个对话密钥进行对称加密，从而保证了传输的**安全性和效率**。

## 跨域
### 什么是跨域
浏览器遵循同源策略，协议、主机、端口都相同则为**同源**。
### 不同源的限制
- 不能读取和修改对方的DOM
- 不能访问对方的cookid indexDB LocalStorage
- **限制 xmlHttpRequest 请求**
### 解决跨域的方案
1. CORS **跨域资源共享**
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

2. **jsonp**

  XMLHttpRequest 对象需要遵循同源策略，但是 script 不需要，可以通过src填充地址发送get请求。[JSONP实现方式](https://juejin.cn/post/6844904100035821575#heading-72)

3. **nginx**

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

4. **iframe postMessage**
  [跨域窗口通信](https://blog.csdn.net/qq_21423689/article/details/83783322)