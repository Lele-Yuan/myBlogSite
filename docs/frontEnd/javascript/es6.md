---
id: es6
sidebar_position: 3
title: es6
---

## 箭头函数 Arrow Function
- 箭头函数相当于匿名函数，并简化了函数定义
- `x => x * x`  `(x, y) => {var d = x * x + y * y; return d}`
- 参数只有一个可以省略`()`
- 函数体有多条语句时需保留 `{}` 和 `return` 
- 没有 `{}` 和 `return` 且只有一个表达式，表示返回该表达式
- this 指向语法作用域，一经创建不可修改，所以不可以作为构造函数创建实例
- 用 `call/apply` 调用箭头函数时，无法对this进行绑定，会忽略第一个参数


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

