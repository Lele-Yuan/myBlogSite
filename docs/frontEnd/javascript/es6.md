---
id: es6
sidebar_position: 3
title: es6
---

## let const
### let 和 var 的区别
- let 和 const 是块级声明，在指定块的作用域之外无法访问。
- var 会声明变量提升；let 不会被声明提升，在声明前使用会报错(形成临时死区 TDZ)。
- var 可以重复声明；重复声明会报错。
- 使用 var 声明的变量会创建一个新的全局变量作为全局对象的属性；let 声明的变量不会绑定到全局 window 上。
```
var value = 1;
console.log(window.value); // 1
```
### let 和 const 的区别
- let 用于声明变量
- const 用于声明常量，值一旦被设定，不得修改。const 不允许修改指向，但是可以修改值。
```
const data = {
    value: 1
}

// 没有问题
data.value = 2;
data.num = 3;

// 报错
data = {}; // Uncaught TypeError: Assignment to constant variable.
```
### let 在 for 使用
- 每次循环都是一个独立的块级作用域；
- 小括号相当于一个隐藏的块级作用域；
```
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 3
```
**使用闭包来解决**
```
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = (function(i){
        return function() {
            console.log(i);
        }
    }(i))
}
funcs[0](); // 0
```
**使用 let 解决**
```
var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0
```
### Babel 中如何编译 let 和 const
- 代码块内外层的变量名相同时，Babel会将块内的变量改一个名称。
- for 循环中的 let/const 会将循环代码块抽离成一个方法。
```
var funcs = [];
for (let i = 0; i < 10; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0
```
**Babel转化后**
```
var funcs = [];

var _loop = function _loop(i) {
    funcs[i] = function () {
        console.log(i);
    };
};

for (var i = 0; i < 10; i++) {
    _loop(i);
}
funcs[0](); // 0
```

## 箭头函数 => 
箭头函数相当于匿名函数，简化了函数定义。
### 基本语法
```
// 传入一个参数(可以省略())，返回一个值(可以省略{}和return)
// 没有 `{}` 和 `return` 且只有一个表达式，表示返回该表达式
let func = x => x * x;
// 传入多个参数，返回一个对象(对象需要用()包起来)
let func = (value, num) => ({total: value * num});
// 传入多个参数，代码块中有多条语句(不可以省略{}和return)
let func = (x, y) => {
  var d = x * x + y * y; 
  console.log(d);
  return d;
}
```
### 和普通匿名函数的区别
- 箭头函数的 this 和调用上下文无关，取决于语法作用域(定义时的上下文) 。通过查找定义时的作用域链查找，指向最近一层非箭头函数的 this 。
- 没有 arguments 箭头函数内可以访问外围函数 arguments ；箭头函数参数需要通过命名参数或rest参数形式访问。
- 一经创建不可修改，所以不可以作为构造函数使用 new 创建实例。
- 用 `call/apply` 调用箭头函数时，无法对this进行绑定，会忽略第一个参数。
- 没有 prototype 对象
  ```
  // this 取决于语法作用域，且不会改变
  var value = 1;
  var result = (() => this.value).bind({value: 2})();
  console.log(result); // 1

  // arguments 是外层函数的参数
  function constant() {
    return () => arguments[0]
  }
  console.log(constant(1)()); // 1
  ```

## iterator 与 for of
- 迭代器 iterator 就是一个具有 next 方法的对象，每次调用 next() 都返回一个结果对象({done: false, value: 'value'})。
- for of 是一个可以遍历部署了 Iterator 借口的迭代器的方式。具有 Symbol.iterator 属性的对象就是可遍历的(iterable)。for of 实际上是遍历的是对象的 Symbol.iterator 属性
### 创建构造器 createIterator
```
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= item.length;
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        }
    };
}

// iterator 就是一个迭代器对象
var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```

### 模拟 for of
```
function forOf(obj, cb) {
  let iterable, result;

  if (typeof obj[Symbol.iterator] !== "function")
    throw new TypeError(result + " is not iterable");
  if (typeof cb !== "function") throw new TypeError("cb must be callable");

  iterable = obj[Symbol.iterator]();

  result = iterable.next();
  while (!result.done) {
    cb(result.value);
    result = iterable.next();
  }
}

```

### 默认 iterable 对象
- 数组
- Set
- Map
- 类数组对象：如 arguments 对象、 DOM NodeList对象
- Generator 对象
- 字符串

