/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的两个整数。
 * @param {number[]} nums [2, 7, 11, 15]
 * @param {number} target 9
 * @return {number[]} [0, 1]
 */
var twoSum = function(nums, target) {
  let res = []
  for(let i = 0; i < nums.length; i++) {
    for(let j = i+1; j < nums.length; j++) {
      if(nums[i]+nums[j] === target) {
        res.push(i)
        res.push(j)
        return res
      }
    }
  }
};

/**
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * @param {number} x 123
 * @return {number} 321
 */
var reverse = function(x) {
  let arr = x.toString().split('')
  let res = 0
  arr.reverse()
  res = Number(arr.join(''))
  if(arr[arr.length-1] === '-'){
    arr.pop()
    res = 0 - Number(arr.join(''))
  }
  if (res > 2147483647 || res < -2147483648) return 0
  return res
};
