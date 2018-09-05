// const{a,b,...c} ={a:1,d:2,e:3};
// // console.log(a);
// // console.log(b);
// // console.log(c);
// let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// // console.log(baz);
// let obj = {
//   p: [
//     'Hello',
//     { y: 'World' }
//   ]
// };

// let {p, p: [x, { y }] } = obj;
// console.log(x);
// console.log(y);
// console.log(p);

// const node = {
//   loc: {
//     start: {
//       line: 1,
//       column: 5
//     }
//   }
// };

// let { loc, loc: { start }, loc: { start: { line }} } = node;
// // line // 1
// // loc  // Object {start: Object}
// // start // Object {line: 1, column: 5}
// console.log(line);
// console.log(loc);
// console.log(start);
let x;
({x} = {x: 1});
console.log(x);
const [a, b, c, ...d] = 'hello';
console.log(d);