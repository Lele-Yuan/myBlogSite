---
id: ref
sidebar_position: 0
title: Sref
---

## template 标签中写入 ref 属性
```
  <div ref="divRef"></div>
```

## setup 中声明变量，并return
```
  setup() {
    const divRef = ref(null)

    return {
      divRef,
    };
  }
```

## js 中获取 $ref
在 onMounted watchEffect 中可以使用

## getCurrentInstance()
- getCurrentInstance 方法获取当前组件的实例；
- 组件实例中的属性 proxy 是属性 ctx 的响应式对象；
- 生产环境 ctx 可能获取不到上面的全局方法，解决办法是使用 proxy 代替。
```
  let { proxy } = getCurrentInstance()
```

## 第二种方式使用 $ref
  
```
  watchEffect(() => {
    console.log('proxy', proxy.$refs);
  })
```