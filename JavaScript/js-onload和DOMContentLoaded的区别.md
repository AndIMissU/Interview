## DOMContentLoaded 与 onload 的区别及使用？

### 一、何时触发这两个事件？
  1. 当 onload 事件触发时，页面上所有的DOM、样式表、脚本、图片、flash都加载完成了。
  2. 当 DOMContentLoaded 事件触发时，仅当 DOM 加载完成，不包括样式表、图片、flash。

### 二、为什么要区分？
  假如某个元素还未加载到页面上，绑定事件已经执行完毕，是没有效果的。这两个事件就是为了避免这样的情况而存在的。将绑定的函数放在这两个事件中能够保证页面在元素加载完毕后再绑定相应的函数。

  DOMContentLoaded 事件更合理，因为我们可以容忍图片、样式加载延迟但是不能容忍页面加载完毕后页面不可交互。

### 三、如何让页面的函数绑定在页面加载之后执行？

  - 1.将脚本和样式都以外链形式引入。因为加载样式表会阻塞外链脚本的执行
  - 2.各大框架实现 DOMReady 方式：（早起的浏览器版本没有DOMContentLoaded事件）
    - 1）如果是webkit引擎则轮询document的readyState属性，当值为loaded或者complete时则触发DOMContentLoaded事件，对webkit525之后版本直接可以注册DOMContentLoaded事件
      ```JS
      if(Browser.Engine.webkit){  
          timer = window.setInterval(function(){
      　　if(/loaded|complete/.test(document.readyState))  
            fireContentLoadedEvent();
      　　},0);
      }
      ```
    - 2）

    