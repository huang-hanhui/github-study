## Vue3 精华文章

https://juejin.cn/post/7164159759619194893#comment



## Vue3 组件通讯 



### 父组件传子组件

```js
// 父组件
<template>
    <Child :msg="msg"/>
</template>

<script setup lang="ts">
## 引入子组件
import Child from "@/components/Child.vue"
import {ref} from "vue"

const msg = ref<string>('我是你老子 ----> 父组件')
</script>



```



```js
// 子组件
<template>
   <div> {{ props.msg }}</div>  // props 可以省略
</template>
<script setup lang="ts">
import {defineProps} from "vue"  // defineProps 可以不引入直接使用
let props = definProps(['msg'])  // 数组形式

let props = definProps({   		 // 对象式，default 为默认值
    msg:{
        type:String;
        default:"我是你老子"
    }
})
<script>
```





### 子组件传父组件

```js
// 父组件   Parent.vue
<template>
  <div>父组件：{{ message }}</div>
  <!-- 自定义 changeMsg 事件 -->
  <Child @changeMsg="changeMessage" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'
let message = ref('雷猴')

// 更改 message 的值，data是从子组件传过来的
function changeMessage(data) {
  message.value = data
}
</script>

```



```js
// 子组件 Child.vue

<template>
  <div>
    子组件：<button @click="handleClick">子组件的按钮</button>
  </div>
</template>

<script setup>
// 注册一个自定义事件名，向上传递时告诉父组件要触发的事件。
const emit = defineEmits(['changeMsg'])

function handleClick() {
  // 参数1：事件名
  // 参数2：传给父组件的值
  emit('changeMsg', '鲨鱼辣椒')
}

</script>

```



### expose / ref 

​	子组件可以通过 `expose` 暴露自身的方法和数据。

​	父组件通过 `ref` 获取到子组件并调用其方法或访问数据。

```js
// 父组件 Parent.vue
<template>
  <div>父组件：拿到子组件的message数据：{{ msg }}</div>
  <button @click="callChildFn">调用子组件的方法</button>

  <hr>

  <Child ref="com" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Child from './components/Child.vue'

const com = ref(null) // 通过 模板ref 绑定子组件

const msg = ref('')

onMounted(() => {
  // 在加载完成后，将子组件的 message 赋值给 msg
  msg.value = com.value.message
})

function callChildFn() {
  // 调用子组件的 changeMessage 方法
  com.value.changeMessage('蒜头王八')

  // 重新将 子组件的message 赋值给 msg
  msg.value = com.value.message
}
</script>

```



```js
//  子组件 Child.vue

<template>
  <div>子组件：{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('蟑螂恶霸')

function changeMessage(data) {
  message.value = data
}

// 使用 defineExpose 向外暴露指定的数据和方法
defineExpose({
  message,
  changeMessage
})

</script>

```



### Non-Props

