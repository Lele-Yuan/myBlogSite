---
id: vue2
sidebar_position: 1
title: vue3 vue2 区别
---

## 风格区别
### vue2 option-api
- 条理清晰，相同的内容放在相同的地方。
- 项目较大时，代码比较分散之间的关联性较低，会增加阅读难度。
- 调用使用 this 逻辑过多时会出现 this 指向不明问题。
- 实现代码重用的方式是 vue.Mixins 很容易发生命名重复。
### vue3 composition-api
- 根据逻辑组织代码，提高了可读性和可维护性。
- 基于 composition-api 可以更好的重用代码逻辑。
- Composition API对 **tree-shaking** 友好，代码也更容易压缩。
- Composition API中没有对this的使用，减少了this指向不明的情况

## 使用区别
### template 标签
vue3 的 Template 支持 Fragments (碎片) 也就是多个根标签； vue2 只能有一个根节点

## 初始化
vue3 使用 createApp(组件)
vue2 使用 new Vue()

## data
template 中如何使用 vue 声明的响应式数据。 **{{ username }}**
### vue data
vue2 将数据放到 data 属性中
  ```
  data () {
    return {
      username: '',
      password: ''
    }
  }
  ```
### vue proxy
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

## method 
### vue2 methods 属性
```
methods: {
  login () {
    // 登陆方法
  }
}
```
### vue3 setup中返回
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