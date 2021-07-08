---
id: axios
sidebar_position: 8
title: axios
---
## axios 原理
axios是一个基于promise封装好的发送请求、返回响应的http库，可以应用在浏览器中和node.js中。

## axios 特点
- 浏览器中发送请求会创建 XMLHttpRequests；在 node.js 发送请求会创建 http请求
- 返回 Promise 对象
- 支持拦截器 interceptors 可以分别设置请求拦截器和相应拦截器。
- 支持取消请求 CancelToken

## 拦截器
[Axios的拦截器原理以及请求等待重发的实现](https://www.jianshu.com/p/115b4c79a75d)

## 断点续传 进度条 取消上传
[利用axios实现断点续传并支持进度条和取消上传](https://zhuanlan.zhihu.com/p/136147620)