---
id: webStorage
sidebar_position: 9
title: 浏览器存储
---

[参考文档](https://juejin.cn/post/6974052211395887141)

## Cookie
Cookie 是服务器委托浏览器存储的一些数据，会在浏览器下次向服务器发送请求时携带上并发送到服务器上。常用来进行身份识别，保存用户登陆身份，实现会话事务。

### Cookie 工作过程
- 响应头字段 **Set-Cookie** 发送 **key=value** 形式的值。
- 请求头字段 **Cookie** 发送多个 Cookie 值

### Cookie 属性
- Cookie 生命周期
  - Expries —— 过期时间，绝对时间点，也就是截止时间。
  - Max-Age —— 相对时间，单位秒；浏览器收到报文的时间再加上 Max-Age 就可以得到失效的绝对时间。
  - Expries 和 Max-Age 同时存在 优先采用 Max-Age
- Cookie 的作用域：让浏览器仅发送给特定的服务器和 URI，避免其他网站盗用。
  - Domain —— 指定 Cookie 所属的域名
  - Path —— 指定 Cookie 所属的路径，
  - 浏览器在向服务器发送 Cookie 前，会从 URI 上获取到 Host 和 Path 部分，和 Cookie 的 Domain 和 Path 属性比对，不符合条件则请求头中不会携带该 Cookie
- Cookie 的安全性：尽量不让服务器以外的人获取到
  - HttpOnly —— 只能通过浏览器 HTTP 协议传输，禁止其他方式访问(如 `document.cookie`)；减少 XSS 攻击。
  - SameSite —— 可以防范 XSRF（跨站请求伪造）攻击。设置成 SameSite=Strict 可以严格限定 Cookie 不能随着跳转链接跨站发送，而 SameSite=Lax 则略宽松一点，允许 GET/HEAD 等安全方法，但禁止 POST 跨站发送。
  - Secure —— 表示这个 Cookie 仅能通过 HTTPS 协议加密传输，明文的 HTTP 协议会被禁止发送。

### Cookie 特点
- 数据生命周期：一般由服务器生成，可以设置过期时间；
- 数据存储大小：Cookie 大小一般限制在 4KB；
- 与服务端通信：每次发起同域下的 HTTP 请求都会在请求头上携带当前域名的 Cookie，会影响请求的性能。

### Cookie 使用
```
// 读取网站下所有的 cookie 信息，获取的结果是一个以分号`;`作为分割的一个字符串
let allCookies = document.cookie;

// 往原来的已经存在的 cookie 中加入新的 cookie
document.cookie ="name=vincent";

// 还可以在后面加上可选择的选项键值对，如 domain、path、expires
document.cookie="name=vincent;domain=.test.com"

// 删除cookie，就是让这个 cookie 的 expires 过期，即设置这个 expires 的值为 0
document.cookie="name=vincent;domain=.test.com;expires=0");
```

## LocalStorage
是一种持久化的存储方式，如果不手动清除，数据会一直存在不会过期。采用键值对的形式，按域名将数据保存在对应的数据库文件里。LocalStorage 的作用域是域名级别的，**不同页签之间可以共享**。

### LocalStorage 特点
- 数据生命周期：除非被清理，否则会一直存在
- 数据存储大小：5M
- 与服务端通信：不与服务端进行通信

### LocalStorage 使用
```
// setItem() 设置属性
localStorage.setItem('name', 'vincent');

// getItem() 获取数据
let name = localStorage.getItem('name');

// removeItem() 移除某个属性
localStorage.removeItem('name');

// clear() 移除所有数据项
localStorage.clear();
```

### LocalStorage 大小
[获取LocalStorage大小](https://blog.csdn.net/asdfgh0077/article/details/104016606)
- Chrome（45.0.2454.101）： 5242878个字符
- Firefox（40.0.1）： 5242883个字符
- Internet Explorer（11.0.9600.18036） ： 16386 122066 122070个字符

## sessionStorage
是会话级的缓存，关闭浏览器时候数据会被清除。 SessionStorage 的作用域是窗口级别的，不同窗口之间不可以共享。

### SessionStorage 特点
- 数据生命周期：数据在页面刷新后依然存在，但是关闭浏览器标签页之后数据就会被清除
- 数据存储大小：5M
- 与服务端通信：不与服务端进行通信

### SessionStorage 使用
```
// setItem() 设置属性
sessionStorage.setItem('name', 'vincent');

// getItem() 获取数据
let name = sessionStorage.getItem('name');

// removeItem() 移除某个属性
sessionStorage.removeItem('name');

// clear() 移除所有数据项
sessionStorage.clear();
```
## IndexdDB
indexdDB 是支持事务的浏览器数据库，用户客户端存储大量结构化数据，包括文件、二进制等大型对象。

### IndexdDB 特点
- 数据生命周期：除非被清理，否则会一直存在
- 数据存储大小：无限制
- 与服务端通信：不与服务端进行通信

## 总结
### SessionStorage 和 LocalStorage 区别
- SessionStorage 存储在页面关闭之后就清除；localStorage 需要主动清理，否则会一直存在；
- SessionStorage 作用域是窗口级别，不同页签不可以共享；localStorage 作用域是域名级别，可跨页签共享。
### 建议
- 不建议使用 Cookie 存储数据；
- 不怎么改变的数据可以使用 LocalStorage 存储，临时的变量使用 SessionStorage 存储；
- 大量的数据可以使用 IndexdDB 存储。