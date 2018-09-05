// 冒泡排序
// 15 35 99 18 75
// 35 12 99 18 75

// 排序 大 -> 小 
// 冒泡 邻居 换位
// 一次将一个数换到它的位置

function bublesSort(arr) {
  let length = arr.length;
  let t = null;
  for(let i = 0; i < length - 1; i++) {
    for(let j = 0; j< length - i - 1; j++) {
      if(arr[j]> arr[j+1]){
        t = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = t;
      }
    }
  }
  return arr;
}
let arr = [15,35,99,18,75];
console.log(bublesSort(arr));
