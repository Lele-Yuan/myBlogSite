---
id: promise
sidebar_position: 4
title: promise
---

[参考连接](https://www.cnblogs.com/everlose/p/12950564.html)
[promise和awaiy/async](https://juejin.cn/post/6844904180096712711)

## Promise 是为了解决什么问题
Promise 是一种异步编程的解决方案。Promise 为了解决大量异步方法的**回调地狱**问题。代码更便于书写

## Promise 的优缺点
- Promise 任务一经执行中途无法取消。
- 若不设置回调函数，则 Promise 内部的错误无法反映到外部。
- 处于 Pending 状态时，无法得知目前进展到哪一阶段。
- Promise 真正执行回调时候，定义 Promise 的部分已经执行完成，所以 Promise 报错堆栈上下文不太友好。

## 如何解决 Promise 的缺点

## Promise 如何使用
其中 executor 是一个有两个参数的方法，且立即执行。

```
executor = (resolved, rejected) => { reject() }
new Promise(executor)
```

## promise 常用的API
[参考链接](https://www.jianshu.com/p/d8a901dd72ac)

### Promise.resolve
1. 参数是一个 Promise 实例：Promise.resolve 将不做任何修改、原封不动地返回这个实例。
2. 参数是一个 thenable 对象(即有 then 方法的对象)：Promise.resolve 会将对象专程 Promise 对象，并立即执行 then 方法。
  ```
  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };

  let p1 = Promise.resolve(thenable);
  p1.then(function(value) {
    console.log(value);  // 42
  });
  ```
3. 参数不是具有then方法的对象，或根本就不是对象：Promise.resolve方法返回一个状态为 resolved 的 Promise 对象。
4. 不带任何参数：Promise.resolve 直接返回一个resolved状态的 Promise 对象。
5. resolve 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行 .then 的函数。
  ```
  setTimeout(function () {
    console.log('three');
  }, 0);

  Promise.resolve().then(function () {
    console.log('two');
  });

  console.log('one');

  // one
  // two
  // three
  ```

### Promise.reject
和 Promise.resolve 用法相同，只是 Promise 对象的状态为 rejected

### Promise.prototype.then
1. 实例方法，是 Promise 注册的回调函数，
2. then 方法可以被一个 Promise 多次调用。then 方法返回一个新的 promise 实例。
3. then 中新创建的 Promise 对象的状态变成 fulfilled 的节点是在上一个 Promise 的回调执行完毕时。
4. 当一个 Promise 的状态被 fulfilled 之后，会执行其 then 回调函数，而回调函数返回的结果会被当作 value，返回给下一个 Promise(也就是then 中产生的 Promise)，同时下一个 Promise的状态也会被改变(执行 resolve 或 reject)，然后再去执行其回调,以此类推下去...**链式调用**的效应就出来了。
两个参数的方法，且立即执行。
```
new Promise((resolved, rejected) => { reject() })
  .then(res => {
    return promise()    // 一个 Promise 方法
  })
  .then(res => return 'then')
  .then(res => console.log(res))
```

### Promise.prototype.catch
- 用于定义错误发生时的回调函数。
- 如果 Promise 对象状态变为 rejected 则会调用 catch 的回调。
- 如果 Promise 对象状态变为 fulfilled 回调用 then 回调函数，如果 then 的回调运行时出现错误，也会调用 catch 的回调。

### Promise.all
- Promise.all 方法用于将多个 Promise 实例包装成一个 Promise 实例。
- Promise.all 接收一个数组作为参数，参数都必须为 Promise 实例，如果不是，就先调用 Promise.resolve() 转成 Promise 实例。
- **const p = Promise.all([p1, p2, p3]);** p 的状态由 p1, p2, p3 共同决定
  - 都为 fulfilled 则 p 的状态才为 fulfilled , 此时 p1, p2, p3 的返回值组成一个数组，传递给 p.then 的回调函数。
  - 只要有一个状态变为 rejected 则 p 的状态为 rejected ，第一个被 rejected 的返回值传递给 p.catch 的回调函数。
  - 如果 p1, p2, p3 中本身有 .catch ，那么该实例执行完 .catch 方法后，也会变成resolved
- 适用于：**多个 Promise 彼此相互依赖，其中任何一个被 reject ，其它都失去了实际价值。**

### Promise.race
- Promise.race 方法用于多个 Promise 对象同时执行。返回最先执行结束的 Promise 任务的结果，无论结果是成功或失败。
- 所有 Promise 方法都执行，Promise.race 只获取到最先执行完的结果，成功则触发 then 失败则触发 catch

### Promise.allSettled ES2020
[参考链接](https://juejin.cn/post/6964494813584424974)
- 可以获取每一个 Promise 对象的结果，无论成功还是失败。
- 优化了 Promise.all 只要有一个 Promise 失败，就触发 catch 的问题
- 适用于：**多个 Promise 彼此不依赖，其中任何一个被 reject ，对其它都没有影响；且期望知道每一个 Promise 的执行结果。**
```
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = new Promise((resolve, reject) => {
  setTimeout(reject, 1000, 'three');
});

Promise.allSettled([p1, p2, p3])
.then(values => {
    console.log(values)
})	

/*
[
  {status: "fulfilled", value: 1}, 
  {status: "fulfilled", value: 2}, 
  {status: "rejected", reason: "three"}
]
*/
```
**当浏览器不支持 allSettled 时，可以如此 polyfill**
```
if (!Promise.allSettled) {
  const rejectHandler = reason => ({status: "rejected", reason})
  const resolveHandler = value => ({status: "fulfilled", value})
  Promise.allSettled = promises =>
    Promise.all(
      promises.map((promise) =>
        Promise.resolve(promise) 
          .then(resolveHandler, rejectHandler)
      )
      // 每个 promise 需要用 Promise.resolve 包裹下
      // 以防传递非 promise
    );
}

// 使用
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = new Promise((resolve, reject) => {
  setTimeout(reject, 1000, 'three');
})
const promises = [p1, p2, p3]
Promise.allSettled(promises).then(console.log)
```

## Promise 在事件循环中的执行过程

## 如何取消 promise
promise 其实缺陷就是无法得知执行到了哪儿，也无法取消，只能被动的等 resolve 或者 reject 执行或者抛错。
所以思路为：promise 外层包裹一层，并创建一个外部可以访问的方法 abort ，这个方法的作用是用来触发 primise.reject()
```
function wrap(p) {
  let resol = null;
  let abort = null;

  let p1 = new Promise((resolve, reject) => {
    resol = resolve;
    abort = reject;
  });

  p1.abort = abort;
  p.then(resol, abort);

  return p1;
}
let newPromise = wrap(new Promise((resolve, reject) => {
  console.log('promise1');
  resolve();
}));

newPromise.then(res => console.log)
newPromise.abort()
```

## 如何保证 Promise 顺序执行
- async / await 方式
- return promise 链式 .then
```
function order(promises) {
  let dataArr = []
  let promise = Promise.resolve();
  for (let i = 0; i < promises.length; i++) {
    promise = promise.then((data) => {
      if (data) {
        dataArr.push(data);
        console.log(data);
      }
      return promises[i];
    });
  }
  return promise.then(data => {
    console.log(data);
  })
}

var makePromise = function(value, time) {
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(value);
    }, time)
  })
};

order([
  makePromise('a', 3000),
  makePromise('b', 5000),
  makePromise('c', 2000),
]);
```

## 如何限制 promise 数量
```
function limitload(urls, limit) {
  let index = limit;
  function execNewPromise() {
    index += 1;
    if (index < urls.length) {
      return loadImg(urls[index]).then(() => execNewPromise());
    }
  }
  var promise = Promise.resolve();
  promise.then(() => {
    for (let i = 0; i < limit; i++) {
      loadImg(urls[i]).then(() => execNewPromise());  
    }
  });
}

var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/getImgData/gray.gif',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png',
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('一张图片加载完成', url);
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}

limitload(urls, 2);
```

## 手写 promise
- Promise 的调用方式，new Promise(executor) executor 两个参数，resolve，reject
- Promise 内部有三个状态，pending、fulfilled、rejected，
- 初始是 pending，调用 resolve 后变为 fulfilled ,调用 reject 后变为 rejected。fulfilled 时会调用 then 注册的成功的回调，rejected 时会调用 then 注册的失败的回调。
- [参考连接](https://www.jianshu.com/p/818bfe22eefd)
```
class Promise {
    constructor(executor) {
       const resolve = () => {}
       const reject = () => {}
       executor(resolve, rejcet)
    }
}


// Promise 内部状态
const STATUS = { PENDING: 'PENDING', FUFILLED: 'FUFILLED', REJECTED: 'REJECTED' }

class Promise {
  constructor(executor) {
    this.status = STATUS.PENDING;
    this.value = undefined; // 成过的值
    this.reason = undefined; // 失败的值
    const resolve = (val) => {
      if (this.status == STATUS.PENDING) {
        this.status = STATUS.FUFILLED;
        this.value = val;
      }
    }
    const reject = (reason) => {
      if (this.status == STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.reason = reason;
      }
    }
    try {
      executor(resolve, reject);
    } catch (e) {
      // 出错走失败逻辑
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status == STATUS.FUFILLED) {
      try {
        onFulfilled(this.value);
      } catch (error) {
        onRejected(error);
      }
    }
    if (this.status == STATUS.REJECTED) {
      onRejected(this.reason);
    }
  }
  catch(onRejected) {
    if (this.status == STATUS.REJECTED) {
      onRejected(this.reason);
    }
  }
}

new newPromise((resolve, reject) => {
    console.log('newPromise')
    throw Error('error!!!')
    resolve('resolve')
}).then((data) => {
    console.log('then', data)
}, (err) => {
    console.log('catch', err)
})
```

## 面试题
### 第一题 eventloop
```
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)
```

输出顺序为： 1 2 4 3
- new Promise 里的参数函数，是同步被执行的，所以优先输出13
- then 把参数函数推入微任务队列，并不直接执行。
- 输出 4 主线程执行完毕，微任务队列进入到事件循环并开始执行，输出 3.

### 第二题 穿透现象
```
var promise = new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  }, 3000)
})

promise.then(() => {
  return Promise.resolve(2);
}).then((n) => {
  console.log(n)
});

promise.then(() => {
  return 2
}).then((n) => {
  console.log(n)
});

promise.then(2).then((n) => {
  console.log(n)
});
```
输出结果：2 2 1
- Promise.resolve() 就是一个 Promise 对象就相当于返回了一个新的 Promise 对象。
- return 的值将作为 then 方法回调函数的参数。
- then 和 catch 期望接收函数做参数，如果非函数就会发生 Promise 穿透现象，打印的是上一个 Promise 的返回。

### 第三题 await promise
```
let a;
const b = new Promise((resolve, reject) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
}).then(() => {
  console.log('promise3');
}).then(() => {
  console.log('promise4');
});

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log('after1');
  await a
  resolve(true);
  console.log('after2');
});

console.log('end');
```
输出结果
promise1
undefined
end
promise2
promise3
promise4
Promise { pending }
after1
- 第一个输出 promise1，是因为 Promise 里的方法立即执行。接着调用 resolve，将 then 里的方法放到下一个周期执行
- 第二个输出 undefined，是因为立即执行执行 a 内部的方法，但此时的 a 还没赋值给左边的变量
- 第三个输出 end，是主任务
- 输出 promise2，promise3，promise4，因为 await b 需要等待 b 的微任务队列都执行完毕。
- 输出 Promise { pending } 进入事件循环，a 被赋值成了 Promise 对象
- 输出 alert1 **结束**
- await a 时，a 是必须等待 Promise 的状态从 pending 到 fullfilled 才会继续往下执行。可 a 的状态是一直得不到更改。
- 将 resolve(true) 和 await a 互换位置会继续输出 after2

### 第四题 状态仅变更一次
```
const promise = new Promise((resolve, reject) => {
  resolve('success1');
  reject('error');
  resolve('success2');
});

promise
  .then((res) => {
    console.log('then: ', res);
  })
  .catch((err) => {
    console.log('catch: ', err);
  });
```
输出结果：then: success1
- Promise 对象的状态只能被转移一次。resolve('success1') 时状态转移到了 fullfilled 。后面 reject 就调用无效了，因为状态已经不是 pending。

### 第五题 return Error
```
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```
输出结果：then:  Error: error!!!
- return new Error('error!!!') 并没有抛出错误和异常，只是 return 了一个对象。
- throw Error('error!!!') 才会执行 .catch

### 第六题 return Promise.resolve()
[参考链接](https://juejin.cn/post/6945319439772434469)
```
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
```
输出结果：0 1 2 3 4 5 6
- 第一层的微任务执行后输出 0 1
- Promise.resolve() 的 .then 交替将执行函数推到 微任务中。
- 但 return 出来的 Promise.resolve(4) 会创建**两个** then 微任务。

### 第七题 使用 Promise 封装定时器
要求：使用 Promise 封装一个方法 reduce 。实现 reduce(()=>{console.log(1)}, 5, 1000) 后每隔 1000ms 输出1，共输出5次
```
function reduce(fn, count, time){
  let p = Promise.resolve()
  let currentCount = 0
  while(currentCount < count){
    currentCount ++ 
    p = p.then(() => {
      return new Promise(r => {
        setTimeout(() => r(fn()), time)
      })
    })
  }
}
reduce(()=>{console.log(1)}, 5, 1000)
```