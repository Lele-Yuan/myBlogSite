---
id: eventLoop
sidebar_position: 6
title: eventLoop
---

**EventLoop** 叫做**事件循环**，在程序中有异步的情况时需要考虑，是为了解决 JavaScript 单线程在运行时不会阻塞的一种机制，也叫做异步原理。

JavaScript 任务 task 被分成**宏任务 MacroTask 和微任务 MircoTask **。分别由 Task Queue和 MircoTak Queue 管理。

队列有先进先出的特性。**先执行宏任务再执行宏任务的微任务**。

## Task 
微任务（MircoTask）包括：
  - Promise中的 then、catch、finally
  - MutationObserver
  - Process.nextTick（Node环境，通常也被认为是微任务，是微任务中优先级最高的）
宏任务（MacroTask）(非微任务) 包括：
  - script 中的全部代码
  - DOM操作
  - setTimeout、setInterval 
  - 网络请求
  
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