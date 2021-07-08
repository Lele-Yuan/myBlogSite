---
id: dom
sidebar_position: 10
title: DOM
---
## DOM事件流
[事件捕获、事件冒泡以及事件代理](https://juejin.cn/post/6844904190280466440)

DOM事件流的三个阶段：
- 捕获阶段：从最外层的Window开始，逐级向内层前进，直到具体事件目标元素。
- 目标阶段：目标阶段指触发事件的最底层的元素。
- 冒泡阶段：事件的响应是从最底层开始一层一层往外传递到最外层的Window。

```
element.addEventListener(type, listener, useCapture)
```
- type：事件类型
- listener：事件监听回调
- useCapture：事件模型方式 - 默认值false表示事件冒泡；true表示事件捕获

## 事件代理和事件委托
事件代理又叫事件委托，事件代理就是利用事件冒泡或事件捕获的机制把一系列的内层元素事件绑定到外层元素。
### 为什么需要事件委托
- 页面中事件处理程序的数量与页面整体性能直接相关；
- 为指定元素添加事件首先需要访问DOM节点，访问次数越多越会消耗性能；
- 每个回调函数都占用空间，对象越多性能越差。

## 浏览器一些内置方法
### getBoundingClientRect
判断DOM是否出现在了当前视口
```
// 图片懒加载
function lazyload() {
  for(let i = count; i <num; i++) {
    // 元素现在已经出现在视口中
    if(img[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
      if(img[i].getAttribute("src") !== "default.jpg") continue;
      img[i].src = img[i].getAttribute("data-src");
      count ++;
    }
  }
}
```
### IntersectionObserver
实现了监听window的scroll事件、判断是否在视口中以及节流三大功能。
```
// 图片懒加载
let img = document.getElementsByTagName("img");

const observer = new IntersectionObserver(changes => {
  //changes 是被观察的元素集合
  for(let i = 0, len = changes.length; i < len; i++) {
    let change = changes[i];
    // 通过这个属性判断是否在视口中
    if(change.isIntersecting) {
      const imgElement = change.target;
      imgElement.src = imgElement.getAttribute("data-src");
      observer.unobserve(imgElement);
    }
  }
})
Array.from(img).forEach(item => observer.observe(item));
```
