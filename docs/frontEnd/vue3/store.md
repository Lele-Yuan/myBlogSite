---
id: store
sidebar_position: 5
title: 状态管理
---

使用 [project / inject](setup#proviee--inject) 注入 代替 vuex 状态管理

```
  // store.ts 

  import { provide, inject, ref, onMounted, readonly } from 'vue'

  const configSymbol: symbol = Symbol()

  export const useProvider = {
    setup() {
      let config = ref(null)
      const configServer = async () => {
        // await 一些异步操作，比如api等
        config.value = { name: '名字' }
      }
      onMounted(async () => {
        await configServer()
      })
      provide(configSymbol, {
        //导出只读的config只有函数内部可以修改状态
        config: readonly(config),
      })
    },
  }
  
  export const useInject = () => {
    return inject(configSymbol)
  }
```

```
  // 在顶层组件中注入
  import { defineComponent } from 'vue';

  import { useProvider } from './store';

  export default defineComponent({
    name: 'App',
    setup() {
      useProvider()
    }
  })

```

```
  // 业务逻辑组件页面使用
  import { defineComponent } from 'vue';

  import { useInject } from './store';

  export default defineComponent({
    name: 'myComponent',
    setup() {
      const { config } = useInject()

      console.log(config.vualue.name)

      return {
        config
      }
    }
  })

```