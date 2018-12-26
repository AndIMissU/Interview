## React生命周期

### 一、React生命周期执行顺序
  - 初始化：
    - constructor()
    - componentWillMount()
    - render()
    - componentDidMount
  - 更新：
    - componentWillReceiveProps()
    - shouldComponentUpdate(nextProps)
    - componentWillUpdate()
    - render()
    - componentDidUpdate()
  - 销毁：
    - componentWillUnmount()

### 二、生命周期详解
  - **1. constructor()**：初始化 state 和 获取 props 时调用
  - **2. componentWillMount()**：组件初始化时调用，后期组件更新不会调用，整个生命周期只调用一次，此时是 render 方法之前修改 State 的最后一次机会。
  - **3. render()**：创建虚拟 DOM，进行 diff 算法，更新 DOM 树，都在这个方法里面执行。对于组件来说它是唯一一个必须的方法。
  - **4. componentDidMount**：组件渲染之后调用，一般某些 DOM 元素需要绑定一些默认事件，都在此方法中执行。此方法只调用一次。
  - **5. componentWillReceiveProps()**：组件初始化时不用，组件更新 props 数据的时候调用。
  - **6. shouldComponentUpdate(nextProps)**：React性能优化非常重要的一环。组件接收新的 props 或者 state 时调用。我们可以在此对比前后两个 props 或者 state 是否相同，如果相同则返回 false 阻止更新。因为相同的属性结构会生成相同的 DOM 树，这样就不需要创建新的 DOM 树和旧的 DOM 树进行 diff 算法对比，节省大量性能，尤其是在 dom 结构复杂的时候。
  - **7. componentWillUpdate()**：组件初始化的时候不调用，只有组件更新时才调用。
  - **8. render()**：数据更新后的渲染。
  - **9. componentDidUpdate()**：组件初始化时不调用，组件更新时调用，此时可以修改 state。
  - **10. componentWillUnmount()**：组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

### 三、使用注意项
  - **1.** shouldComponentUpdate 在使用时能节省很大的性能消耗。但是假如消耗时间本来就不大，比如100ms，就没有必要使用 该方法了。
  - **2.** 一般在 componentDidMount 和 componentDidUpdate 这两个方法中能真正能获取到 DOM 元素。
  - **3.** 如果 shouldComponentUpdate 返回 false 则不会调用 render 方法。
  - **4.** shouldComponentUpdate 并不能完全避免更新。它不能阻止子组件的重新渲染