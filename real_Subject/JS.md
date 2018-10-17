## DOM事件中target和currentTarget的区别
> 1.target: 触发事件的某个具体对象, 只会出现在事件流的目标阶段（谁触发，谁命中，所以肯定是目标阶段）<br>
  2.currentTarget: 绑定事件的对象, 恒等于**this**, 可能出现在事件流的任意一个阶段中<br>
  3.通常情况下target和currentTarget是y一致的, 我们只需要使用target即可。但是有一种情况下必须区分这三者的关系, 就是在父子嵌套的关系中, 父元素绑定了事件, 单击了子元素（根据事件流，在不阻止事件流的前提下他会传递至父元素，导致父元素的事件处理函数执行）这时候currentTarget指向的是父元素，因为他是**绑定事件的对象**，而target指向了子元素，因为他是**触发事件的那个具体对象**

### HTML的结构如下：
  ``` html js
  <div id="father">
   <div id="son"></div>
  </div>
  <style>
    #father {
      width: 300px;
      height: 300px;
      background-color: lightblue;
    }

    #son {
      width: 100px;
      height: 100px;
      background-color: skyblue;
    }
  </style>
  ```
### JavaScript的结构如下：
  ```JS
  let father = document.getElementById('father')
  father.addEventListener('click', function(e) {
      console.log(e.target);  // <div id="son"></div>
      console.log(e.currentTarget);  // <div id="father"></div>
  },false);
  ```
## prototype 和 __proto__ 
1. **__proto__是每个对象都有的一个属性，而prototype是函数才会有的属性!!!**
2. Fun.prototype 为自对象, Fun.prototype.__proto__ 为继承对象, 自对象和继承对象的并集, 构成了新建函数的属性和方法。
  obj(new Fun).__proto__ 实质上等于Fun.prototype <br>
3. **当自对象与继承对象间有相同属性或方法名称时，自对象优先级较高**

## typeof 和 instanceof 区别，instanceof原理
> 1.**typeof** 操作符返回一个字符串，表示未经计算的操作数的类型。后面的括号为可选的。
```JS
  // 第一题
  var y = 1, x = y = typeof x
  x  // undefined

  // 第二题
  (function f(f){
    return typeof f()
  })(function(){ return 1 })   // number

  // 第三题
  var foo = {
    bar: function() { return this.baz },
    baz: 1
  };
  (function(){
    return typeof arguments[0]()
  })(foo.bar)  // undefined

  // 第四题
  var foo = {
    bar: function(){ return this.baz },
    baz: 1
  }
  typeof (f = foo.bar)()  // undefined

  // 第五题
  var f = (function f(){ return "1" }, function g(){ return 2 })()
  typeof f // number

  // 第六题
  var x = 1
  if (function f(){}) {
    x += typeof f;
  }
  x  // 1undefined

  // 第七题
  (function(foo){
    return typeof foo.bar;
  })({ foo: { bar: 1 } });  // undefined

```
> 2.**instanceof** 运算符用来检测 constructor.prototype 是否存在于参数    object 的原型链上。由文字符号创建的变量（比如 a = 'This is a test', 这个 a instanceOf String 的值为false）是没有constructor.prototype 的, 所以都为false （更简单的方法是判断左边的是否为对象 不为对象的话 直接为false）
```JS
  console.log('this is a test' instanceof String)  // false
  console.log(true instanceof Boolean)  // false
  console.log(NaN instanceof Number)  // false
  console.log(1 instanceof Number)  // false
  console.log(undefined instanceof Object)  // false
  console.log(null instanceof Object)  // false
  console.log(String instanceof String)  // false
  console.log(Number instanceof Number)  // false
  console.log(Boolean instanceof Boolean)  // false
  console.log([] instanceof Array)  // true
  console.log({} instanceof Object)  // true
  console.log(function(){} instanceof Function)  // true
  console.log(function(){} instanceof Object)  // true

  var Fun = function(){}
  var Func = function(){}
  var fun = new Fun()
  var func = new Func()
  Fun.prototype = Func.prototype
  console.log(fun instanceof Fun)  // false
  console.log(fun instanceof Func)  // false
  console.log(func instanceof Fun)  // true
```
手写一个 instanceOf 函数: 
``` JS
  function instance_of(a, b) {
    let p = b.prototype // 取b的显式原型
    let _p = a.__proto__ // 取a的隐式原型
    while(true) {
      if(_p == null) return false
      if(p === _p) return true
      _p = _p.__proto__
    }
  } 
```

## JS 动画和 CSS 动画有什么区别？
### CSS 动画

**优点：**<br>
- 1.&nbsp;浏览器可以对动画进行优化<br>
  - (1)&nbsp;浏览器使用与 RequestAnimationFrame 类似的机制, RequestAnimationFrame 比起setTimeout, setInterval设置动画的优势主要是:
    - a.&nbsp;requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成,并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率,一般来说,这个频率为每秒60帧
    - b.&nbsp;在隐藏或不可见的元素中requestAnimationFrame不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。
  - (2)&nbsp;强制使用硬件加速 （通过 GPU 来提高动画性能）
- 2.&nbsp;代码相对简单,性能调优方向固定
- 3.&nbsp;对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码

**缺点：**<br>
- 1.&nbsp;运行过程控制较弱,无法附加事件绑定回调函数。CSS动画只能暂停,不能在动画中寻找一个特定的时间点，不能在半路反转动画，不能变换时间尺度，不能在特定的位置添加回调函数或是绑定回放事件,无进度报告
- 2.&nbsp;代码冗长。想用 CSS 实现稍微复杂一点动画,最后CSS代码都会变得非常笨重。

### JS 动画

**优点：**<br>
- 1.&nbsp;JavaScript动画控制能力很强, 可以在动画播放过程中对动画进行控制：开始、暂停、回放、终止、取消都是可以做到的。
- 2.&nbsp;动画效果比css3动画丰富,有些动画效果，比如曲线运动,冲击闪烁,视差滚动效果，只有JavaScript动画才能完成
- 3.&nbsp;CSS3有兼容性问题，而JS大多时候没有兼容性问题

**缺点：**<br>
- 1.&nbsp;JavaScript在浏览器的主线程中运行，而主线程中还有其它需要运行的JavaScript脚本、样式计算、布局、绘制任务等,对其干扰导致线程可能出现阻塞，从而造成丢帧的情况。
- 2.&nbsp;代码的复杂度高于CSS动画

### 总结
>如果动画只是简单的状态切换，不需要中间过程控制，在这种情况下，css动画是优选方案。它可以让你将动画逻辑放在样式文件里面，而不会让你的页面充斥 Javascript 库。然而如果你在设计很复杂的富客户端界面或者在开发一个有着复杂UI状态的 APP。那么你应该使用js动画，这样你的动画可以保持高效，并且你的工作流也更可控。所以，在实现一些小的交互动效的时候，就多考虑考虑CSS动画。对于一些复杂控制的动画，使用javascript比较可靠。
