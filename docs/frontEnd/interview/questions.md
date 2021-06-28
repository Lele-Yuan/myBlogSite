---
id: questions
sidebar_position: 4
title: 面试题
---

[参考连接](https://mp.weixin.qq.com/s/_k5HwyDWLBauzUKriVbmmw)

## [webStorage](/docs/frontEnd/javascript/webStorage)
### localstorage,sessionstorage有什么区别
### cookie,session 的区别
### cookie 有哪些属性？
### localStorage 在不同浏览区的size是多少？如果获取
[localStorage 值的最大大小是多少？](https://blog.csdn.net/asdfgh0077/article/details/104016606)

Chrome（45.0.2454.101）： 5242878个字符
Firefox（40.0.1）： 5242883个字符
Internet Explorer（11.0.9600.18036） ： 16386 122066 122070个字符

## JavaScript
### 使用过 ES6 的什么api
### ES6 的 proxy 和 reflect
### Promise 
  - Promise 是为了解决什么问题？ 
  - Promise 有哪些API？
  - Promise.all 和 Promise.allSettled 的区别
### 数组的那些API可以改变本身，那些不会
### [说一下 Event_Loop](/docs/frontEnd/javascript/eventLoop)
### 浏览器如何区分微任务和宏任务
### node 的 Event_Loop 有什么不同
### lodash 的常用方法
### 递归优化方案
### [async await](/docs/frontEnd/javascript/asyncawait) 和 [promise](/docs/frontEnd/javascript/promise) 的关系
### 如何判断 setTimeout 是否准时，为什么会不准时
### 全局的错误日志收集
- [前端错误日志收集方案](https://juejin.cn/post/6844903700272513031)
- [前端错误收集以及统一异常处理](https://juejin.cn/post/6844903709323837454)
### H5 和 APP 的通讯方式
### 点击列表中的某个元素如何获取到索引

## vue 框架
### Object.defineProperty 和 proxy 的批量更新
### vue避免重复渲染的一些手段
### style scoped实现原理？
### 如何穿透 scoped
### vue3 和 vue2 的区别
### composition-api 的优势
### v-if 和 v-for 在同一个标签上 vue2 和 vue3 的不同 
### vue-router 的两种模式和区别
### vue-router 实现不刷新页面且内容变化的原理
### history 模式 404 如何处理
### nextTick
### keep-alive 的应用场景和注意事项
### 生命周期有哪些
### beforeCreated created 之前做了什么
### computed 和 watch 的区别
### vuex 的几个模块，actions 和 mutations 的区别
### axios 为什么要封装起来
### 组件中的 name 属性作用是什么
- 嵌套组件可以通过 name 引入自身
### vue 通过下标的改写数组的值，页面为什么不更新，如何解决

## 性能优化
### 针对浏览器做的优化
- 缓存
- 代理
- SSR
### 如何对大数据的遍历进行优化
### 渲染优化
### 解析 css 解析会影响 dom 渲染
### 减少回流重绘
- 为什么 transform 比 left 性能好
### web worker
### 首页优化

## webpack
### webpack 的配置
### webpack 打包流程
### webpack 的优化
#### 打包的大小
### webpack loader 和 plugin

## http
### http1 和 http2 的区别
### http 缓存
### https 和 http 的区别
### http 状态码
### http 请求方法
### options 请求是做什么用的
### 从输入 url 到 展示页面发生了什么
### 如何解决跨域
### 如何配置 Nginx 实现跨域的原理
### iframe 的安全处理
### webSocket 的使用场景
### webSocket 的响应原理
### webSocket 如何控制断开和连接的时间

## CSS 
### flex 布局的常用属性
### css3 的伪类选择器都有哪些

## 业务相关思路
### 权限控制应该怎么设计
### 开发一个弹窗组件，需要怎么设计
### npm 组件库的流程
