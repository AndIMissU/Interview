### DOM事件中target和currentTarget的区别
> 1.target: 触发事件的某个具体对象, 只会出现在事件流的目标阶段（谁触发，谁命中，所以肯定是目标阶段）<br>
  2.currentTarget: 绑定事件的对象, 恒等于**this**, 可能出现在事件流的任意一个阶段中<br>
  3.通常情况下target和currentTarget是y一致的, 我们只需要使用target即可。但是有一种情况下必须区分这三者的关系, 就是在父子嵌套的关系中, 父元素绑定了事件, 单击了子元素（根据事件流，在不阻止事件流的前提下他会传递至父元素，导致父元素的事件处理函数执行）这时候currentTarget指向的是父元素，因为他是**绑定事件的对象**，而target指向了子元素，因为他是**触发事件的那个具体对象**

HTML的结构如下：
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
JavaScript的结构如下：
  ```JS
  let father = document.getElementById('father')
  father.addEventListener('click', function(e) {
      console.log(e.target);  // <div id="son"></div>
      console.log(e.currentTarget);  // <div id="father"></div>
  },false);
  ```

### typeof 和 instanceof 区别，instanceof原理