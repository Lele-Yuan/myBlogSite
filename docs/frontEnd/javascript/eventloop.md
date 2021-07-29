---
id: eventLoop
sidebar_position: 6
title: eventLoop
---

## 浏览器多进程
浏览器能够运行是因为系统给它的进程分配资源(CPU、内存)。没开一个标签页就相当于创建了一个独立的浏览器进程。
### 浏览器进程
- Brower进程(主进程)
    - 负责浏览器界面的显示，用户交互(前进后退等)
    - 负责管理各页面，创建、销毁其他进程
    - 负责将渲染进程得到的内存中的位图(Bitmap)绘制到用户界面上
    - 网络资源管理(下载等)
- GPU进程
    - 最多一个，用来3D绘制
- 浏览器渲染进程(浏览器内核)
    - 该进程内部是多线程
    - 每个标签页是一个进程，互不影响
    - 负责页面渲染、脚本执行、事件处理等
- 第三方插件进程
### 浏览器内核
#### 多线程
- GUI线程
    - 负责渲染页面(解析HTML、CSS文件，构建DOM树、CSS树，将DOM树和CSS树合并成render树)
    - 将渲染结果(bitmap)交给主线程(Brower进程)显示
    - 当界面重绘、回流时该线程会执行
- JS引擎线程(主线程)
    - 也叫JS内核，负责解析处理js脚本，运行代码
    - 一个标签页无论何时都只有一个JS引擎线程执行js代码
- 事件触发线程
    - 用来控制事件循环
    - 有事件时就会添加事件到事件线程中，比如当JS引擎线程执行代码块setTimeout时会将对应的任务添加至事件线程中。
    - 管理任务队列，当满足触发条件时事件触发线程就会将事件监听函数放到任务队列的队尾等到JS引擎线程空闲了时调用。
- 定时器线程
    - setTimeout和setInterval所在的线程
    - 负责计时，计时完毕后将监听事件添加至任务队列里
    - 假如由JS引擎计时会计时不准，因为JS引擎是单线程可能会发生堵塞。
- 异步HTTP请求线程
    - 在XMLHttpRequest连接后通过浏览器新开一个线程请求
    - 在检测到状态变更时，若有设置回调函数，异步线程就会产生状态变更事件并将该回调函数添加到事件队列的队尾，等待JS引擎空闲了调用。
### 浏览器内核线程之间的关系
#### GUI渲染线程和JS引擎线程互斥
- 由于JS是可操控DOM的，如果在修改某些元素属性的同时渲染界面，那么渲染前后可能获取到的元素数据就可能不一致了。
- 当JS线程被执行时GUI线程会被挂起，GUI更新会保存在一个队列中，等JS引擎空闲时再执行。
#### JS阻塞页面的渲染
假设JS引擎正在进行巨量的计算，此时就算GUI有更新，也会被保存到队列中，等待JS引擎空闲后执行，这样就会造成页面渲染的不连贯，因此要避免JS执行时间过长。
#### webwork 多线程
- webwork 提供了在后台线程中运行脚本的线程，该线程可以执行任务且不干扰渲染(不能操作DOM)。
- webwork 是用构造函数创建一个线程对象(JS引擎向浏览器申请开一个子线程)，执行命名JavaScript文件。
- webwork 的线程运行在另一个全局上下文中(不是window上)
- JS引擎线程与worker线程间通过特定的方式通信(postMessage API，需要通过序列化对象来与线程交互特定的数据)

### 浏览器渲染流程
#### load事件和DOMContentLoaded事件先后顺序
- DOMContentLoaded事件触发时，当DOM加载完成(不包含样式表、图片等)
- 当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片都已经加载完成了。
#### css加载阻塞dom树渲染
- css是由单独的下载线程异步下载的。
- css加载不会阻塞DOM树解析（异步加载时DOM照常构建）
- 但会阻塞render树渲染（渲染时需等css加载完毕，因为render树需要css信息）
#### 普通图层和复合图层
- 浏览器渲染的图层一般包含两大类：普通图层以及复合图层。
- GPU中，各个复合图层是单独绘制的，所以互不影响。
- 复合图层包含默认复合层和其他复合图层。
- 普通文档流内可以理解为一个复合图层(默认复合层)。
- 通过硬件加速的方式，可以声明一个新的复合图层，可以独立于普通文档流中，改动后可以避免整个页面重绘，提升性能。
- 变成复合图层(硬件加速)的常用方式有：
    - translate3d、translateZ
    - opacity、过渡动画
    - will-chang属性，一般配合opacity与translate使用
    - `<video>``<iframe>``<canvas>``<webgl>`等元素

