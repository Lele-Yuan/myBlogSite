---
id: webpack
sidebar_position: 4
title: webpack
---

## webpack 打包流程
### 运行机制
初始化配置参数 -> 绑定事件钩子回调 -> 确定entery逐一调用 -> 使用loader编译文件 -> 输出文件

1. 读取 webpackage.config.js 文件的配置以及命令中的配置项，初始化本次构建的配置参数。
2. 启动 webpack， 创建 compiler 对象，开始解析项目。
3. 执行配置文件中的插件实例话语句，给 compiler 传入 plugin的 apply方法，为 webpack 事件挂上自定义钩子。
4. entryOption 阶段，webpack 开始读取配置中的 Entries ，递归遍历所有入口文件。
5. compilation 过程，webpack 会一次进入每个入口文件 entry ，使用用户配置的 loader 对文件进行编译(buildMoudule)，最终输出为 JavaScript 文件。
6. 每个模块文件在通过 Loader 解析之后，都会通过acorn库生成模块代码的**AST语法树**，通过语法树可以分析出这个模块是否还有依赖的模块，从而继续循环执行下一个模块的解析编译。
6. 在整个过程中，webpack 会通过订阅发布模式，向外抛出一些 **hooks** ， webpack 的 plugin 则可以通过监听这些关键的事件节点，执行插件的任务，从而达到干预输出的目的。

## webpack loader
webpack 内部只处理 JavaScript 模块代码，最后打包出来的也是一份 js 文件。在打包过程中会默认把遇到的文件当作 js 文件进行解析，因此当遇到非 js 文件时，需要对文件进行转换。

Loader 支持以数组的形式配置多个，当 webpack 在转换文件类型时，会按顺序链式调用每个Loader(执行顺序是从后往前)，前一个Loader返回的数据当作后一个Loader 的入参。

Loader 就是用来将不同的文件转化成 js 文件的。一个 Loader 是一个js方法。

webpack 在默认情况下会对 Loader 的执行结果进行缓存，能够提高构建速度，也可以通过 `this.cacheable(false);` 手动关闭缓存。

在loader文件里你可以exports一个命名为 pitch 的函数，它会先于所有的loader执行。

## webpack plugin
Plugin 负责扩展 webpack 功能。基于事件流框架 Tapable。

一个 Plugin 是一个函数 或者 包含 apply 方法的对象。选择合适的声明周期钩子，通过 **tap** 方法添加订阅这个插件的功能。

webpack 基于发布订阅模式，在运行的生命周期中会广播出许多事件，plugin 通过监听这些事件，就可以在特定的阶段(hooks)执行自己的任务，从而实现自己想要的功能。

Webpack 的生命周期钩子有哪些？ 
enviromnent - 准备环境时调用；
entryOption - webpack 中的 entries 被处理后；
afterPlugins - 初始化内部插件，插件集合完成设置后；
afterResolvers - resolver设置完成后触发；


[compiler hooks](https://webpack.docschina.org/api/compiler-hooks/)
[compilation hooks](https://webpack.docschina.org/api/compilation-hooks/)

## compiler和compilation
compiler和compilation是Webpack两个非常核心的对象。

compiler对象是一个全局单例，他负责把控整个webpack打包的构建流程。

compilation对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次热更新和重新构建，compiler都会重新生成一个新的compilation对象，负责此次更新的构建过程。

compiler暴露了和 Webpack整个生命周期相关的钩子。

compilation则暴露了与模块和依赖有关的粒度更小的事件钩子。

## webpack 打包优化

- [参考链接](https://juejin.cn/post/6844903685407916039)
- [webpack 打包流程](https://juejin.cn/post/6943468761575849992)
- [深入浅出的webpack](http://webpack.wuhaolin.cn/)