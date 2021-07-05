---
id: datatype
sidebar_position: 1
title: 数据类型
---

## 数据类型
### 基本数据类型 
Number  NaN  String  Boolean  Null  Undefined  Symbol(es6)  BigInt

- `BigInt` 比 Number 类型支持的范围更大，在进行数据运算时，BigInt 不会有整数溢出的问题。创建 BigInt 需要在整数的末尾增加 n 

  ```
  console.log(9007199254740995n);    // → 9007199254740995n
  console.log(9007199254740995);     // → 9007199254740996
  ```

- `Symbol` 是一种唯一标识，可以用作对象的唯一属性名。不是方法不可以使用 `new`
  symbol 类型的值作为对象的 key 是隐藏的，for...in object.keys() 不能访问。
  `Object.getOwnPropertySymbols(obj)` 可以访问到 symbol 类型的值作为对象的 key 的数组。
  `Symbol.for()` 是全局注册并登记的方法，`Symbol.keyFor()` 获取到 symbol 对象的参数值(字符串类型)

  ```
  let id1 = Symbol('id');
  let id2 = Symbol('id');
  console.log(id1 == id2);  //false

  let name1 = Symbol.for('name'); //检测到未创建后新建
  let name2 = Symbol.for('name'); //检测到已创建后返回
  console.log(name1 === name2); // true
  console.log(Symbol.keyFor(name1));  // 'name'
  ```

### 引用数据类型 
Object( Array  Set(es6)  Map(es6) )  Function( RegExp )

## 集合 Set WeakSet
### Set
Set 和 Array 类似， 但是成员是不可重复、无序的。 Set 是构造函数，可以用 new

**常用的api**
- size-属性：返回集合中元素的个数；类似 Array.lenght
- add(value)-方法：添加一个元素；若已存在，则不报错也不改变。
- delete(value)-方法：删除元素。
- has(value)-方法：判断 value 是否存在集合中，返回 Boolean 。
- clear()-方法：清空集合。

**Set 和 Array 之间转换**
- Array -> Set  
  new Set(array)
  ```
  let array = [1, 2, 3, 4];
  let set = new Set(array);
  ```
- Set -> Array  
  Array.from(set)
  ```
  let demo = new Set([1,2,3,4]);
  Array.from(demo)
  ```

**遍历方式**
- for of 循环 Set (默认使用values()返回的迭代器)
- keys()：返回一个包含集合中所有**键名**的迭代器
- values()：返回一个包含集合中所有**键值**得迭代器(Set的keys()和values()返回相同的迭代器)
- entries()：返回一个包含Set对象中所有元素得**键值对**迭代器

  ```
    let set = new Set(['a','b']);
    for (const item of set) {
      console.log(item);//'a'  'b'
    }

    for (const item of set.keys()) {
      console.log(item); // 'a' 'b'
    }
    for (const item of set.values()) {
      console.log(item); // 'a' 'b'
    }
    for (const item of set.entries()) {
      console.log(item); // ["a", "a"]  ["b", "b"]
    }
  ```

### WeakSet
- WeakSet 和 Set 类似，都表示不重复无序集合。区别是：成员只能是对象。
- WeakSet 没有 size ，没法遍历(没有forEach等方法)
- WeakSet 的 API 有： add delete has

## 字典 Map WeakMap
### Map
- 是对象 Object 的一种。 是一组键值对的集合，且能够记录插入顺序。
- new Map() 声明一个 Map 对象，接收一个二维数组，作为键值对。

**常用的api**
- size-属性：取出字典的长度
- set(key, value)-方法：向字典中添加新元素
- get(key)-方法：通过键查找特定的数值并返回
- has(key)-方法：判断字典中是否存在键key
- delete(key)-方法：通过键 key 从字典中移除对应的数据
- clear()-方法：清空字典所有元素

**Map 和 Array 转化**
- Array -> Map
  new Map(array)   array 是二维数组

  ```
  let arr = [[1,'a'],[2,'b'],[3,'c']];
  let map = new Map(arr);
  console.log(map) //输出 {1 => "a", 2 => "b", 3 => "c"}
  ```

- Map -> Array
  Array.from(map)   [...map]
  ```
  let map = new Map();
  map.set(1, "a");
  map.set(2, "b");
  map.set(3, "c");

  // 方法一
  let arr = Array.from(map); // 二维数组
  console.log(arr);//输出 [[1, "a"], [2, "b"], [1, "c"]]
  console.log(arr.flat());   // 输出：[1, "a", 2, "b", 3, "c"]

  // 方法二 使用...rest运算符
  console.log([...map]);  // 输出 [[1, "a"], [2, "b"], [1, "c"]]
  console.log([...map.values()]);  // 输出 ["a", "b","c"]
  console.log([...map.keys()]);  // 输出 [1, 2, 3]
  ```

