---
id: other
sidebar_position: 10
title: 其他
---

## vue2 为什么只允许一个跟节点
[参考链接](https://www.cnblogs.com/shababy/p/13517396.html)
### 实例话Vue
`new Vue({el:'#app'})` 在实例话vue的时候，需要指定一个el选项，来指定SPA的入口。Vue 实例化的时候，需要通过 `document.querySelector(el)` 获取vm.$el。

### 单文件组件
一个单文件组件会被 vue-loader 处理成一个 js 文件，当用 import 引入这个组件时实际上是引入了一个 vue 实例，同样需要指定实例的入口。

## vue3 为什么允许多个跟节点
Vue.js 3.0 支持了 Fragment 的语法，即组件可以有多个根节点。

`document.createDocumentFragment()` 创建出来的节点包含一个虚拟的跟节点，`#document-fragment`