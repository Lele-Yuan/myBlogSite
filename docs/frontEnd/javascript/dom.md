---
id: DOM
sidebar_position: 7
title: DOM
---

## 重排(回流) 重绘
- 重绘：不影响页面布局，更改颜色；需要渲染树重新渲染页面
- 重排：重新构建DOM树的过程教室回流；
- 重排一定重绘；重绘不一定伴随重排
- 重排的代价要大于重绘

### 造成回流的行为
- 页面首次渲染
- 改变窗体大小
- 增删DOM
- 几何属性变化：width height border fong-size 
- 元素位置改变：padding margin left top
- 获取元素的宽高偏移等属性 width height offsetXXX scrollXXX clientXXX；浏览器为了保证获取值是正确的会回流一次获取最新值。

### 减少回流
- 需要增加多个子元素可以使用 **DocumentFragment**
- 将多次操作合并成一次，更改class名代替多次操作css属性
- 将 DOM 离线后在操作，先设置成display: none 避免多次重排
- 修改位置时，可以将元素脱离文档流
- 修改元素的 left top 等属性尽量使用 CSS3 的transform属性
- 使用 opacity 代替 visibility
- 将获取到元素的宽高偏移等属性缓存起来
- 避免在循环中操作DOM

## DocumentFragment
- 文档片段，没有父对象的最小文档对象。可以当作轻量版的 Document 使用。
- 存储由节点 Node 组成的文档结构。
- DocumentFragment 不是真是的DOM **不会触发回流**。
- 属性都继承自 Node 
```
<!-- HTML -->
<ul id="list"></ul>

<!-- JavaScript -->
const list = document.querySelector('#list');
const fruits = ['Apple', 'Orange', 'Banana', 'Melon'];

const fragment = document.createDocumentFragment();

fruits.forEach(fruit => {
  const li = document.createElement('li');
  li.innerHTML = fruit;
  fragment.appendChild(li);
});

list.appendChild(fragment);
```
