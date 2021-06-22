---
id: vueRouter
sidebar_position: 3
title: vueRouter
---

## vueRouter 的两种模式
### hash 模式
- #符号本身以及它后面的字符称之为 hash ，可通过window.location.hash属性读取。
- hash虽然出现在URL中，但不会被包括在HTTP请求中。它是用来指导浏览器动作的，对服务器端完全无用，因此，改变hash不会重新加载页面。
- 为 hash 的改变添加监听事件 **window.addEventListener("hashchange", funcRef, false)**
- vueRouter 中 pushHash(path) 主要是实现 **window.location.hash = path**
- replaceHash(path) 主要是实现 
  ```
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
  ```
- 视图跟新的实现：
  - vue.use(vueRouter) - 执行 vueRouter.install
  - vueRouter.install - 执行 history.listen 监听 history 并绑定 this.cb
  - vueRouter.push 调用 transitionTo -> updateRoute -> this.cb 更新视图
  - 从设置路由到更新视图的流程如下
  ```
  $router.push() --> HashHistory.push() --> History.transitionTo() --> History.updateRoute() --> {app._route = route} --> vm.render()
  ```
  ```
  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    this.transitionTo(location, route => {
      pushHash(route.fullPath)
      onComplete && onComplete(route)
    }, onAbort)
  }
  transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const route = this.router.match(location, this.current)
    this.confirmTransition(route, () => {
      this.updateRoute(route)
      ...
    })
  }
  updateRoute (route: Route) { 
    this.cb && this.cb(route)
  }
  listen (cb: Function) {
    this.cb = cb
  }

  init (app: any /* Vue component instance */) {
    this.apps.push(app)
    history.listen(route => {
      this.apps.forEach((app) => {
        app._route = route
      })
    })
  }

  export function install (Vue) {
    Vue.mixin({
      beforeCreate () {
        ……
        this._router.init(this)
        ……
      },
    })
  }
  ```

### history 模式
- History interface是浏览器历史记录栈提供的接口，通过back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作。
- 从HTML5开始，History interface提供了两个新的方法：pushState(), replaceState()使得我们可以对浏览器历史记录栈进行修改。
  ```
  stateObject = {
    title,
    URL
  }
  window.history.pushState(stateObject, title, URL)
  window.history.replaceState(stateObject, title, URL)
  ```
- 调用 pushState replaceState 修改了浏览器历史记录栈后，url 改变了但浏览器不回立即发送该url的请求，为但页面应用路由实现**更新视图但不重新请求页面**提供了基础。
- 试图更新的实现：(视图更新流程和hash类似)
  ```
  $router.push() --> HashHistory.push() --> History.transitionTo() --> History.updateRoute() --> {app._route = route} --> vm.render()
  ```
  ```
  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(location, route => {
      pushState(cleanPath(this.base + route.fullPath))
      handleScroll(this.router, route, fromRoute, false)
      onComplete && onComplete(route)
    }, onAbort)
  }

  export function pushState (url?: string, replace?: boolean) {
    saveScrollPosition()
    // try...catch the pushState call to get around Safari
    // DOM Exception 18 where it limits to 100 pushState calls
    const history = window.history
    try {
      if (replace) {
        history.replaceState({ key: _key }, '', url)
      } else {
        _key = genKey()
        history.pushState({ key: _key }, '', url)
      }
    } catch (e) {
      window.location[replace ? 'replace' : 'assign'](url)
    }
  }
  ```
## hash 和 history 比较
### history 模式的优势
- pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL。
- pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而 hash 必须改变时才会触发记录添加到栈中。
- pushState通过stateObject可以添加任意类型的数据到记录中(如额外的 title 属性)；而hash只可添加短字符串。
### history 模式的问题
- 访问 http://hostname/path/page 时候，如果后端没有配置 /path/page 的路由处理，则会返回 404 
- 官方推荐的解决办法：在服务端增加一个覆盖所有情况的候选资源。如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面。同时这么做服务器就不会再返回 404 页面了，为了避免这种情况，在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。当没有匹配到路由的时候返回 404，从而实现 fallback(应急计划) 。

[参考连接](https://zhuanlan.zhihu.com/p/27588422/)

## $route 和 $router
- $router为VueRouter的实例，相当于一个全局的路由器对象，有很多属性和方法，如 push replace back go 等方法。
- route相当于当前正在跳转的路由对象，包含 name path params query 等属性。
- path 中 **/name** 和 **name** 的区别：以 / 开头的会被当做路径，就不会一直嵌套之前的路径