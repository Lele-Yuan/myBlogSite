---
id: less_sass
sidebar_position: 3
title: less sass
---

[vue-cli3 全局引入变量](https://blog.csdn.net/qq_30960005/article/details/106197691)

## vue-cli3 中 less 全局引入
### 安装 loader 
  ```
  yarn add less less-loader style-resources-loader vue-cli-plugin-style-resources-loader -D
  ```

### vue.config.js 全局引入
```
pluginOptions: {
  "style-resources-loader": {
    preProcessor: "less",
    patterns: [path.resolve(__dirname, "src/assets/theme/variate.less")]
  }
},
```
```
// variate.less
$color-active: @F85415;
```
### 使用变量
```
// index.vue
<style lang="less" scoped>
.a:hover{
  color: @color-active
}
</style>
```


## vue-cli3 中 sass/scss 全局引入
### 安装 sass-loader node-sass
```
yarn add  install sass-loader@8.0.2 node-sass@4.13.1 --save-dev
```

### vue.config.js 全局引入
```
module.exports = {
  css:{
    loaderOptions:{
      sass: {
        prependData: `@import "@/assets/theme/variate.scss";`
      }
    }
  }
}
```
```
// variate.scss
$color-active: #F85415;
```
**💣 注意**
- 其中 prependData 根据 sass-loader 的版本不同可能使用 data 
- 这里使用 data 时有报错，改为 prependData 👌
  ```
  options has an unknown property ‘data’. These properties are valid:
  object { implementation?, sassOptions?, prependData?, sourceMap?, webpackImporter? }
  ```
- `@` 表示 `src` 目录
- 注意末尾的`;`

### 开始使用变量
```
// index.vue
<style lang="scss" scoped>
.a:hover{
  color: $color-active
}
</style>
```
## less 和 scss 的区别
less scss sass 都是 css 预处理语言，在打包时 webpack 会通过 loader 转成 css 给浏览器使用。

sass 在 3.0 版本之前使用后缀名 sass ； 在 3.0 版本之后使用后缀名 scss。

sass 没有 `{}` 和 `;` 使用严格的缩进规范； scss 和 less 与 css 的缩进一致。

sass 功能有 变量、嵌套、运算,混入(Mixin)、继承、颜色处理，函数；

less 功能有 变量，继承，运算， 函数

## less 语法
### 定义变量
- less 使用 @ 来标识变量；
### 嵌套语法
```
.parent{
  .child{ }
}
```
### &父类选择器
```
a{
  &:hover{ }
}
```
### 混合使用
less 的混合功能，支持在类中直接使用已经定义好的类。支持穿参数
```
.margin{
    margin:1px 2px;
}
.box-tab(@bgcolor:#000){
  .margin;
  background:@bgcolor;
}
.tab{
  .box-tab()
}
```

## sass 语法
### 定义变量
- less 使用 @ 来标识变量；
### 嵌套语法
```
.parent{
  .child{ }
}
```
### &父类选择器
```
a{
  &:hover{ }
}
```
### 语句
sass 支持 条件语句、循环语句
```
/* Sample Sass “if” statement */

@if lightness($color) > 30% {
} @else {
}

/* Sample Sass “for” loop */
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}

```
### mixin
sass 可以通过 @mixin 和 @include 实现混合功能；支持传参数，设置默认值等功能
```
@mixin border-radius($radius: 5px) {
  border-radius: $radius;
}
.box {
  @include border-radius(10px);
}
```
### extend
```
h2{    
  border: 5px solid pink;
  border-width: 2px;
}
.box{
  @extend h2;
}
```
