/**
 * 合并 传进来的数组
 */
function arrayMerge() {
  let arr = []
  for (let i = 0,len = arguments.length; i <len; i++) {
    arr = arr.concat(arguments[i])
  }
  return arr
}