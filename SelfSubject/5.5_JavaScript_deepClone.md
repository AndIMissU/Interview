## JavaScript 深浅拷贝
- 浅拷贝：复制引用的拷贝方法称之为浅拷贝。
- 深拷贝：指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。
### 1. 浅拷贝的实现
遍历对象， 把属性和属性值都放入新的对象就好了
  ``` JavaScript
  /**
   * obj为对象
   */
  let shallowClone = function(obj) {
    if (typeof obj !== 'object') return  // 不为对象或数组则返回
    let newObj = obj instanceof Array ? [] : {}  // 根据要拷贝的obj的类型 创建对应的类型
    for (key in obj) {
      obj.hasOwnProperty(key) && (newObj[key] = obj[key])  // 如果是自身的属性 就赋值给
    }
    return newObj
  }
  ```
### 2. 深拷贝的实现
在拷贝的时候判断一下属性值的类型，如果是对象，递归调用深拷贝函数
  ``` JavaScript
  let deepClone = function(obj) {
    if (typeof obj !== 'object') return
    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断要赋值的值 若为对象或数组则调用深拷贝函数继续拷贝
        newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
      }
    }
    return newObj
  }
  ```
### 3. 数组的浅拷贝
**(1) concat 方法**
  ``` JavaScript
  let arr = [1, 2, 3, 4]
  let concatArr = arr.concat()
  concatArr.push(5)
  console.log(concatArr)  //  [1, 2, 3, 4, 5]
  console.log(arr)  // [1, 2, 3, 4]
  ```
  **(2) slice 方法**
  ``` JavaScript
  let arr = [1, 2, 3, 4]
  let sliceArr = arr.slice()
  sliceArr.push(5)
  console.log(sliceArr)  //  [1, 2, 3, 4, 5]
  console.log(arr)  // [1, 2, 3, 4]
  ```
  ### 4. 数组的深拷贝
  利用JSON.parse() 和 JSON.stringify() 转换，数组和对象都可适用，但是要注意一点: 这种拷贝方式不能拷贝函数
  ``` JavaScript
  let arr = [1, 2, 3, { a: 1 }]
  let newArr = JSON.parse(JSON.stringify(arr))
  newArr[3].a = 2
  console.log(arr)  // [ 1, 2, 3, { a: 1 } ]
  console.log(newArr) // [ 1, 2, 3, { a: 2 } ]
  ```