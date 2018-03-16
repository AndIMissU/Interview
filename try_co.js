// co 顺序执行异步，自动化方案
// 生成器函数  也是将异步执行转成同步执行
// generator

// 还有一个 async函数

function* fn(a) {
  // 生成器函数内部可以去设置一些异步操作  目的是为了 同步运行
  // yield  函数在执行过程中 遇到它就会停下来 
  a = yield a;
  let b = yield 2;
  let c = yield 3;
  return a+b+c;
}

// 第一个是一个将多个任务结合在一起的生成器函数
function co(fn, ...args) {
  // fn() 只有执行了  才能进行迭代
  // next() 才能往下走
  // console.log(args);
  // 他的返回值有 true和false  会有结束的那一刻 就是 resolve的那一刻  所以我们需要使用递归
  let g = fn(...args);
  return new Promise((resolve, reject) => {
    function next(lastValue) {
      // next 参数可以参与yield后面的计算
      let {value, done } = g.next(lastValue);
      if(done) {
        resolve(value);
      } else {
        next(value);
      }
    }
    next();
  });
} 
    // /|\
    //  |
// 由下面可以看出 我们的co需要返回一个promise 是一个带着resolve的promise
co(fn, 100)
  .then(value => {
    console.log(value);
  });
// 生成器函数会生成一个迭代器  迭代器手动完成异步
// let g = fn();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());

// 每次输出都会是下面这种结构：  {value:?, done: false}
