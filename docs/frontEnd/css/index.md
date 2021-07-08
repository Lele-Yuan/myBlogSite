---
id: index
sidebar_position: 1
title: css知识点
---

## 盒模型
CSS 的盒模型本质就是一个盒子，包含四个部分，从内到外依次为content padding border margin
### 标准盒模型
- w3c 盒模型标准
- width(height) = contentWidth(contentHeight)
### 怪异盒模型
- IE 盒模型标准
- width(height) = contentWidth(contentHeight) + padding + border
### 如何设置盒模型
- 怪异盒模型：box-sizing: border-box;
- 标准盒模型：box-sizing: content-box;

## BFC
BFC (Block Formatting Content) 块级格式化上下文。是一个独立的渲染区域，这个区域与外部无关。可以通过一些条件触发BFC。
### BFC 触发条件
- HTML 根元素
- float 不是none
- overflow 不是visible
- display 为 inline-block table-cell table-caption flex inline-flex
- position 不是static或者relative
### BFC 布局规则
- 同一个BFC的两个相邻容器上下margin会重叠
- 计算BFC高度时浮动元素也参与计算
- BFC的区域不会与浮动容器发生重叠
- BFC内部的盒子是垂直方向依次排列的
- BFC元素的margin-left与包含块的border-left相接触
### BFC 作用
- 利用BFC避免margin塌陷
- 自适应两栏布局
- 清除浮动
[参考连接](https://blog.csdn.net/sinat_36422236/article/details/88763187)

## 实现垂直水平居中的方案

## flex 弹性布局
### flex 基本概念
- flex 容器(flex container) —— display: flex 的容器；
- flex 项目(flex item) —— flex 容器的所有子元素；
- 主轴(main axis) —— 默认是水平轴
- 交叉轴(cross axis) —— 默认是垂直轴

### 容器的属性
| 属性名 | 作用 | 可选值 |
| --- | --- | --- |
| `flex-direction` | 主轴的方向 | row(默认): 主轴为水平方向，起点在左侧；<br/>row-reverse: 主轴为水平方向，起点在右侧；<br/>column: 主轴为垂直方向，起点在上沿；<br/>column-reverse: 主轴为垂直方向，起点在下沿；|
| `flex-wrap` | 定义如果一条主线排不开如何换行 | nowrap(默认): 不换行<br/>wrap: 换行，第一行在前边<br/>wrap-reverse: 换行，第一行在后边 |
| `flex-flow` | flex-direction 和 flex-wrap 的简写形式 | row nowrap(默认) |
| `justify-content` | 主轴上的对齐方式 | **具体的对其方式和轴的方向有关，假设主轴为左向右。**<br/>flex-start(默认): 左对齐<br/>flex-end: 右对齐<br/>center: 居中对齐<br/>space-between: 两端对其，项目之间的距离相等，两端与边框之间无缝隙；<br/>space-around: 每个项目两侧的距离相等，与边框之间的距离是两个项目之间的间距的一半。<br/>space-evenly: 每个项目之间以及项目和边框之间的距离相等。 |
| `align-items` | 交叉轴上的对齐方式 | **具体的对其方式和轴的方向有关，假设交叉轴为上到下。**<br/>flex-start: 交叉轴的起点对齐；<br/>flex-end: 交叉轴的终点对齐；<br/>center: 交叉轴的中点对齐；<br/>baseline: 项目的第一行文字的基线对齐(似乎只对主轴为水平方向的生效)；<br/>stretch(默认): 如果项目没有设置 height 或者设置为 auto 则占满整个容器的高度(交叉轴为左向右时为宽度)；|
| `align-content` | 多根主轴线的对齐方式，如果只有一根轴线该属性不生效 | flex-start: 与交叉轴起点对齐<br/>flex-end: 与交叉轴终点对齐<br/>center: 与交叉轴中点对齐<br/>space-between: 与交叉轴的两端对齐，轴线之间均匀分布(项目之间的距离相等，两端与边框无缝隙)<br/>space-around: 每根轴线两侧的距离相等，轴线之间的距离是两端与边框之间距离的2倍。<br/>stretch(默认值): 轴线沾满整个容器。 |
### 项目的属性
- order —— 定义项目的排列顺序；数值越小排列越靠前。
- flex-grow —— 项目的放大比例
  - 默认为0，即如果存在剩余空间也不放大。
  - 所有项目都是1，且如果有剩余空间，则将等分剩余空间。
  - 若其中一个是2，则前者占据的剩余空间是其余的2倍。
- flex-shrink —— 项目的缩小比例
  - 默认1，即空间不足时，该项目将缩小。
  - 所有项目都是1，当空间不足时等比例缩小。
  - 其中一个项目为0，则这个项目不缩小，其余项目等比例缩小。
- flex-basis —— 定义在分配多余空间之前，项目占据的主轴空间。
  - 默认为auto，和设置width/height一样；占据固定空间。
- flex —— 是 flex-grow flex-shrink flex-basis 的简写
  - 默认值为0 / 0 1 auto
  - 快捷值 1/auto 相当于 1 1 auto
  - 快捷值 none 相当于 0 0 auto
- align-self —— 允许设置单个项目的排列方式，覆盖align-items
  - 默认为 auto 表示继承父级的 align-items 若没有父级则等同于 stretch
  - 其余可选值和 align-items 一致

## 响应式布局

