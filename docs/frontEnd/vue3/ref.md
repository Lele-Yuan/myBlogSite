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

## 另一种获取方式
```
  let { proxy } = getCurrentInstance()
```

## 第二种方式使用 $ref
  
```
  watchEffect(() => {
    console.log('proxy', proxy.$refs);
  })
```