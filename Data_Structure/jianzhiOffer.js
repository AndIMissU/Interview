/**
 * 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
 */
function Fibonacci(n) {
  let n1 = 0
  let n2 = 1
  let sum = 1
  for (let i = 2; i <= n; i++) {
    sum = n1 + n2
    n1 = n2
    n2 = sum
  }
  return n === 0 ? 0:sum
}

/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 */
function jumpFloor(number) {
  let n1 = 1
  let n2 = 2
  let sum = n1 + n2
  for (let i = 2; i < number; i++) {
    sum = n1 + n2
    n1 = n2
    n2 = sum
  }
  return (number===1||number===2 || number === 0) ? number : sum
}

/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
 */
function jumpFloorII(number) {
  return Math.pow(2, number - 1)
}

/**
 * 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
 */
function rectCover(number) {
  if (number < 3) return number
  let n1 = 1
  let n2 = 2
  let sum = n1 + n2
  for (let i = 3; i <= number; i++) {
    sum = n1 + n2
    n1 = n2
    n2 = sum
  }
  return sum
}

/**
 * 求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
 */
function Sum_Solution(n) {
  let a = Array(n).fill(1)
  if (n === 1 ) return a.length
  let t = Array(Sum_Solution(n-1)).fill(1)
  t = t.concat(Array(n).fill(1))
  return t.length
}

/**
 * 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。
 */
function Add(num1, num2)
{
  let arr1 = Array(Math.abs(num1)).fill(1)
  let arr2 = Array(Math.abs(num2)).fill(1)
  let f = ''
  if (num1< 0) f = num1.toString().slice(0,1)
  if( num2 < 0) f = num2.toString().slice(0,1)
  
  if (num1 < 0) {
    if (num2 < 0) {
      arr1 = arr1.concat(arr2).length.toString().split('')
      arr1.unshift(f)
    }
    else {
      if (arr1.length > arr2.length){
        arr1.splice(0, arr2.length)
        arr1 = arr1.length.toString().split('')
        arr1.unshift(f)
      }
      else {
        arr2.splice(0, arr1.length)
        arr2 = arr2.length.toString().split('')
      }
    }
  }
  else {
    if (num2 > 0) arr2 = arr1.concat(arr2).length.toString().split('')
    else {
      if (arr1.length < arr2.length) {
        arr2.splice(0,arr1.length)
        arr2 = arr2.length.toString().split('')
        arr2.unshift(f)
      }
      else {
        arr1.splice(0, arr2.length)
        arr1 = arr1.length.toString().split('')
      }
    }
  }
  return Number(arr1.length === Math.abs(num1) ? arr2.join(''):arr1.join(''))
}

/**
 * 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。
 */
function Power(base, exponent) {
  return Math.pow(base, exponent)
}

/**
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 
 * 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 
 * NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
 */
function minNumberInRotateArray(rotateArray) {
  return rotateArray.sort((a,b)=>{ return a-b })[0]
}

/**
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，
 * 所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。
 */
function reOrderArray(array) {
  let temp, n = 0
  for (let i = 0, len = array.length; i < len; i++) {
    if (array[i]%2 !== 0) {
      temp = array[i]
      array.splice(i,1)
      array.unshift(temp)
      n++
    }
  }
  return array.slice(0,n).reverse().concat(array.slice(n,array.length))
}

/**
 * 输入一个链表，输出该链表中倒数第k个结点。
 * 未完成！！！！！
 */
function ListNode(x) {
  this.val = x;
  this.next = null;
}
function FindKthToTail(head, k) {
  let arr = []
  while(head) {
    arr.push(this.val)
    head = this.next
  }
  return arr.reverse()[k-1]
}

/**
 * 牛客最近来了一个新员工Fish，每天早晨总是会拿着一本英文杂志，写些句子在本子上。
 * 同事Cat对Fish写的内容颇感兴趣，有一天他向Fish借来翻看，但却读不懂它的意思。
 * 例如，“student. a am I”。后来才意识到，这家伙原来把句子单词的顺序翻转了，正确的句子应该是“I am a student.”。
 * Cat对一一的翻转这些单词顺序可不在行，你能帮助他么？
 */
function ReverseSentence(str) {
  return str.split(' ').reverse().join(' ')
}

/**
 * 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
 * 例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。
 * s是字符串
 */
function isNumeric(s) {
  return !isNaN(Number(s))
}