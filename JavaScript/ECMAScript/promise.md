## Promise 必知必会（十道题）
### 题目一
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

### 题目二
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
### 题目三
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
### 题目四
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
### 题目五
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
### 题目六
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
### 题目七
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
### 题目八
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
### 题目九
```JS
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
// result: 1 
// ( .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。)
```
### 题目十
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
### 题目十一
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
