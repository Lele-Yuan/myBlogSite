---
id: questions
sidebar_position: 4
title: 面试题
---

[参考连接](https://mp.weixin.qq.com/s/_k5HwyDWLBauzUKriVbmmw)

## [webStorage](/docs/frontEnd/javascript/webStorage)
- localstorage,sessionstorage有什么区别
- cookie,session 的区别
- cookie 有哪些属性？
- localStorage 在不同浏览区的size是多少？如果获取
[localStorage 值的最大大小是多少？](https://blog.csdn.net/asdfgh0077/article/details/104016606)

## JavaScript
### [使用过 ES6 的什么特性](/docs/frontEnd/javascript/es6)
### [ES6 的 proxy 和 reflect](/docs/frontEnd/javascript/es6#proxy)
### [ES6 的 Set 和 Map 作用、如何取值](/docs/frontEnd/javascript/datatype#集合-set-weakset)
### [ES6 的箭头函数](/docs/frontEnd/javascript/es6#箭头函数-)
### [Promise](/docs/frontEnd/javascript/promise) 
  - Promise 是为了解决什么问题？ 
  - Promise 有哪些API？
  - Promise.all 和 Promise.allSettled 的区别
### [async await](/docs/frontEnd/javascript/asyncawait) 和 [promise](/docs/frontEnd/javascript/promise) 的关系
### 数组的那些API可以改变本身，那些不会
### [说一下 Event_Loop](/docs/frontEnd/javascript/eventLoop)
### 浏览器如何区分微任务和宏任务
### node 的 Event_Loop 有什么不同
### lodash 的常用方法
### 递归优化方案
### 如何判断 setTimeout 是否准时，为什么会不准时
### [全局的错误日志收集](/docs/frontEnd/network/performance#如何捕获错误)
### H5 和 APP 的通讯方式
### 点击列表中的某个元素如何获取到索引
### reduce 的高级用法
### 大数据遍历如何优化
### webwork 如何启动一个线程？有哪些API
### canvas 的 restore 和 save
### 浮点数相加的结果不准确如何处理

## typsScript
### type 和 interface 的区别
### typeScript 范型
### typeScript 和 Eslint 的区别

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
### nextTick 的应用场景和原理
### keep-alive 的应用场景和注意事项
### keep-alive 是如何做数据保持的？
### transation
### 生命周期有哪些
### beforeCreated created 之前做了什么
### computed 和 watch 的区别
### computed 和 method 的区别
  - computed 不可以使用异步函数；可缓存结果，在使用到计算属性时，如果依赖数据未改变，则直接返回值不会重新计算。
  - method 可以使用异步函数；只要调用该方法就重新执行方法。
### vuex 的几个模块，actions 和 mutations 的区别
### axios 为什么要封装起来
### 组件中的 name 属性作用是什么
- 嵌套组件可以通过 name 引入自身
### vue 通过下标的改写数组的值，页面为什么不更新，如何解决
### [npm 组件库开发流程](https://juejin.cn/post/6844903929633849357)
### npm 组件库开发过程中如何进行调试
### 自定义指令，都有哪些生命周期
### 插槽有哪几种？匿名插槽、具名插槽、作用域插槽
### 父子组件如何通信
### provide 和 inject 可以异步传值吗？
### eventBus

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
### webpack 的 compiler 对象

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
### 什么是 BFC 特性 如何触发
### flex 布局的常用属性
### flex: 1 是什么
### 实现垂直水平居中的几种方案
### 如何实现响应式布局
### css3 的伪类选择器都有哪些
### less 如何定义变量和函数
### rem 单位换算的插件
  - flexible 会根据屏幕宽度设置 html 根元素的 font-size
  - postcss-px2rem 将 px 单位换算成 rem 单位。 vue.config.js 配置 css 相关 loaderOptions 
  ```
  loaderOptions: {
    css: {},
    postcss: {
      plugins: [
        //remUnit这个配置项的数值是多少呢？？？ 通常我们是根据设计图来定这个值，原因很简单，便于开发。
        //假如设计图给的宽度是750，我们通常就会把remUnit设置为75，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。
        require('postcss-px2rem')({
          remUnit: 75
        })
      ]
    }
  },
  ```

## 小程序
### 小程序的登陆流程
### 小程序的分享流程
### 小程序获取 Cookie 和 H5 的区别
### 小程序如何与 H5 通信
### 小程序使用 webview 嵌入 H5 的步骤，需要注意什么？
### 是否可以在微信系统外打开小程序？

## git
### git fetch 和 git pull 的区别
### git reset 的模式
### 如何撤销add commit push

## 业务相关思路
### 权限控制应该怎么设计
### 开发一个弹窗组件，需要怎么设计
### npm 组件库的流程
### 最复杂的项目
