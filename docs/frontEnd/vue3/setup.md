---
id: setup
sidebar_position: 3
title: setup
---

组合式 API

<!-- ![vue2 组件逻辑](https://v3.cn.vuejs.org/images/options-api.png) -->

## setup 选项

调用时机：创建组件实例、初始化props、调用setup函数。

setup 作为组合式API的入口，在组件创建之前执行。它是在 beforeCreate 钩子之前调用的

setup 接收两个参数 `prop` `context` 。

setup中不可使用 `this` ，因为它不会找到组件实例

setup中返回的所有内容都可以在组件的其他部分以及组件的模版使用。(comouted、methods、lifecycle hooks and so on)

### setup 参数

#### props

  setup 中的 `props` 是响应式的。

  不能用ES6解构，会失去响应性。如果需要解构props，可以使用 `toRefs` 函数来完成

  ```
    import { toRefs } from 'vue'

    setup(props) {
      const { title } = toRefs(props)

      console.log(title.value)
    }
  ```

  当传入的props中没有 `title` 时， toRefs 将不会为其创建一个ref。需要使用 `toRef`

  ```
    import { toRef } from 'vue'
    
    setup(props) {
      const title = toRef(props, 'title')
      console.log(title.value)
    }
  ```
#### context

  context 是一个普通的 Object，包含3个property。不具备响应式，可以使用ES6解构。
  ```
    export default {
      setup(props, context) {
        // Attribute (非响应式对象)
        console.log(context.attrs)

        // 插槽 (非响应式对象)
        console.log(context.slots)

        // 触发事件 (方法)
        console.log(context.emit)
      }
    }
  ```

## setup 内注册生命周期钩子

组合式API的生命周期钩子与选项式API的名称相同，增加前缀on。例如 `mounted` 变为 `onMounted`

vue2 中写在 beforeCreated 和 created 中的代码都应该直接写在 setup 中，不需要显式的定义。

  | optoon API | composition API |
  | ---- | ---- |
  | beforeCreate | Not needed |
  | created | Not needed |
  | beforeMount | onBeforeMount |
  | mounted | onMounted |
  | beforeUpdate | onBeforeUpdate |
  | updated | onUpdated |
  | beforeUnmount | onBeforeUnmount |
  | unmounted | onUnmounted |
  | errorCaptured | onErrorCaptured |
  | renderTracked | onRenderTracked |
  | renderTriggered | onRenderTriggered |
  | activated | onActivated |
  | deactivated | onDeactivated |

## proviee / inject

### 使用 provide

在setup 中使用 provide 需要从vue中显式导入 `provide` 方法。

provide 接收两个参数 name 和 value

```
  import { provide } from 'vue'

  export default {
    setup() {
      provide('provideString', 'hello')
      provide('provideObject', {
        key1: 'abc',
        key2: 123
      })
    }
  }

```

### 使用 inject

同样需要从vue显式导入 `inject` 方法。 接收两个参数 name 和 value(默认值，可选)

```
  import { inject } from 'vue'

  export default {
    setup() {
      const myString = inject('provideString', 'hello')
      const myObject = inject('provideObject')

      return {
        myString, 
        myObject
      }
    }
  }
```

### 响应式 provide / inject

在 provide 时使用 ref 或者 reactive。

此时inject的组件也可以修改，建议使用 provide 一个方法来改变响应式的property。

要确保通过 provide 传递的数据不会被 inject 的组件更改，建议 provide 组件的 property 使用 readonly。

在使用 readonly 时需要注意，**不可以直接将inject赋值给 ref 对象的 property，会使readonly失效**。

```
  import { provide, ref, reactive, readonly } from 'vue'

  export default {
    setup() {
      const provideString = ref('hello')
      const provideObject = reactive{
        key1: 'abc',
        key2: 123
      }
      const updateString = () => {
        provideString.value = 'abc'
      }
      provide('provideString', readonly(provideString))
      provide('provideObject', readonly(provideObject))
      provide('updateString', updateString)
    }
  }

```

```
  import { inject, ref, reactive, readonly } from 'vue'

  export default {
    setup() {
      const provideString = inject('provideString')
      const provideObject = inject('provideObject')


      // 直接赋值给 ref 对象的 property，readonly会失效
      const refObj = reactive({
        provideString: '',
        provideObject: {}
      });
      refObj.provideString = inject('provideString')
      refObj.provideObject = inject('provideObject')

      // 修改了 inject 值之后，其他地方再 inject 值也会被修改。
      refObj.provideString = 'a new string'

      
      return {
        provideString,
        provideObject,
        ...toRefs(refObj)
      }
    }
  }

```