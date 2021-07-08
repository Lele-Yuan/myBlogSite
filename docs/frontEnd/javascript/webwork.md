---
id: webwork
sidebar_position: 12
title: webworkers
---

webworkers 是一个 Web API ，是浏览器的给js提供运行环境的能力。使得web应用可以在独立于主线程的后台线程中运行js。

## 创建webworkers线程
- 引入外部文件
  ```
  new Work('work.js')
  ```
- 嵌入式script
  1. script 标签增加 `type="javascript/worker"` 不执行这段代码
  2. `document.getElementById('#worker').textContent` 获取到 JavaScript 字符串
  3. `new Blob([workScript],{type:'text/javascript'})` 将JavaScript字符串转成二进制对象
  4. `window.URL.createObjectURL(blob)` 将二进制对象转成一个`blob://`协议头的URL
  ```
  <script id="worker" type="javascript/worker">
    function doWorking(){}
  </script>
  <script>
    var workScript = document.getElementById('#worker').textContent
    var blob = new Blob([workScript],{type:'text/javascript'})
    var work = new Work(window.URL.createObjectURL(blob))
  </script>
  ```

## webworkers 的约束
1. webworkers 文件必须和主线程文件同源
2. webworkers 线程的上下文(DedicateWorkGlobalScope)和 主线程的上下文(window)不同：不可以操作DOM 不可以使用window的方法；
3. webworkers 文件不可以使用本地文件，本地开发需要启动一个服务

## 主线程和webworkers线程通信
1. 主线程发送 postMessage 方法携带需要 webworkers 线程做的事情 doWrok；
2. webworkers 线程通过 omMessage 接收到主线程发送的任务，并开始执行 doWork；
3. webworkers 完成任务后会发送 postMessage 并携带执行完成的结果；
4. 主线程通过 onMessage 接收到 webworkers 完成任务的通知，并获取到执行结果。

## webworkers 应用场景
JavaScript在执行复杂的运算时，会阻塞页面的渲染。
- 复杂的逻辑运算：大数据的遍历等
- 渲染优化：canvas动画可以使用offline+webworkers
- 流媒体处理