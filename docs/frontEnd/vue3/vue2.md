---
id: vue2
sidebar_position: 1
title: vue3 的优化点
---

## 编程方式
### vue2 option-api
- 条理清晰，相同的内容放在相同的地方。
- 项目较大时，代码比较分散之间的关联性较低，会增加阅读难度。
- 调用使用 this 逻辑过多时会出现 this 指向不明问题。
- 实现**代码重用**的方式是 vue.Mixins 很容易发生命名重复。
### vue3 composition-api
- 根据逻辑组织代码，提高了可读性和可维护性。
- 基于 composition-api 可以随用随取有更好的**重用性和可扩展性**。
- Composition API对 **tree-shaking** 友好，代码也更容易压缩。
- Composition API中没有对 this 的使用，减少了this指向不明的情况。
- 更加支持 TypeScript 

## 数据响应式机制
### vue2 Object.definedProperty
- 针对对象属性的响应；若监听到对象的所有属性，需要循环遍历所有 key
- 对数组只监听到了 push pop shift unshift splice sort reverse 7个 api
- 对象添加删除属性时无法监听到
### vue3 new Proxy
- 针对对象本身，不需要循环遍历对象的所有属性，优化了性能。
- 数组本身也是一种对象，对数组的兼容性更好。可以通过下标修改数组、修改数组长度等操作
- 可以监听到对象的添加和删除操作

## Diff 算法优化
- vue2 全量比较；vue3 增加(PatchFlag)
- vue2 父组件更新渲染也会更新子组件；vue3父组件和子组件更新是分开的

## 静态提升
vue2 在创建 vdom 时全量创建；

vue3 中不参与更新的元素会做静态提升，只创建一次，在渲染时候复用即可。

## 事件监听缓存
vue2 中需要对事件增加静态标记，更新DOM时候还会对方法进行对比

vue3 缓存事件监听


## 使用区别
### template 标签
vue3 的 Template 支持 Fragments (碎片) 也就是多个根标签； vue2 只能有一个根节点

## 初始化
vue3 使用 createApp(组件)
vue2 使用 new Vue()

## setup

### data
template 中如何使用 vue 声明的响应式数据。 **{{ username }}**
#### vue2 data
vue2 将数据放到 data 属性中
  ```
  data () {
    return {
      username: '',
      password: ''
    }
  }
  ```
#### vue3 reactive
- vue3 在 setup 中，分3步简历响应式数据
  - 引入 reactive **import { reactive } from 'vue'**
  - 使用 reactive 声明响应式数据
  - 使用 setup 方法返回响应式数据。
```
import { reactive } from 'vue'

export default {
  setup () {
    const state = reactive({
      username: '',
      password: ''
    })

    return { state }
  }
}
```

### method 
#### vue2 methods 属性
```
methods: {
  login () {
    // 登陆方法
  }
}
```
#### vue3 setup中返回
```
setup () {
  const login = () => {
    // 登陆方法
  }
  return { 
    login
  }
}
```