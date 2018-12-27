## 深入React技术栈

### 第1章

1. **可以用ES6 rest/spread 特性提高效率**
```JS
  const data = { name: 'foo', value: 'bar' }
  const component = <Component {...data} />
```
2. **React会将所有要显示到 DOM 的字符串转义, 防止 XSS。 比如 &copy\; (&copy;), 最后的 DOM 不会正常显示。解决办法：**
    - 直接使用 UTF-8 字符 &copy; ;
    - 使用对应字符的 Unicode 编码查询;
    - 使用数组组装\<div>{['cc ', \<span>&copy\;<\/span>, ' 2015']}<\/div>;
    - 直接插入原始的HTML
    - **可以使用React提供的 dangerousSetInnerHTML 属性。最好是在确定必要的情况下可以使用它：\<div dangerousSetInnerHTML={{ _html: 'cc &copy\; 2015' }} \/>**
3. **React组件的组成**<br/>
  在React组件开发当中，常用的方式是将组件拆分到合理的粒度，用组合的方式合成业务组件

### 第2章

1. **React合成事件的实现机制**
    - **事件委派:** React 的事件代理机制并不会把事件处理函数直接绑定到真实的节点上, 而是把所有事件绑定到结构的最外层, 使用一个统一的事件监听器, 这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时, 只是在这个统一的事件监听器上插入或删除一些对象。当时间发生时, 首先被这个统一的事件监听器处理, 然后在映射里找到真正的处理函数并调用。这样做简化了事件处理和回收机制, 效率也有很大提升。
    - **自动绑定:** 在 React 组件中, 每个方法的上下文都会指向该组件的实例, 即自动绑定 this 为当前组件。而且 React 还会对这种引用进行缓存, 以达到 CPU 和内存的最优化。在使用 ES6 classes 或者纯函数的时候, 自动绑定就不复存在了, 所以我们需要手动实现 this 的绑定。
2. MVC: 强制将业务数据（Model）与用户界面（View）隔离, 用控制器（Controller）管理逻辑和用户输入。
    - Model: 负责保存应用数据, 和后端交互同步应用数据, 或校验数据。（与应用内交互状态无关）
    - View: 负责构建和维护 DOM 元素。用户可以与 View 交互, 包括读取和编辑 Model , 在 Model 中获取或设置属性值。（ View 对应用程序中的 Model 和 Controller 的了解是有限的, 更新 Model 的实际任务都是在 Controller 上 ）
    - Controller: 负责连接 View 和 Model, Model 的任何改变会应用到 View 中, View 的操作会通过 Controller 应用到 Model 中。