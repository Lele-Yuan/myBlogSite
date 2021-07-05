---
id: unittest
sidebar_position: 10
title: 单元测试
---

单元测试是指软件开发中的最小可测试单元进行检测和验证(某个方法、类、模块等)。

单元测试的好处：
- 可以检测出潜在bug
- 快速检测功能输出，验证代码是否符合预期
- 保证代码重构的安全性
- 方便多人协作开发

## Jest 
是 facebook 开源的JavaScript测试框架。

1. npm 安装
  `npm i jest -D` 或者 `yarn add jest -D`
2. 检测是否安装成功
  `npm ls jest` 查看 jest 版本号
3. 创建被测试对象 index.js
4. 创建对应的 test 文件 index.test.js
  jest 会自动查找对应的 .test.js 文件
5. 修改 package.json
  scripts 中增加 `"test": "jest"`
6. 执行单元测试
  `npm run test`

## 测试方法
1. 创建测试方法 expect 参数为实际返回结果
2. 创建测试代码方法 expect 返回一个方法 toBe 方法接收单元测试的预期值，用来检测实际值和预期值是否匹配，不匹配 throw Error
3. 封装一个单元测试函数，接收单元测试描述，和测试代码方法。通过 try/catch 判断是否通过单元测试。
```
// 被测试对象
let add = (a,b)=>a+b
 
// 测试代码
let expect = (res)=>{
    return {
        toBe:(actual)=>{
            if(res !== actual){
                throw new Error('期望值与预期值不符')
            }
        }
    }
}

// 测试函数
let test = (desc, fn) => {
  try{
    fn()
  }catch{
    console.log(desc, '测试未通过')
  }
}

// 执行单元测试
test('add 方法', () => {
  expect(add(1,2)).toBe(3)
})
```