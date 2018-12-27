/**
 * 冒泡排序
 * @param { array } arr
 */
function bubbleSort(arr) {
  let temp
  let len = arr.length
  while (len) {
    for (let i = 0; i < len-1; i++){
      if(arr[i]>arr[i+1]) {
        temp = arr[i]
        arr[i] = arr[i+1]
        arr[i+1] = temp
      }
    }
    len--
  }
  return arr
}

/**
 * 快速排序
 * @param { array } arr
 */
function quickSort(arr) {
  let len = arr.length
  if (len <= 1) return arr
  let left = []
  let right = []
  let temp = [arr[0]]
  for(let i = 1; i < len; i++) {
    if(arr[i] < temp[0]) {
      left.push(arr[i])
    }
    else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(temp.concat(quickSort(right)))
}

/**
 * 选择排序
 * @param { array } arr 
 */
function selectionSort(arr) {
  let temp
  let min
  for(let i = 0, len = arr.length; i < len - 1; i++) {
    min = i
    for(let j = i+1; j < len; j++) {
      if (arr[j] < arr[min]) min = j
    }
    temp = arr[i]
    arr[i] = arr[min]
    arr[min] = temp
  }
  return arr
}

/**
 * 直接插入排序
 * @param { array } arr 
 */
function insertSort(arr) {
  let j, temp
  for(let i = 1, len = arr.length; i < len; i++) {
    j = i-1
    while(j) {
      if(arr[j+1]<arr[j]) {
        temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
      else break
      j--
    }
  }
  return arr
}

/**
 * 二分插入排序
 * @param { array } arr 
 */
function binaryInsertSort(arr) {
  let j, temp, mid
  let left, right
  for (let i = 2, len = arr.length; i < len; i++) {

  }
  return arr
}
let arr = [1,88,3,2,4,8,7, '1', 'a', 'b', 'c']
console.log(insertSort(arr))

