---
id: vuex
sidebar_position: 1
title: vuex
---

## vuex 是什么
- vuex 是专门为vue应用程序开发的状态管理模式，用来集中存储/管理应用中的所有组件状态(也就是我们需要共享的data)。
- Vuex采用MVC模式中的Model层，规定所有的数据必须通过action—>mutaion—>state这个流程进行来改变状态的。
- 适用于大型项目，小项目使用 Vuex 可能是繁琐冗余的。
- 单向数据流

![vuex](./img/vuex.png)

## vuex 中的5个基本对象
### state
存储状态。this.$sotre.state.name
### getter
对数据获取之前再次编辑，可以理解为 state 的计算属性。this.$sotre.getters.fun()
### mutations
- 修改状态，并且是同步的。this.$store.commit('mutationName',params)
- mutations 中的方法一般不直接使用，需要由 actions 中的 commit 方法调用。
### actions
- 异步操作。this.$store.dispath('actionName',params)
- 内部调用 store.commit('mutationName',params)
### modules
- store的子模块，为了开发大型项目，方便状态管理而使用的。

## vuex 初始化
```
// store.js 初始化 store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    count: 0
}
const getters = {
    getterCount(state, n = 0) {
        return (state.count += n)
    }
}
const mutations = {
    mutationsAddCount(state, n = 0) {
        return (state.count += n)
    },
    mutationsReduceCount(state, n = 0) {
        return (state.count -= n)
    }
}
const actions = {
    actionsAddCount(state, n = 0) {
        console.log(state)
        return state.commit('mutationsAddCount', n)
    },
    actionsReduceCount({ commit }, n = 0) {
        return commit('mutationsReduceCount', n)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
```

```
// main.js 引用 store
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store' // 引入store
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
```


## vuex 的使用
```
// page.vue
<div>{{$store.state.count}}</div>
<div>{{getCount}}</div>
<div @click="handleActionsAdd(10)">actions增加</div>
<div @click="handleActionsReduce(10)">mutations减少</div>

motheds:{
  handleActionsAdd(n){
    this.$store.dispatch('actionsAddCount',n)
  },
  handleActionsReduce(n){
    this.$store.commit('mutationsReduceCount', n)
  }
}
computed: {
  getCount(){
    return this.$store.getters.getterCount
  }
}
```

## vuex 的简易使用
### mapState mapMutations mapActions mapGetters
```
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'


computed: {
  ...mapState({
    count: state => state.count
  }),
  ...mapGetters({
    getCount: getters => getters.getterCount
  }),
},
methods: {
  ...mapMutations({
    handleAddClick: 'mutationsAddCount',
    handleReduceClick: 'mutationsReduceCount'
  }),
  ...mapActions({
    handleActionsAdd: 'actionsAddCount',
    handleActionsReduce: 'actionsReduceCount'
  })
}
```

## vuex 懒加载
[参考连接](https://juejin.cn/post/6974948716771803144)
- new Vuex.Store({})
- 未注册vuex任何module的state是空的
- 在你需要用到Vuex的页面进行手动注册。
- import 方法是异步的，加载成功后会调用 .then 回调并将 文件内容传给回调函数
```
export default {
  beforeCreate(){
    import('../store/modules/home').then(res=>{
        this.$store.registerModule('home',res.default)
    })
  }
}
```

## vuex 核心原理
vuex 是一个对象，包含属性 install store
### 执行顺序
- 当ues(Vuex)时候，会调用vuex中的install方法
  ```
  Vue.use(Vuex); // vue的插件机制,安装vuex插件
  ```
- Vue.mixin({ beforeCreate: vuexInit });
