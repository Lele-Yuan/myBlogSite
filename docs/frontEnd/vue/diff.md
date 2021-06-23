---
id: diff
sidebar_position: 5
title: vdom diff
---

[谈谈对虚拟DOM 和 Dom-Diff 的理解](https://juejin.cn/post/6844904102082641927)
[Vue中的虚拟DOM及diff算法](https://juejin.cn/post/6844903923183157261)

## 虚拟 DOM
### 浏览器解析步骤
- 创建 DOM 树
- 创建 Style Rules
- 创建 Render 渲染树
- 排列布局
- 绘制

每次dom操作时，浏览器都会从头执行一遍这个操作，代价比较昂贵。

虚拟dom就是为了解决这个浏览器性能问题才被创造出来。操作虚拟dom并将diff的内容保存起来，一次性的修改dom树从而避免大量的操作dom。

### vue 虚拟dom
- 虚拟dom 是将真实的DOM节点使用 js 模拟出来的。可以通过 document.createDocumentFragment 创建
- 可以跨平台，虚拟dom是以 js 对象为基础的不依赖平台环境。
- 提高了DOM操作效率，js的运算速度很快，通过patch计算出需要更新的节点，最大程度减少DOM的操作
- 在大量、频繁的数据更新下，diff算法能够对视图进行合理高效的更新。
