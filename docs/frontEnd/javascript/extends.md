---
id: extends
sidebar_position: 6
title: extends
---

[参考链接](https://juejin.cn/post/6914216540468576263)
## 原型链继承
```
function Parent() {
  this.isShow = true
  this.info = {
    name: "yhd",
    age: 18,
  };
}

Parent.prototype.getInfo = function() {
  console.log(this.info);
  console.log(this.isShow); // true
}

function Child() {};
Child.prototype = new Parent();

let Child1 = new Child();
Child1.info.gender = "男";
Child1.getInfo();  // {name: "yhd", age: 18, gender: "男"}

let child2 = new Child();
child2.getInfo();  // {name: "yhd", age: 18, gender: "男"}
child2.isShow = false

console.log(child2.isShow); // false
```
### 关键点
- 子类原型设置为父类实例
- 子类的实例 _prop__ 指向父类实例
- 可继承父类原型上的属性、构造函数属性
### 优点
- 可以通过 instanceof 判断类型
- 父类方法可以复用
### 缺点
- 父类的所有**引用属性**都会被子类共享
- 继承单一
- 子类型实例不能给父类型构造函数传参

## 借用构造函数继承
```
function Parent(name) {
  this.info = { name: name };
}

function Child() {
  Parent.call(this)
}

function Child(name) {
  //继承自Parent，并传参
  Parent.call(this, name);
  //实例属性
  this.age = 18
}

let child1 = new Child("yhd");
console.log(child1.info.name); // "yhd"
console.log(child1.age); // 18

let child2 = new Child("wxb");
console.log(child2.info.name); // "wxb"
console.log(child2.age); // 18
```
### 关键点
- 构造函数通过 call/apply 将父类构造函数引入并执行
### 优点
- 可以向父类传参
- 父类的引用属性不会被共享
- 可以继承多个父类的构造函数属性 call/apply 多个父类
### 缺陷
- 调用两次父类构造函数
- 只继承了父类的构造函数属性，无法继承父类原型上的属性/方法
- 不可以通过 instanceof 判断类型

## 组合继承
```
function Parent(name) {
  this.name = name
  this.colors = ["red", "blue", "yellow"]
}
Parent.prototype.sayName = function () {
  console.log(this.name);
}

function Child(name, age) {
  // 继承父类属性
  Parent.call(this, name)
  this.age = age;
}
// 继承父类方法
Child.prototype = new Parent();

Child.prototype.sayAge = function () {
  console.log(this.age);
}

let child1 = new Child("yhd", 19);
child1.colors.push("pink");
console.log(child1.colors); // ["red", "blue", "yellow", "pink"]
child1.sayAge(); // 19
child1.sayName(); // "yhd"

let child2 = new Child("wxb", 30);
console.log(child2.colors);  // ["red", "blue", "yellow"]
child2.sayAge(); // 30
child2.sayName(); // "wxb"
```
### 关键点
- 结合**原型链继承和构造函数继承**
- 使用原型链继承原型上的属性和方法，使用构造函数继承实例属性。
### 优点
- 可以实现复用
- 每个子类实例都有自己的属性
- 可以在子类构造函数中向父类构造函数中传参

## 原型式继承
```
function objectCopy(obj) {
  function Fun() { };
  Fun.prototype = obj;
  return new Fun()
}

let person = {
  name: "yhd",
  age: 18,
  friends: ["jack", "tom", "rose"],
  sayName:function() {
    console.log(this.name);
  }
}

let person1 = objectCopy(person);
person1.name = "wxb";
person1.friends.push("lily");
person1.sayName(); // wxb

let person2 = objectCopy(person);
person2.name = "gsr";
person2.friends.push("kobe");
person2.sayName(); // "gsr"

console.log(person.friends); // ["jack", "tom", "rose", "lily", "kobe"]
```
### 关键点
- 相当于浅拷贝父类对象
- **Object.create()** 只传一个参数时的原理就是原型式继承
### 优点
- 父类方法可以复用
### 缺点
- 父类的引用属性被子类共享
- 子类不能向父类传参

## 寄生式组合继承
```
function objectCopy(obj) {
  function Fun() { };
  Fun.prototype = obj;
  return new Fun();
}

function inheritPrototype(child, parent) {
  let prototype = objectCopy(parent.prototype); // 创建对象
  prototype.constructor = child; // 增强对象
  Child.prototype = prototype; // 赋值对象
}

function Parent(name) {
  this.name = name;
  this.friends = ["rose", "lily", "tom"]
}

Parent.prototype.sayName = function () {
  console.log(this.name);
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

inheritPrototype(Child, Parent);
Child.prototype.sayAge = function () {
  console.log(this.age);
}

let child1 = new Child("yhd", 23);
child1.sayAge(); // 23
child1.sayName(); // yhd
child1.friends.push("jack");
console.log(child1.friends); // ["rose", "lily", "tom", "jack"]

let child2 = new Child("yl", 22)
child2.sayAge(); // 22
child2.sayName(); // yl
console.log(child2.friends); // ["rose", "lily", "tom"]
```
### 关键点
- 寄生式组合继承可以算是引用类型继承的最佳模式
### 优点
- 只调用一次父类构造函数
- 子类可以向父类传参
- 父类方法可以复用
- 父类的引用属性不被共享

## class
(class extends)[https://www.jianshu.com/p/012835519c15]
```
class Person{
  constructor(skin,language){
    this.skin=skin;
    this.language=language;
  }
  say(){
    console.log('I am a Person')
  }
}

console.log(typeof Person); // function
let person = new Person('unkown','unknown');
console.log(person); // Person {skin: "unkown", language: "unknown"}
console.log( person.__proto__==Person.prototype); // ture
```
### 关键点
- class 本质还是一个 function 会有一个 prototype 属性
- [new 的过程](prototype#new-关键字)
  - 创建一个新对象
  - 修改 this 指向新对象
  - 执行构造函数的方法(constructor)
  - 返回这个新对象
- class 类 中必须有一个 constructor 方法，如果没有则默认会添加一个 **constructor() {}**

## class extents
```
class Chinese extends Person{
  constructor(skin,language,positon){
    //console.log(this);//报错
    super(skin,language);
    //super();
    //console.log(this);调用super后得到了this，不报错
    this.positon=positon;
  }
  aboutMe(){
    console.log(this.skin+' '+this.language+' '+this.positon);
  }
}

let chinese =new Chinese('yellow','chinese','changsha');
chinese.say();//I am a Person
chinese.chinesesay();//I am a Person   I am a Chinese
console.log(Chinese.__proto__===Person);//true 
console.log(Chinese.__proto__);//父类对象
console.log(Chinese.prototype.__proto__===Person.prototype);//true
```
### 关键点
- class 的继承必须使用关键字 extends
- 子类没有自己的 this 对象
- 子类 constructor 中调用 super 函数，相当于调用了父类的构造函数。**这一步为了得到 指向子类的 this** 不调用 super() 使用 this 会报错。
- 实例化子类对象拥有父类的属性和方法，子类对象还可以有自己的属性和方法 
- 子类的 proto 属性表示构造函数的继承，指向父类
- 子类的 prototype 的 proto 属性指向父类的 prototype 属性
