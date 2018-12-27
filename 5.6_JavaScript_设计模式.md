## js 的设计模式

### 单例模式
**单例模式：一个类能返回对象的引用（并且永远是同一个）和一个获得该实例的方法（静态方法，通常使用 getInstance 名称）。当我们调用这个方法时如果该类持有的引用不为空就返回该引用，否则就创建该类的实例，并且将实例引用赋值给该类保持的那个引用再返回。同时将该类的构造函数定义为私有方法，避免其他函数使用构造函数来实例化对象，只通过该类的静态方法来得到该类的唯一实例。**

传统语言实现单例模式
``` JS
  let Singleton = function(name) {
    this.name = name
    this.instance = null
  }
  Singleton.prototype.getName = function() {
    return this.name
  }
  Singleton.getInstance = function(name) {
    // 判断是否存在实例 不存在则创建实例 存在则返回实例对象
    if(!this.instance) {
      this.instance = new Singleton(name)
    }
    return this.instance
  }

  let a = Singleton.getInstance('first_shili')
  let b = Singleton.getInstance('second_shili')
  console.log(a.getName())  // first_shili
  console.log(b.getName())  // first_shili
```