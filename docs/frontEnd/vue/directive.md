---
id: directive
sidebar_position: 7
title: 指令
---

## v-for
[针对v-for的优化](https://juejin.cn/post/6850037281559543821)

## v-model


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
### v-copy 长按复制指令

