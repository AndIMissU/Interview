## Redux

### 1. 先看 **Redux** 流程
  - 首先声明一个修改 state 的方法reducer，reducer方法接收两个参数，一个是 state 对象，一个是操作对象action。reducer 通过 action 的类型进行不同操作后返回新的对象（对象是在原来对象的基础上复制的，然后再进行相应的操作，再返回新对象）
  - 将该 reducer 传给 'redux' 中的 createStore()，createStore() 返回一个包含 state 的对象 store。
  - 页面可以根据 store 对象的值渲染相应的数据
  - 如需修改store，可以通过 store.dispatch('type', action对象) （action对象包含 reducer 所需要的参数，以及对 store 对象的操作类型）来对 store 对象进行修改。
  - dispatch 给对应的 reducer，reducer 返回新的对象，store 拿到新的对象就相当于更新了 store 了。


### 2. 再详细了解相应的方法
#### （1）createStore() 方法：（redux 的方法）
  - 【参数】：
    - reducer (Function): 接收两个参数，一个是当前的 state 对象和要处理的 action，返回一个新的 state 对象。
    - [preloadedState]: 初始的 state (结构得与 reducer 的 state 对象的结构一致)
    - enhancer (Function): 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator
  
  - 【返回值】 Store：一个保存了所有 state 的对象
#### （2）dispatch() 方法：（dispatch方法是Store带的方法）
  - 【参数】：action 对象，action 需要有 type 来表示它的类型，其他值和结构都由自己决定
  - 【返回值】：要dispatch 的 action

### 3. 使用 Redux 需要注意的地方
  1. 如果使用多个 reducer，不应创建多个 store 来对应不同的 reducer，可以通过 combineReducers() （是redux的一个方法）将所有 reducers 合并成一个 reducer 再创建 store。
  2. reducer 中的 state 应自定义一个初始对象，以防 createStore 未传入 preloadedState而出现错误。
  3. action 的结构要和 reducer 中的 state 对象的结构一致。
  4. 传给 createStore 的初始 preloadedState 对象的结构要和 reducer 中的 state 对象的结构一致。
  5. 如果 dispatch 传入的第一个参数为 undefined 时，reducer 应该在初始的 state 上进行操作。
  6. store 里面的 state 和 constructor 里面的 state 不一样。

### 4. 最后看一个简易的例子
```JS
  import { createStore } from 'redux'

  let nextGoodId = 0

  function carts(state = [], action) {
    switch (action.type) {
      case 'ADD_IN_CART':
        // return state.concat([action.text])
        return (
          [
            ...state,
            {
              id: nextGoodId++,
              name: action.name
            }
          ]
        )
      default:
        return state
    }
  }

  let store = createStore(carts, ['Apple'])

  store.dispatch({
    type: 'ADD_IN_CART',
    name: 'Banana'
  })

  console.log(store.getState())
  // [ 'Apple', 'Banana' ]
```

### 5. VUEX 和 Redux 的区别
  - Redux
    - 核心对象：store
    -  数据存储：state
    - 状态更新提交接口：**dispatch**
    - 状态更新提交参数：带 type 和 payload 的 **Action**
    - 状态更新计算：**reducer**
    - 限制：reducer 必须是纯函数，不支持异步
    - 特性：支持中间件
  - VUEX
    - 核心对象：store
    - 数据存储：state
    - 状态更新提交接口：**commit**
    - 状态更新提交参数：带 type 和 payload 的 mutation **提交对象/参数**
    - 状态更新计算：**mutation handler**
    - 限制：mutation handler必须是非异步方法
    - 特性：支持带缓存的 getter，用于获取 state 经过某些计算后的值

#### Redux vs VUEX 对比分析
  store 和 state 是最基本的概念，VUEX 没有做出改变。其实VUEX对整个框架思想并没有任何改变，只是某些内容变化了名称或者叫法，通过改名，以图在一些细节概念上有所区分。
  - **VUEX 弱化了 dispatch 的存在感**。VUEX 认为状态变更的触发是一次“提交”而已，而调用方式则是框架提供一个提交的 commit API 接口。
  - **VUEX 取消了 Redux 中 Action 的概念**。不同于 Redux 认为状态变更必须是由一次"行为"触发，VUEX 仅仅认为在任何时候触发状态变化只需要进行 mutation 即可。Redux 的 Action 必须是一个对象，而 VUEX 认为只要传递必要的参数即可，形式不做要求。
  - **VUEX 也弱化了 Redux 中的 reducer 的概念**。reducer 在计算机领域语义应该是"规约"，在这里意思应该是根据旧的 state 和 Action 的传入参数，"规约"出新的 state。在 VUEX 中，对应的是 mutation，即"转变"，只是根据入参对旧 state 进行"转变"而已。

  总的来说，VUEX 通过弱化概念，在任何东西都没做实质性削减的基础上，使得整套框架更易于理解了。

  另外 VUEX 支持 getter，运行中是带缓存的，算是对提升性能方面做了些优化工作。


<!-- 再看看 **React-Redux 基础流程**：
  - 从 `index.js` 文件开始，此文件先引入了 `reducers` 文件内的 `reducer`(这个reducer就是改变对象的一些方法的集合)，再将这个 `reducer` 传给 redux 的一个 API，叫做 `createStore()`。该方法接收 `reducer` 后返回一个保存了应用所有 `state` 的对象，我们将这个对象赋值给 `store`。再将这个 `store` 对象通过 'react-redux' 中的 &lt;Provider> 传给需要此对象的组件中（将组件包在 &lt;Provider> 中）(这样做的目的是为了让所有组件都在Provider操控下，都能获得 Redux 的数据)。
  - 组件从 `props` 内获取父组件所传过来 `store` 对象，将对象中的变量值显示到页面中。如果子组件需要用到 `store`，则需要用 'react-redux' 中的 `connect` 包装一下该组件。如果要改变 `store` 的值，需要从 `action` 内引入对应的 `action`（一些改变值的方法名）。再通过 `store.dispatch(action名称)`来调用对应的 `reducer` 内部的方法。
  - `reduce` 内部接收到方法之后复制原有的对象，再在新复制的对象上进行增加、修改等操作，最后返回新的对象更新 `store` 内部的对象，最后引起页面的值发生变化。 -->
