---
id: DOM
sidebar_position: 2
title: 回流和重绘
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
- 将多次操作**合并**成一次，更改**class**名代替多次操作css属性
- 将 DOM **离线**后在操作，先设置成display: none 避免多次重排
- 修改位置时，可以将元素**脱离文档流**
- 修改元素的 left top 等属性尽量使用 CSS3 的 **transform** 属性；transform/opacity/filters这些属性会触发硬件加速，不会引发回流和重绘
- 使用 **opacity** 代替 visibility
- 将获取到元素的宽高偏移等属性**缓存**起来，减少获取可以引起回流的DOM属性
- 避免在**循环**中操作DOM
- 新版浏览器默认增加类'渲染队列'来减少回流，将修改样式的语句放进渲染队列中，下一句不再是修改样式的语句才会发生一次重绘。因此尽量**分离读写操作**，将修改样式的语句放在一起。

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
