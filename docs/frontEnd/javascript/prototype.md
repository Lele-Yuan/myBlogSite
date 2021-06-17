---
id: prototype
sidebar_position: 1
title: 构造函数 new 实例 原型 原型链
---

## 构造函数 constructor
- 通过 new 关键字调用的函数成为**构造函数**

## 创建实例对象
### new 关键字
- 执行顺序
  1. 创建一个对象 **var obj = {}**
  2. 将对象的 __proto__ 指向构造函数的 prototype **obj.__proto__=Dog.prototype**
  3. 将函数体内的this指向该对象，并将参数传递过去 call 或 apply
  4. 执行构造函数体内的代码
  5. 返回这个对象 
- 手写一个 new 方法
  ```
  function Dog(name){
      this.name = name
  }
  Dog.prototype.sayName = function(){
      console.log(this.name)
  }
  // 上面是本身Dog
  function _new(fn,...args){   // ...args为ES6展开符,也可以使用arguments
    //先用Object创建一个空的对象,
    const obj = Object.create(fn.prototype)  //fn.prototype代表 用当前对象的原型去创建
    //现在obj就代表Dog了,但是参数和this指向没有修改
    const rel = fn.apply(obj,args)
    //正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回rel
    return rel instanceof Object ? rel : obj
  }
  var _newDog = _new(Dog,'这是用_new出来的小狗')
  _newDog.sayName()
  ```

### Object.create()


## 原型 prototype  __proto__
- 每个 JavaScript **函数**都有一个prototype。默认函数的原型包含两个属性 constructor 和 __proto__
- 每个 JavaScript **对象**中都包含一个 __proto__ (非标准)的属性指向父级的 prototype (该对象的原型)
- 构造函数的 prototype 就是通过该函数创建的实例对象的原型 __proto__

```
var fun = function(){}
var newFun = new fun()

console.log(newFun.__proto__ === fun.prototype)

console.log( fun.prototype )

// true

// constructor: ƒ ()
// __proto__: Object

```