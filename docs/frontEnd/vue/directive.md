---
id: directive
sidebar_position: 7
title: 指令
---

[针对vue的优化](https://juejin.cn/post/6850037281559543821)
## v-for
### v-for 中 key 的作用
key 作为虚拟DOM 的唯一标识，diff算法通过key操作可以更准确、更快速
- 更准确：可以解决删除操作时就地复用的问题。
- 更快速：在查找相同节点时，key存在于一个keyMap中，查找速度比遍历数组快。

## v-if


## v-model

## v-solt
### 默认插槽
- 子组件 `<slot></slot>`
- 父组件 `<childComp>******</childComp>`
### 具名插槽
- 子组件存在多个插槽，可以通过 `name='slotName'`
- 父组件 `v-slot:slotName` 
### 作用域插槽
有时让插槽内容能够访问子组件中的数据，正常情况下是不可以访问子组件的作用域的。需要在子组件的 slot 元素上绑定属性(**插槽 prop**) ；父组件通过 v-slot 来定义插槽 prop 的名称(default表示默认插槽，具名插槽则改为具名插槽的name值)。
- 子组件 `<slot :item="item"></slot>`
- 父组件 `<template v-slot:default="slotProps">`

## 自定义指令
Vue 自定义指令分为全局注册和局部注册两种。
- 全局注册：Vue.directive( id, [definition] )
- 局部注册：directives: { id: { definition }}
### 自定义指令钩子函数
- bind：只调用一次，指令第一次绑定到元素上执行；可以定义一个在绑定时执行一次的初始化行为。
- inserted：被绑定元素插入到父节点时执行；
- update：被绑定元素模版发生更新时执行，而不关心绑定的值是否发生改变；
- componentUpdated：被绑定元素所在模板完成一次更新周期时调用。
- unbind：只调用一次， 指令与元素解绑时调用。
### 常用的自定义指令
[Vue自定义指令](https://juejin.cn/post/6906028995133833230)