## Set 和 Map
[Set WeakSet](/docs/frontEnd/javascript/datatype#集合-set-weakset)

[Map WeakMap](/docs/frontEnd/javascript/datatype#字典-map-weakmap)

## 解构赋值 Destructuring
### 数组解构
- 按照对应位置，对变量赋值。属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
- 如果解构失败则变量值为 undefined
- 允许指定默认值

```
let [a, b, c] = [1, 2, 3];
// 等价于
let a = 1;
let b = 2;
let c = 3;

let [head, ...tail] = [1, 2, 3, 4];
// x = "a"   y = undefined   z = []

```

### 对象解构
- 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
- 如果解构失败，变量的值等于undefined。
- 如果变量作为变量的key，则为模式，不是变量，不会被赋值。
```
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
// x = "Hello"
// y = "World"
// p 不会被赋值
```

### 解构赋值注意点
```
let x;
// 错误的写法
{x} = {x: 1};   // SyntaxError: syntax error
// 正确写法
({x} = {x: 1});
```

## 扩展运算符 rest运算符 (...) 
扩展运算符和rest运算符是逆运算。扩展运算符：数组=>分割序列；rest运算符：分割序列=>数组

### 扩展运算符
- 对象的扩展运算符用于取出参数对象中所有可遍历的属性。拷贝到当前对象之中(浅拷贝)
  ```
  let bar = { a: 1, b: 2 };
  let baz = { ...bar }; // { a: 1, b: 2 }
  // 相当于 Object.assign({}, bar);
  ```
- 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
- 可以用于一些需要传入数组序列的方法
  ```
  // arguments对象
  function foo() {
    const args = [...arguments];
  }// [...arguments] 相当于 [].slice.call(arguments)

  var array = [1,2,3,4,3];
  var max1 = Math.max(...array);
  // Math.max(...array) 相当于 Math.max.apply(null,array)
  ```

### rest运算符 
- 用于获取函数的多余参数，`...arguments`代替 `arguments`
- rest 和 arguments 的区别
  - rest 只包含了没有对应形参的实参，arguments包含了传给函数的所有实参
  - rest 是 Array 的实例，arguments 不是一个真是的数组
  - rest 参数没有附加属性，arguments 对象包含如 callee 等属性

## promise
[promise](/docs/frontEnd/javascript/promise)

## async/await
[async/await](/docs/frontEnd/javascript/asyncawait)

## Proxy
Proxy意思是代理，访问对象之前建立的一层拦截。任何对对象的操作都需要经过这层拦截，即执行Proxy里面定义的方法。
### 使用方法
```
let proxy = new Proxy(target, handler);
// handler 参数是一个对象，用来定制拦截行为
```
### Proxy 拦截行为
- **get(target, propKey, receiver)**：拦截对象属性的读取；
- **set(target, propKey, value, receiver)**：拦截对象属性的设置；
- **has(target, propKey)**：拦截propKey in proxy的操作，返回一个 Boolean 值；
- **deleteProperty(target, propKey)**：拦截delete proxy[propKey]的操作，返回一个布尔值；
- **ownKeys(target)**：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的**可遍历**属性；
- **getOwnPropertyDescriptor(target, propKey)**：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象；
- **defineProperty(target, propKey, propDesc)**：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值；
- **preventExtensions(target)**：拦截Object.preventExtensions(proxy)，返回一个布尔值；
- **getPrototypeOf(target)**：拦截Object.getPrototypeOf(proxy)，返回一个对象；
- **isExtensible(target)**：拦截Object.isExtensible(proxy)，返回一个布尔值；
- **setPrototypeOf(target, proto)**：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值；
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)；
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)；
### 如何监听 Map
许多内置对象，例如 Set Map Data Promise 等都使用了内置方法，不是通过 `[[get]]` `[[set]]` 这两个内部方法访问
```
let map = new Map([['test', 1]]);

let proxy = new Proxy(map, {});

proxy.get('test', 1); // Error
```
Map 将所有数据存储到 `[[MapData]]` 中，可以通过 Map.prototype.get 来访问内部属性 this.MapData 但是由于调用get时的this 是 proxy 找不到 mapData 所以Error。一种解决方案，通过 proxy 的 get 钩子将函数属性(map.set / map.get)绑定到目标对象本身(receiver 也即是 map)。
```
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
console.log(proxy.get('test')); // 1 (works!)
```
### 如何取消 Proxy
Proxy.revocable(object, handler) 返回对象中会包含一个取消的方法 revoke 用来取消对 object 的代理。
- revoke 可以存储在 WeakMap 中， key 为 proxy 对象， value 为 revoke
- [参考链接](https://juejin.cn/post/6844904090116292616)
```
let revokes = new WeakMap();

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..later in our code..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Error（已吊销）
```

## Reflect
Reflect 对象不是个构造函数，创建的时候不是用 new 创建。
### 为什么需要 Refect
Reflect 对象让能够实现反射机制的方法都归结于一个地方并做了简化。

```
var s = Symbol('foo');
var k = 'bar';
var o = { [s]: 1, [k]: 1 };

// ES 5
Object.prototype.hasOwnProperty.call(myObject, 'foo')
// getOwnPropertyNames获取到String类型的key，getOwnPropertySymbols获取到Symbol类型的key
var keys = Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o));

// ES6
Reflect.ownKeys(myObject)
```

### Reflect 的静态方法
Reflect对象一共有 13 个静态方法（匹配Proxy的13种拦截行为）。方法名和 Proxy 对象的方法是一一对应的。
[参考链接](https://zhuanlan.zhihu.com/p/92700557)
- **Reflect.apply(target, thisArg[, argumentsList])**：通过指定的参数列表对该目标函数的调用。args 
- **Reflect.construct(target, args[, constructorToCreateThis])**：等价于 new target(...args)
- **Reflect.get(target, name[, receiver])**：该方法是用来读取一个对象的属性。 receiver 的作用是指定 this
- **Reflect.set(target, name, value[, receiver])**：设置该对象的属性值了。该函数返回一个Boolean，表示目标对象上设置属性是否成功。
- **Reflect.defineProperty(target, name, desc)**：类似 Object.defineProperty() ，需要通过try/catch捕获异常。Reflect.defineProperty() 返回值为 Boolean 类型，表示执行是否正确。
- **Reflect.deleteProperty(target, name)**：相当于 delete target[name]
- **Reflect.has(target, name)**：类似于 in 操作富符，Reflect.has 返回Boolean 表示属性是否在对象或者原型链上。
- **Reflect.ownKeys(target)**：返回target所包含的所有属性的数组。(包含 symbol 类型属性，不包含原型链)
- **Reflect.isExtensible(target)**：方法判断一个对象是否是可扩展的(是否可以在它上面添加新的属性)。
- **Reflect.preventExtensions(target)**
- **Reflect.getOwnPropertyDescriptor(target, name)**
- **Reflect.getPrototypeOf(target)**
- **Reflect.setPrototypeOf(target, prototype)**

## 模块化
### require/exports
require/exports 是 CommonJS 模块化方案下的引入导出方式，是为服务器端开发设计的，同步读取模块文件内容，编译执行后的到模块接口。

浏览器端是异步加载脚本文件，CommonJS无法工作，所以浏览器端出现了 RequireJs SeaJs 等方案。

require/exports 是运行时动态加载，输出的是一个值的拷贝。

必须在 require 之后在使用导入的变量。

**用法：**
- exports 是对 module.exports 的引用，在不改变 exports 的引用的情况下，exports 和 module.exports 无区别，如果将 export 指向其他对象，export会改变，但不影响 module.exports 的输出。
- require 返回的是 module.exports 输出的所有值的对象。

### import/export
import/export 是 ES6 实现模块化方案，浏览器无法直接使用，我们需要在引入模块的 `<script>` 元素上添加type="module 属性。

import/export 是静态编译，输出的是对值的引用。

可以在 import 语句之前使用模块。

只能在文件的顶部使用 import 不能在函数内部、判断语句内部引入。

浏览器引入模块的 script 标签需要添加 `type="module` 属性，但不支持 FTP 文件协议(file://) 只支持 HTTP 协议，所以本地开发需要使用 http-server 等服务器打开文件

import() 表达式表示动态加载模块并返回一个 promise 这个promise的 resolve 包含所有导出的模块对象。

**用法：**
1. export default fs 对应 import fs from ’fs‘
  - 一个文件只能导出一个 default 模块
  - 引入 export default 导出的模块不用加 {}
  - import {default as fs} from 'fs' 可以给 default 取别名 fs
2. export { readFile } 对应 import { readFile } from 'fs'
  - 可以使用 * 导出/导入所有模块，虽然方便，但是不利于构建工具检测未使用过的函数(tree-shaking)

## babel 
Babel 是一个 JavaScript 编译器，能将 ES6 转化成 ES5 代码。

Babel 执行编译的过程中，会从项目根目录下的 `.babelrc` 文件读取配置(JSON格式文件)。

配置项： 
### plugins 
plugins 字段告诉 Babel 要使用那些插件来控制代码转换。插件的名称为配置内容增加前缀 `babel-plugin-` 。例如 `transform-runtime` 的插件全称为 `babel-plugin-transform-runtime`， 这个插件是用来减少冗余代码
```
"plugins": [
  [
    "transform-runtime",
    {
      "polyfill": false
    }
  ]
  ],
```

### Presets
Presets 属性用来告诉 Babel 要转换的源代码使用来那些新的语法特性。

Presets 是个数组，其中一个 Presets 对一组新语法特性提供支持。
```
"presets": [
  [
    "es2015",
    {
      "modules": false
    }
  ],
  "stage-2",
  "react"
]
```

### 接入 Babel
在 Webpack 中通过 Loader 接入 Babel
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ]
  },
  // 输出 source-map 方便直接调试 ES6 源码
  devtool: 'source-map'
};
```