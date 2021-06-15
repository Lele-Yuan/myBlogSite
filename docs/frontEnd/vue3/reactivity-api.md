---
id: reactivity-api
sidebar_position: 3
title: Reactivity API
---

vue3 采用 proxy 代替 defineProperty 实现对数据的监测。

## 为何使用 proxy ？



响应式 API  `ref` `reactive` `toRef` `toRefs`

![reactivity](./img/reactivity.png)