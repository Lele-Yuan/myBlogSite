---
id: performance
sidebar_position: 2
title: 性能优化
---

## 如何捕获错误
[前端异常监控解决方案研究](https://cdc.tencent.com/2018/09/13/frontend-exception-monitor-research/)
### 全局捕获
1. **window.onerror**

  window.onerror 是一个全局变量，默认值为null；当 js 运行时错误出发时，window会触发 onerror 事件，并执行 window.onerror()。
  - **可以接收多个参数(message, source, lineno, colno, error)**
    - message：错误信息（字符串）。可用于HTML onerror=""处理程序中的event。
    - source：发生错误的脚本URL（字符串）
    - lineno：发生错误的行号（数字）
    - colno：发生错误的列号（数字）
    - error：Error对象
  - **返回值 true/false**
    - 若该函数返回true，则阻止执行默认事件处理函数，如异常信息不会在console中打印。
    - 没有返回值或者返回值为false的时候，异常信息会在console中打印。
2. **window.addEventListener(‘error’)** 

  捕获js运行时错误事件，和window.onerror功能类似，但是 [参考链接](https://segmentfault.com/a/1190000023259434)
    - 先于 window.onerror 执行；
    - 事件回调中只能接收一个包含着所有错误信息的参数；
    - 不能阻止默认事件处理函数的执行；
    - 全局捕获资源加载异常的错误；当资源(img/script)加载失败时，加载资源的元素会触发一个Event接口上的error事件，并执行该DOM元素上的onerror()处理函数，这个事件不能冒泡到window上，因此需要在捕捉阶段捕获事件window.addEventListener(‘error’)。
3. **window.addEventListener(“unhandledrejection”)**

  可以捕捉未处理的 Promise 错误(reject)；当时没有处理但是稍后又得到了处理，此时会触发 rejectionhandled 事件。

### 框架级别的全局监听
1. app.config.errorHandler

  这是Vue中最广泛使用的异常处理方式。指定一个处理函数来处理组件**渲染方法执行期间**以及**监听器抛出的未捕获的**错误。函数被调用时可以获取错误信息和应用实例。
  ```
  app.config.errorHandler = (err, vm, info) => {
    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  }
  ```
2. app.config.***
  - warnHandler 用来捕获 Vue warning，在生产环境不起作用。
  - renderError 不适用于全局，和组件相关，只能用在非生产环境

### 对全局函数try/catch包裹
[参考链接](https://blog.csdn.net/github_38823514/article/details/74178347)

### 重写实例方法
  例如对console.error进行重写，在使用方法不变的情况下也可以异常捕获。

### 单点捕获
  在业务代码段进行 try/catch 包裹，或者在流程中打点，实现有针对性的异常捕获。

### 跨域脚本异常
  浏览器的安全策略机制，跨域脚本报错时，无法直接获取错误的详细信息，只是会得到一个 Script Error ，解决方案：
  - 将 js 内联到 HTML 中；或者将 js 文件和 HTML 放到同一个域下
  - 给 HTML 上的 script 标签增加 crossorigin 属性；被引入的脚本所在服务端响应头上增加 Access-Control-Allow-Origin 来支持跨域资源共享。

## 减少HTTP请求数、 缩短请求时间
- 合并 js css 文件
- 图片转为 base64 嵌入 HTML 文件中
- 使用内嵌 SVG

## 优化 DNS 解析
输入 URL 之后，浏览器首先查找域名(hostname)对应的服务器 IP 地址，一般耗费20～120毫秒；浏览器都会有相应的 DNS 缓存机制；首次访问没有缓存时，域名越多查询时间越长，所以应该尽量减少域名数量。
- 减少 DNS 的请求数量
- 进行 DNS 预获取
  DNS预获取是让具备此属性的域名，允许用户在不点击链接就在后台解析，而DNS解析和内容载入是串行的操作，所以DNS预获取可以减少用户的等待时间，提高用户体验。

  DNS Prefetch 应该尽量的放在网页的前面，推荐放在 `<meta charset="UTF-8">` 后面。具体使用方法如下：
  ```
  <meta charset="UTF-8">
  <meta http-equiv="x-dns-prefetch-control" content="on">
  <link rel="dns-prefetch" href="//www.zhix.net">
  <link rel="dns-prefetch" href="//api.share.zhix.net">
  <link rel="dns-prefetch" href="//bdimg.share.zhix.net">
  ```

  `<meta http-equiv="x-dns-prefetch-control" content="off">` 用来禁止隐式的DNS预获取。
- CDN 加速

## 增加 HTTP 缓存
- 配置 Expires / Cache-Control 
- 配置 Etag / Last-Modify

## 使用 CDN 缓存
- 一些静态内容存放在 CDN 服务器上；
- 静态内容：响应头设置 Expires 为将来很远的时间，实现「永不过期」策略；
- 动态内容：响应头设置合适的 Cache-Control 让浏览器有条件地发起请求。

## 启用 Gzip 
- 启用gzip需要客户端和服务端的支持；
- 请求头重 accept-encoding 说明客户端支持的压缩方式；
- 响应头中返回服务器配置的压缩方式 content-encoding: gzip ；
- Gzip 压缩通常可以减少 70% 的响应大小。

## 减少 cookie 的使用
- cookie 在服务器和浏览器之间来回传递，cookie 过大会影响响应速度；
- 去掉不必要的 cookie ，尽量缩小 cookie 大小；
- 设置 domain 尽量不影响 sub domain； setDomain(“.xxx.xx”)

## 脚本文件放置底部
- 浏览器下载js脚本时，会阻塞其他资源并行下载
- defer 和 async 属性
  - async=true： 脚本异步执行
  - defer=true： 脚本将会在页面完成解析后执行

## 减少 DOM 操作
- 缓存已经获取过的 DOM 元素；
- 使用 DocumentFragment 暂存 DOM ，整理好后再插入 DOM 树中；
- 操作 className 代替操作 style
- 避免使用 js 修复布局

## 使用高效的时间处理
- 减少绑定时间监听的节点，使用事件委托；
- 尽早处理事件，在 DOMContentLoaded 即可进行；
- 高频触发的事件，使用 debounce 等机制降低执行频率。