**遍历方式**
- for of Map (默认使用entries()返回的迭代器)
- Keys()：将字典中包含的所有**键名**以迭代器形式返回
- values()：将字典中包含的所有**键值**以迭代器形式返回
- entries()：返回所有成员的迭代器，用来遍历**[键名, 键值]**组成的数组(对于数组，键名就是索引值)。
- forEach()：遍历字典的所有成员
  ```
    let myMap = new Map();
    myMap.set("name","Jack");
    myMap.set("age","18");
    myMap.set("sex","man");
    for (const item of myMap) {
      console.log(item);
      // ["name", "Jack"]
      // ["age", "18"]
      // ["sex", "man"]
    }

    for (const item of myMap.keys()) {
      console.log(item);
      // name
      // age
      // sex
    }

    for (const item of myMap.values()) {
      console.log(item);
      // Jack
      // 18
      // man
    }
    for (const item of myMap.entries()) {
      console.log(item); 
      // ["name", "Jack"]
      // ["age", "18"]
      // ["sex", "man"]
    }
  ```

### WeakMap
- WeakMap 也是一组键值对的集合，WeakMap 只接收对象作为键名，不接受其他类型值
- WeakMap 没有 size 不可以遍历。
- WeakMap 的 API 有get、set、has、delete



## 数组遍历
- 遍历方法 for forEach for...in for...of 
- 有返回值的遍历方式 map reduce reduceRight filter find findIndex some every

### for
- for(let i = 0; i++; i < length>)
- 通过索引值获取到遍历的元素
- 支持continue和break

### forEach
- forEach((item, index) => {})
- 可以直接获取索引和值
- 遍历时，break 不可以中断循环，return 也不可以返回到外层函数
- 性能比普通for循环弱

### for...in
- for(index in array) 
- 可以正确响应break、continue和return语句
- index 为遍历的索引值
- 使用for in会遍历数组所有的可枚举属性，包括原型
- **更适合遍历对象**
- 遍历对象时 for(key in myObject) key 为对象的键名； 若想屏蔽原型链上的方法和属性，可以通过 myObject.hasOwnProperty(key) 区分。

### for...of (es6)
- for(value of array)
- 可以正确响应break、continue和return语句
- value 是数组的值，可直接用于计算
- 支持可迭代对象 (包括 Array, Map, Set, String, TypedArray，arguments 等等)

### Object.keys()
- 返回一个由对象的可枚举**属性名**组成的数组


### map
传入一个回调函数，返回一个新的数组，长度和原数组相同。
```
  const arr = [81, 52, 73, 44];
 
  const arr2 = arr.map(item => {
      return item > 60 ? `及格` : `不及格`;
  });
  //返回的arr2 = [`及格`, `不及格`, `及格`, `不及格`];
```

### reduce
传入一个回调函数，返回值为一个值。回调函数接收三个参数：temp、item、index，分别表示临时的中间数据、遍历出的每一个数据、索引。

reduceRight 和 reduce 功能相同，顺序相反为从后往前。
```
  function flatten(arr){
    return arr.reduce(function(prev,item){
      return prev.concat(Array.isArray(item)?flatten(item):item);
    },[]);
  }
```

### filter
用于过滤一些数据，传入一个返回 boolean 的回调函数，回调函数返回 true 则留下，最终返回一个新的数组。

### find 
find 和 filter 方法类似，也传入一个返回 boolean 的回调函数。find 方法一旦找到符合条件的值就立马返回并退出遍历。

### findIndex 
findIndex 和 find 功能一样，只是返回符合条件的元素的索引值，若没有则返回 -1

### some 
同样需要传入一个返回 boolean 的回调函数，判断数组中是否有满足条件的数据，返回 boolean ，遇到第一个则返回 true 并停止遍历
```
function flatten(arr){
  while(arr.some(item=>Array.isArray(item)){
    arr = [].concat(...arr);
  }
  return arr;
}
```

### every
同样需要传入一个返回 boolean 的回调函数，判断是否每一个元素都满足条件，全部满足则返回 true ，有一个不满足则返回 false 并停止遍历。

## Object 遍历
Object.keys()
for in
Object.getOwnPropertyNames()
Reflect.ownKeys()


## 获取数据类型的方式

1. typeof(a)
   只能获取到普通数据类型： number boolean string undefined object functon ； 无法判断对象的具体类型。 返回值为类型字符串，例如 `string`

2. Object.prototype.toString.call(a))
   可以区分具体的对象类型; 无法判断自定义对象类型。返回值为 类型的字符串，例如 `[object Array]` 

3. a instanceof A
   可以判断对象类型，但不可以区分基本数据类型 String Number Boolean Undefined Null Symbol。返回值为 boolean 

4. a.constructor == A
   查看数据的构造函数， `.name` 为构造函数名称。

