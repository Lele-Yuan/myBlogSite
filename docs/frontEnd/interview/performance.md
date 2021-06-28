---
id: performance
sidebar_position: 3
title: 性能优化
---

## 减少HTTP请求数、 缩短请求时间
- 合并 js css 文件
- 图片转为 base64 嵌入 HTML 文件中
- 使用内嵌 SVG

## 减少 DNS 解析
- 输入 URL 之后，浏览器首先查找域名(hostname)对应的服务器 IP 地址，一般耗费20～120毫秒；
- 浏览器都会有相应的 DNS 缓存机制；
- 首次访问没有缓存时，域名越多查询时间越长，所以应该尽量减少域名数量。
- cdn 加速

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
- 今早处理事件，在 DOMContentLoaded 即可进行；
- 高频触发的事件，使用 debounce 等机制降低执行频率。