**EventLoop** 叫做**事件循环**，在程序中有异步的情况时需要考虑，是为了解决 JavaScript 单线程在运行时不会阻塞的一种机制，也叫做异步原理。

JavaScript 任务 task 被分成**宏任务 MacroTask 和微任务 MircoTask **。分别由 Task Queue和 MircoTak Queue 管理。

队列有先进先出的特性。**先执行宏任务再执行宏任务的微任务**。


## 宏任务和微任务 
微任务（MircoTask）包括：
  - Promise中的 then、catch、finally
  - MutationObserver
  - Process.nextTick（Node环境，通常也被认为是微任务，是微任务中优先级最高的）
宏任务（MacroTask）(非微任务) 包括：
  - script 中的全部代码
  - 事件绑定
  - setTimeout [setTimeout 最小事件间隔 4ms](https://blog.csdn.net/weixin_48726650/article/details/107338797)
  - setInterval 
  - 网络请求：ajax请求
  
## runtime
  - 是 JavaScript 的执行环境。 
  - JavaScript 执行时会创建一个 main tread 主线程 和 call-stack 调用栈。
  - 所有任务都会被放到 call-stack 中等待被 main tread 执行。

## Event Loop 机制
  - main tread 从上至下执行；
  - 宏任务中的同步任务直接进入到主线程执行；
  - 异步任务进入 Event Table 中，当有结果后 将响应的回调函数注册放入 Event Queue
  - 主任务执行完了空闲下来后，会从 Event Queue 中读取宏任务，放到主线程中执行。
  - 主线程任务继续执行到结束。即一次事件循环结束。

## 同步、异步 和 宏任务、微任务
- 事件循环是一层一层执行的，一层即为一个循环。
- 首先整个代码块是一个宏任务。
- 宏任务中的同步代码进入主线程中立即执行的。
- 宏任务中的 Promise.then/catch/finally 是该宏任务层的微任务。
- 宏任务中的 **非微任务异步执行代码** 将作为下一层的宏任务等待执行。

## vue nextTick
vue 中数据更新后，立即获取dom未更新；需要在this.$nextTick中调用，就是依据的 EventLoop 原理。

nextTick延迟调用优先级顺序为： Promise.then() > MutationObserver > setImmediate > setTimeout

## 案例
```
console.log('1');

setTimeout(function() {
    console.log('2');
    new Promise(function(resolve) {
        console.log('3');
        resolve();
    }).then(function() {
        console.log('4')
    })
    setTimeout(function() {
	    console.log('5');
	    new Promise(function(resolve) {
	        console.log('6');
	        resolve();
	    }).then(function() {
	        console.log('7')
	    })
	})
	console.log('14');
})

new Promise(function(resolve) {
    console.log('8');
    resolve();
}).then(function() {
    console.log('9')
})

setTimeout(function() {
    console.log('10');
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
console.log('13')
```
输出结果为：1 8 13 9 2 3 14 10 11 4 12 5 6 7

| 层级 | 宏任务 | 微任务 |
| ---- | ---- | ---- |
| 第一层循环 | 1 8 13 | 9
| 第二层循环 | 2 3 14 | 4 |
|  | 10 11 | 12 |
| 第三层循环 | 5 6 | 7 |

## Node 环境下的 EventLoop
```
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
console.log('13')
```
输出结果为：1 7 13 6 8 2 4 9 11 3 10 5 12

[参考连接](https://blog.csdn.net/qq_31967985/article/details/110310685)