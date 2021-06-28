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

## Destructuring 解构赋值 
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

