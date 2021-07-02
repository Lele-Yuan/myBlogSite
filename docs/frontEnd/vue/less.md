---
id: less
sidebar_position: 9
title: less
---

[vue-cli3 全局引入less变量](https://www.cnblogs.com/zixian/p/VUE-CLI3_less.html)

[参考链接](https://juejin.cn/post/6844903520441729037)
## 值变量
使用 @ 开头定义变量；使用时直接输入 @名称
```
@lightPrimaryColor: #c5cae9;

body{
  color: @lightPrimaryColor
}
```
## 选择器变量
让选择器变成动态，也是通过 @ 开头定义变量，使用时直接输入 @{名称}
```
@mySelector: #wrap;
@{mySelector}{} //变量名 必须使用大括号包裹
```
## 属性变量
通过 @ 开头定义变量，使用时直接输入 @{名称} ；减少代码的书写量。
```
@borderStyle: border-style;
@Soild:solid;
#wrap{
  @{borderStyle}: @Soild;//变量名 必须使用大括号包裹
}
```
## 声明变量
- 定义： @name: { 属性: 值 ;};
- 使用：@name();
```
@Rules:{
  width: 200px;
  height: 200px;
  border: solid 1px red;
};
#con{
  @Rules();
}
```