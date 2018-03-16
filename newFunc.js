// 原型链
// new2 接收一个函数
function new2(func) {
  let o = Object.create(func.prototype);
  // 解决了浅拷贝的问题  私有的__proto__属性指向
  let k = func.call(o);  //执行函数
  return typeof k === 'object' ? k : o;
  return o;
  // 1 将我们的func 构造函数执行
  // 2  Obj 我们的原型链对象为func
  // 3  我们还需要返回一个Object
}
function M() {
  this.name = 'fenfen';
}
M.prototype = {

}
let m = new2(M);
console.log(m instanceof M);
console.log(m instanceof Object);
// 私有属性
console.log(m.__proto__ instanceof Object);
console.log(m.__proto__.constructor === M.prototype);
// let m = new M();