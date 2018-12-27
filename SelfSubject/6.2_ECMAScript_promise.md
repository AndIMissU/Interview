## Promise 知识点
### 一、Promise 缺点：
  1. 无法取消 Promise，一旦新建立它就会立即执行，无法中途取消；
  2. 如果不设置回调函数，Promise 内部抛出来的错误，不会反应到外部；
  3. 当处于 pending 状态，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 二、需要注意的地方：
  1. Promise.catch() 方法能捕获到 Promise.then() 后面的任何一步的 .then() 方法出现的错误。所以建议用 .catch() 代替在 .then() 内部写reject的回调函数。
  2. Promise 的状态一旦改变就会一直保持该状态，不会再改变了。如果在 Promise resolve之后再抛出错误，该错误不会被捕获，等于没有抛出。
  3. Promise 内部的错误不会影响外部。所以建议一般的 Promise 都带上 .catch() 方法来捕获错误。假如 .catch() 出现错误则应该在 .catch() 后面再捕获一次。

### 三、Promise 的一些需要注意的方法
#### (一)、Promise.resolve() 方法：将现有的对象转化为 Promise 对象
  1. 参数是一个 Promise 实例：Promise.resolve 将不做任何修改、原封不动地返回这个实例。
  2. 参数是一个 thenable 对象（thenable 对象指的是具有 then 的对象）：Promise.resolve() 方法会将这个对象的转换为 Promise 对象，然后立即执行 thenable 对象的 then 方法。
  3. 参数不是具有 then 的对象或者根本不是对象：Promise.resolve 方法返回一个新的 Promise 对象，状态为 resolved。
  4. 不带有任何参数：直接返回一个 resolved 的 Promise 对象。<br/>
  **注意：** Promise.resolve 是在本轮“事件循环”（event loop）的结束时执行（SetTimeout(()=>{}, 0) 是在下一轮“事件循环”开始时执行）
#### (二)、Promise.reject() 方法：返回一个新的 Promise 实例，该实例的状态为rejected
#### (三)、Promise.try() 方法：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它，可以直接使用此方法。


### 四、Promise 必知必会（题目）
#### (一)、题目如下
```JS
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)

// result: 1 2 4 3
```

#### (二)、题目如下
```JS
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
// result:  <> 代表状态
// promise1 ,Prmoise { <penidng> }
// promise2 ,Prmoise { <penidng> }
// promise1 ,Prmoise { 'success' }
// promise2 ,Prmoise { <rejected> Error: error!!! }
```
#### (三)、题目如下
```JS
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
// result: 
// then: success1
```
#### (四)、题目如下
```JS
Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })
// result: 1 2
```
#### (五)、题目如下
```JS
Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return Promise.reject(2)
  })
  .catch((err) => {
    console.log(err)
    return 3
  })
  .then((res) => {
    console.log(res)
  })
// result: 1 2 3
```
#### (六)、题目如下
```JS
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})
// result: once
//         success 1006
//         success 1007 (比上面的久一点 promise已经是一个 fulfilled的对象了 第二次执行 不会再执行resolve前面的console了）
```
#### (七)、题目如下
```JS
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
// result: 'then: Error: error!!!' 
// ( 周超说 这里的return 直接 返回一个字符串 并不会管内部的是 resolve还是reject 所以不会执行 catch
// 我说 如果里面是throw 走的应该就是catch了 )
```
#### (八)、题目如下
```JS
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)
// ( .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环 )
// result: TypeError: Chaining cycle detected for promise #<Promise>
//         at <anonymous>
//         at process._tickCallback (internal/process/next_tick.js:188:7)
//         at Function.Module.runMain (module.js:667:11)
//         at startup (bootstrap_node.js:187:16)
//         at bootstrap_node.js:607:3
```
#### (九)、题目如下
```JS
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
// result: 1 
// ( .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。)
```
#### (十)、题目如下
```JS
Promise.resolve()
  .then(function success (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .catch(function fail2 (e) {
    console.error('fail2: ', e)
  })
// result: fail2:  Error: error
//         ...
```
#### (十一)、题目如下
```JS
process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')
// result: end nextTick then setImmediate
```
