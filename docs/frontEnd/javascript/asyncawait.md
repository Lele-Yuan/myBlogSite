---
id: asyncawait
sidebar_position: 5
title: async await
---

async 是 Generator 函数的语法糖。[参考链接](https://juejin.cn/post/6844903988584775693)

## Generator 函数
Generator 是ES6引入的新语法，Generator是一个可以暂停和继续执行的函数。

Generator 函数封装一些内部状态，执行 Generator 函数会返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

Generator 函数被调用时不会被执行，只有调用 `next` 方法才会遍历到下一个内部状态，函数内部的 `yield` 表达式就是暂停标志，即**函数可以暂停，也可以恢复执行**。

Generator 函数需要使用 * 来定义。

每次调用 next 方法会返回一个对象包含 value done 两个属性。 value 表示当前的内部状态的值，也就是 yield 表达式后面那个表达式的值；done 表示是否遍历结束。

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()// { value: 'hello', done: false }
hw.next()// { value: 'world', done: false }
hw.next()// { value: 'ending', done: true }
hw.next()// { value: undefined, done: true }
```

## Generator 函数暂停执行原理
一个线程或函数执行到一半，可以暂停执行，将执行权交给另一个线程或函数，等收回执行权的时，在恢复执行。这种并行执行，交换执行权的线程或函数，叫做**协程**。

在 Generator 函数遇到 yeild 就暂停执行，等执行权返回在继续从暂停的地方往后执行。

优点：可以像写写同步一样操作。

## Generator 执行器
Generator 的代码需要一步一步的向下执行，通常需要一个执行器，封装执行 Generator 的代码，并自动执行和自动转交执行权。

**co 模块**就是一个著名的执行器。

## async/await
async 是Generator函数的语法糖，并对Generator函数进行了改进。async 函数就是将 Generator 函数的星号（*）替换成 async ，将 yield 替换成 await 。

async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。

await 后面的语句相当于放在了 new Promise 中，下一行及之后的代码相当于放到了 Promise.then 中。

Async/Await 用 try/catch 来捕获异常。或者在 await 后面跟着 .catch

```
const foo = async () => {
  let response1 = await fetch('https://xxx') 
  console.log('response1')
  console.log(response1)
  let response2 = await fetch('https://xxx') 
  console.log('response2')
  console.log(response2)
}

```

async 函数对 Generator 函数的改进：
- 内置执行器 - Generator 函数必须依赖外部执行器， async 函数自带执行器，无需手动调用 next 方法。
- 语义化更好 - async/await 比起 */yeild 语义更清晰。 async 标识函数里有异步操作， await 紧跟在后边的表达式需要等待结果。
- 实用性更广 - co模块约定，yeild 后边只能是 Promise 或者 Thunk 函数； async/await 后边可以是 Promise 对象或原始类型，原始类型会立即转成 Promise.resolve() 。
- 返回Promise - Generator 返回一个 Iterator 对象； async 返回一个 Promise 对象，可以使用 .then 进行调用，使用更方便。

## async/await 和 Promise
async 隐式的返回一个 Promise 对象作为结果， await 后面的函数执行完时， await 指令会产生一个微任务，并跳出 async 函数，执行后面的同步任务。等外层代码执行完毕后，执行权交给 async 继续执行剩余代码，此时在将 await 产生的微任务注册到微任务队列等待执行。
```
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
.then(function() {
  console.log('promise1')
})
.then(function() {
  console.log('promise2')
})

console.log('script end')
// script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout
```
- 同步任务 - 输出 `script start` 。
- 执行 async1 方法 -，先执行 async2  输出 `await async2` ，
- async2 返回一个原始数据类型，await 直接将后面的代码住的为微任务，跳出 async1 继续执行外层代码。
- setTimeout - 将 setTimeout 放到宏任务队列。
- 执行 Promise - 输出 `Promise` ，遇到 then 产生一个微任务，加入到微任务队列 await 微任务后面。
- 同步任务 - 输出 `script end`
- 当前宏任务执行完毕，开始执行此次宏任务产生的微任务队列。
- 首先执行 await 后面的代码 - 输出 `async1 end` 。
- 然后执行 Promise.then 产生的微任务，输出 `promise1` ，又遇到 then 又产生一个微任务。
- 继续执行微任务队列，输出 `promise2` 。微任务队列执行完毕。
- 本次事件循环结束，开始执行下一个循环，执行下一个循环的宏任务，输出 `setTimeout`

上面的情况是 await 后边接一个或原始类型，会直接将 await 后面的代码注册为微任务。如果 await 跟一个 Promise 类型对象，则不会立即注册为微任务，而是当执行权交给 async1 后才注册为微任务。
```
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
  return Promise.resolve().then(()=>{
    console.log('async2 end1')
  })
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
resolve()
})
.then(function() {
  console.log('promise1')
})
.then(function() {
  console.log('promise2')
})

console.log('script end')
// script start => async2 end => Promise => script end =>async2 end1 => async1 end => promise1 => promise2 => setTimeout
```
- 同步任务 - 输出 `script start` 。
- 执行 async1 方法 -，先执行 async2  输出 `async2 end` ，遇到 then 生成一个微任务。
- await 将后面的代码产生一个微任务，跳出 async1 继续执行外层代码。
- setTimeout - 将 setTimeout 放到宏任务队列。
- 执行 Promise - 输出 `Promise` ，遇到 then 产生一个微任务，加入到微任务队列 await 微任务后面。
- 同步任务 - 输出 `script end`
- 外层代码执行完毕，执行权转移到 async 继续执行后面的代码。
- await 将后面的代码注册为微任务，此时微任务队列已经有 promise 的微任务了，所以 await 的微任务放在之后执行。
- 当前宏任务执行完毕，开始执行此次宏任务产生的微任务队列。
- 首先执行 async2 的微任务，输出 `async2 end1 `。
- 执行 async1 产生的微任务，输出 `async1 end`
- 执行 Promise.then 产生的微任务，输出 `promise1` ，又遇到 then 又产生一个微任务。
- 继续执行微任务队列，输出 `promise2` 。 。微任务队列执行完毕。
- 本次事件循环结束，开始执行下一个循环，执行下一个循环的宏任务，输出 `setTimeout`