所谓的 `Non-Props` 就是 [非 Prop 的 Attribute](https://link.juejin.cn/?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fguide%2Fcomponent-attrs.html)。

意思是在子组件中，没使用 `prop` 或 `emits` 定义的 `attribute`，可以通过 `$attrs` 来访问。

常见的有 `class` 、`style` 和 `id`。

```js
// 父组件 Parent.vue

<template>
  <Child msg="雷猴 世界！" name="鲨鱼辣椒" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'
</script>

```



```js
// 子组件 Child.vue

<template>
  <div>子组件：打开控制台看看</div>
</template>
```



![](C:\Users\10670\AppData\Roaming\Typora\typora-user-images\image-20230722233116340.png)





### v-model

#### 单个v-model情况

```js
// 父组件 Parent.vue

<template>
  <Child v-model="message" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

const message = ref('雷猴')
</script>
```

```js
// 子组件 Child.vue

<template>
  <div @click="handleClick">{{modelValue}}</div>
</template>

<script setup>
import { ref } from 'vue'

// 接收
const props = defineProps([
  'modelValue' // 接收父组件使用 v-model 传进来的值，必须用 modelValue 这个名字来接收
])

const emit = defineEmits(['update:modelValue']) // 必须用 update:modelValue 这个名字来通知父组件修改值

function handleClick() {
  // 参数1：通知父组件修改值的方法名
  // 参数2：要修改的值
  emit('update:modelValue', '喷射河马')
}

</script>
```

#### 多个v-model情况

```js
// Parent.vue
<template>
  <Child v-model:msg1="message1" v-model:msg2="message2" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'
const message1 = ref('雷猴')
const message2 = ref('蟑螂恶霸')
</script>

```



```js
// Child.vue

<template>
  <div><button @click="changeMsg1">修改msg1</button> {{msg1}}</div>

  <div><button @click="changeMsg2">修改msg2</button> {{msg2}}</div>
</template>

<script setup>
import { ref } from 'vue'
// 接收
const props = defineProps({
  msg1: String,
  msg2: String
})
const emit = defineEmits(['update:msg1', 'update:msg2'])

function changeMsg1() {
  emit('update:msg1', '鲨鱼辣椒')
}

function changeMsg2() {
  emit('update:msg2', '蝎子莱莱')
}

</script>

```



#### v-model 修饰符

```js
// Parent.vue

<template>
  <Child v-model.uppercase="message" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

const message = ref('hello')
</script>
```

```js
// Child.vue

<template>
  <div>{{modelValue}}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps([
  'modelValue',
  'modelModifiers'
])

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  // 判断有没有 uppercase 修饰符，有的话就执行 toUpperCase() 方法
  if (props.modelModifiers.uppercase) {
    emit('update:modelValue', props.modelValue.toUpperCase())
  }
})

</script>
```



### 插槽 slot

插槽可以理解为传一段 `HTML` 片段给子组件。子组件将 `<slot>` 元素作为承载分发内容的出口。



#### 默认插槽

```js
// Parent.vue

<template>
  <Child>
    <div>雷猴啊</div>
  </Child>
</template>
```

```js
// Child.vue

<template>
  <div>
    <slot></slot>
  </div>
</template>
```



#### 具名插槽

**具名插槽** 就是在 **默认插槽** 的基础上进行分类，可以理解为对号入座。

```js
// Parent.vue

<template>
  <Child>
    <template v-slot:monkey>
      <div>雷猴啊</div>
    </template>

    <button>鲨鱼辣椒</button>
  </Child>
</template>

```

```js
// Child.vue

<template>
  <div>
    <!-- 默认插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="monkey"></slot>
  </div>
</template>

```

#### 作用域插槽

```js
// Parent.vue

<template>
  <!-- v-slot="{scope}" 获取子组件传上来的数据 -->
  <!-- :list="list" 把list传给子组件 -->
  <Child v-slot="{scope}" :list="list">
    <div>
      <div>名字：{{ scope.name }}</div>
      <div>职业：{{ scope.occupation }}</div>
      <hr>
    </div>
  </Child>
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

const list = ref([
  { name: '雷猴', occupation: '打雷'},
  { name: '鲨鱼辣椒', occupation: '游泳'},
  { name: '蟑螂恶霸', occupation: '扫地'},
])
</script>

```



```js
// Child.vue

<template>
  <div>
    <!-- 用 :scope="item" 返回每一项 -->
    <slot v-for="item in list" :scope="item" />
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>
```



### provide / inject

遇到多层传值时，使用 `props` 和 `emit` 的方式会显得比较笨拙。这时就可以用 `provide` 和 `inject` 了。

`provide` 是在父组件里使用的，可以往下传值。

`inject` 是在子(后代)组件里使用的，可以网上取值。

无论组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者。

```js
// Parent.vue

<template>
  <Child></Child>
</template>

<script setup>
import { ref, provide, readonly } from 'vue'
import Child from './components/Child.vue'

const name = ref('猛虎下山')
const msg = ref('雷猴')

// 使用readonly可以让子组件无法直接修改，需要调用provide往下传的方法来修改
provide('name', readonly(name))

provide('msg', msg)

provide('changeName', (value) => {
  name.value = value
})
</script>
```



```js
// Child.vue

<template>
  <div>
    <div>msg: {{ msg }}</div>
    <div>name: {{name}}</div>
    <button @click="handleClick">修改</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const name = inject('name', 'hello') // 看看有没有值，没值的话就适用默认值（这里默认值是hello）
const msg = inject('msg')
const changeName = inject('changeName')

function handleClick() {
  // 这样写不合适，因为vue里推荐使用单向数据流，当父级使用readonly后，这行代码是不会生效的。没使用之前才会生效。
  // name.value = '雷猴'

  // 正确的方式
  changeName('虎躯一震')

  // 因为 msg 没被 readonly 过，所以可以直接修改值
  msg.value = '世界'
}
</script>

```



### 全局事件总线

我们创建一个 `Bus.js` 文件，用来控制数据和注册事件的。

`Bus.js` 里有一个 `Bus` 类

- `eventList` 是必须项，用来存放事件列表的。
- `constructor` 里除了 `eventList` 外，其他都是自定义数据，公共数据就是存在这里的。
- `$on` 方法用来注册事件。
- `$emit` 方法可以调用 `$on` 里的事件。
- `$off` 方法可以注销 `eventList` 里的事件。

然后需要用到总线的组件，都导入 `Bus.js` ，就可以共同操作一份数据了。



```js
// Bug.js

import { ref } from 'vue'

class Bus {
  constructor() {
    // 收集订阅信息,调度中心
	this.eventList = {}, // 事件列表，这项是必须的
    // 下面的都是自定义值
	this.msg = ref('这是一条总线的信息')
  }

  // 订阅
  $on(name, fn) {
	this.eventList[name] = this.eventList[name] || []
	this.eventList[name].push(fn)
  }

  // 发布
  $emit(name, data) {
	if (this.eventList[name]) {
      this.eventList[name].forEach((fn) => {
        fn(data)
      });
	}
  }

  // 取消订阅
  $off(name) {
      if (this.eventList[name]) {
	  delete this.eventList[name]
	}
  }
}

export default new Bus()

```



```js
// Parent.vue

<template>
  <div>
    父组件: 
    <span style="margin-right: 30px;">message: {{ message }}</span>
    <span>msg: {{ msg }}</span>
  </div>
  <Child></Child>
</template>

<script setup>
import { ref } from 'vue'
import Bus from './Bus.js'
import Child from './components/Child.vue'

const msg = ref(Bus.msg)

const message = ref('hello')

// 用监听的写法
Bus.$on('changeMsg', data => {
  message.value = data
})

</script>

```



```js
// Child.vue

<template>
  <div>
    子组件：
    <button @click="handleBusEmit">触发Bus.$emit</button>
    <button @click="changeBusMsg">修改总线里的 msg</button>
  </div>
</template>

<script setup>
import Bus from '../Bus.js'

function handleBusEmit() {
  Bus.$emit('changeMsg', '雷猴啊')
}

function changeBusMsg() {
  // console.log(Bus.msg)
  Bus.msg.value = '在子组件里修改了总线的值'
}
</script>
```





### getCurrentInstance

getCurrentInstance  只能在 setup 或者生命周期钩子使用

```js
// Parent.vue

<template>
  <div>父组件 message 的值: {{ message }}</div>
  <button @click="handleClick">获取子组件</button>
  <Child></Child>
  <Child></Child>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import Child from './components/Child.vue'

const message = ref('雷猴啊')

let instance = null

onMounted(() => {
  instance = getCurrentInstance()
})

// 子组件列表
let childrenList = []

// 注册组件
function registrationCom(com) {
  childrenList.push(com)
}

function handleClick() {
  if (childrenList.length > 0) {
    childrenList.forEach(item => {
      console.log('组件实例：', item)
      console.log('组件名(name)：', item.type.name)
      console.log('组件输入框的值：', item.devtoolsRawSetupState.inputValue)
      console.log('---------------------------------------')
    })
  }
}

</script>
```



```js
// Child.vue

<template>
  <div>
    <div>----------------------------</div>
    子组件：<button @click="handleClick">获取父组件的值</button>
    <br>
    <input type="text" v-model="inputValue">
  </div>
</template>

<script>
export default {
  name: 'ccccc'
}
</script>

<script setup>
import { getCurrentInstance, onMounted, nextTick, ref } from 'vue'

const inputValue = ref('')

let instance = null

onMounted(() => {
  instance = getCurrentInstance()
  nextTick(() => {
    instance.parent.devtoolsRawSetupState.registrationCom(instance)
  })

})

function handleClick() {
  let msg = instance.parent.devtoolsRawSetupState.message
  msg.value = '哈哈哈哈哈哈'
}

</script>
```



### Vuex

在 `Vue3` 中，需要使用 `Vuex v4.x` 版本。

```
npm install vuex@next --save  or yarn add vuex@next --save
```



`state`：数据仓库，用来存数据的。

`getters`：获取数据的，有点像 `computed` 的用法(个人觉得)。

`mutations`: 更改 `state` 数据的方法都要写在 `mutations` 里。

`actions`：异步异步异步，异步的方法都写在这里，但最后还是需要通过 `mutations` 来修改 `state` 的数据。

`modules`：分包。如果项目比较大，可以将业务拆散成独立模块，然后分文件管理和存放。



```js
// store/index.js

import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```



### Pinia

`Pinia` 是最近比较火热的一个工具，也是用来处理 **跨组件通信** 的，极大可能成为 `Vuex 5` 。

`Pinia` 简化了状态管理模块，只用这3个东西就能应对日常大多任务。

- `state`：存储数据的仓库
- `getters`：获取和过滤数据（跟 `computed` 有点像）
- `actions`：存放 “修改 `state` ”的方法



```
npm install pinia   or   yarn add pinia
```



#### 注册

在 `src` 目录下创建 `store` 目录，再在 `store` 里创建 `index.js` 和 `user.js`

目录结构如下

```
store
|- index.js
|- user.js
```



```js
// index.js
import { createPinia } from 'pinia'
const store = createPinia()
export default store
```



```js
// user.js
// 写法1
export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: '雷猴'
    }
  },
  getters: {
    fullName: (state) => {
      return '我叫 ' + state.name
    }
  },
  actions: {
    updateName(name) {
      this.name = name
    }
  }
})


// 写法2
export const useUserStore = defineStore('user',{
  state: () => {
    return {
      name: '雷猴'
    }
  },
  getters: {
    fullName: (state) => {
      return '我叫 ' + state.name
    }
  },
  actions: {
    updateName(name) {
      this.name = name
    }
  }
})

```



#### 导入

然后在 `src/main.js` 中引入 `store/index.js`

```js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)

app
  .use(store)
  .mount('#app')

```



#### 在组件中使用

```js
// xxx.vue

<template>
  <div>
    <div>name: {{ name }}</div>
    <div>全名：{{ fullName }}</div>
    <button @click="handleClick">修改</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

// const name = computed(() => userStore.name)

// 建议
const { name, fullName } = storeToRefs(userStore)


function handleClick() {
  // 不建议这样改
  // name.value = '蝎子莱莱'

  // 推荐的写法！！！
  userStore.updateName('李四')
}
</script>

```



### mitt

我们前面用到的 **总线 Bus** 方法，其实和 `mitt.js` 有点像，但 `mitt.js` 提供了更多的方法。

比如：

- `on`：添加事件
- `emit`：执行事件
- `off`：移除事件
- `clear`：清除所有事件

`mitt.js` 不是专门给 `Vue` 服务的，但 `Vue` 可以利用 `mitt.js` 做跨组件通信。

```
npm i mitt 
```



```js
// Bus.js

import mitt from 'mitt'
export default mitt()
```



```js
// Parent.vue

<template>
  <div>
    Mitt
    <Child />
  </div>
</template>

<script setup>
import Child from './Child.vue'
import Bus from './Bus.js'

Bus.on('sayHello', () => console.log('雷猴啊'))
</script>
```



```js
// Child.vue

<template>
  <div>
    Child：<button @click="handleClick">打声招呼</button>
  </div>
</template>

<script setup>
import Bus from './Bus.js'

function handleClick() {
  Bus.emit('sayHello')
}
</script>
```



## Vue3 ts axios 简单封装



### utils/request.ts 内容

```ts
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

const request: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com/',
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  },
);

// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    return response;
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error);
  },
);

export default request;

```



### request 模块化

```ts
// ./api/index.ts

import request from './utils/request.ts';

export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await request.get<ApiResult<T>>(url, { params });
  return response.data;
}

export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await request.post<ApiResult<T>>(url, data);
  return response.data;
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await request.put<ApiResult<T>>(url, data);
  return response.data;
}

export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await request.delete<ApiResult<T>>(url, { params });
  return response.data;
}
```





### 组件调用

```ts
<script setup lang="ts">
import { onMounted } from 'vue';
import { get, post } from '@/api';

onMounted( async()=>{
    const res1 = await get('url')
    const res2 = await post('url',{name:'xioahuang',age:22})
})

</script>
```

