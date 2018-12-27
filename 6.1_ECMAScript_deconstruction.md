#### 解构赋值
ES6允许按照一定模式, 从数组和对象当中提取值, 对变量进行赋值, 这个就叫做解构.
**例1:** &nbsp; let [a, b, c] = [1, 2, 3]<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a = 1, b = 2, c = 3.

**例2:** &nbsp; let { a, b, ...c } = { a:1, c:2, d:2 }<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 此时的 a = 1, b 为 undefined, c 为 { c:2, d:2 }.

**例3:** &nbsp; let { foo: baz } = { foo: 'aaa', baz: 'bbb' }<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 此时的 baz = 'aaa'.

**例4:** &nbsp; let [a] = 1 &nbsp; &nbsp; // 因为左边是数组但是右边不是数组(不可以遍历的结构), 那么将会报错.
