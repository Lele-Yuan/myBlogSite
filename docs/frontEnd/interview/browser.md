---
id: browser
sidebar_position: 2
title: 浏览器
---

## 页面加载流程
从输入URL到页面加载发生了什么？
1. 浏览器输入 URL 回车
2. 浏览器查找当前 URL 是否有缓存，并比较缓存是否过期
3. DNS 解析到对应的 IP
4. 根据 IP 建立 TCP 链接(三次握手)
5. HTTP 发起请求
6. 服务器处理请求，浏览器接收HTTP响应（Content-Type：text/html）开始浏览器的解析和渲染工作
7. 关闭 TCP 连接(四次挥手)
8. 解析工作：构建**DOM树**(标记化、建树)；样式计算(格式化样式表、标准化样式属性、计算每个节点的具体样式)；生成**布局树 Layout Tree**
9. 渲染工作：建立图层树 Layer Tree 、生成绘制列表、生成图块和位图、显示器显示内容。

## 浏览器本地缓存
- cookie
- localStorage
- sessionStorage
- indexedDB

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
