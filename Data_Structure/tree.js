// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

// 二叉树对象
function TreeNode( x ) {
  this.val = x;
  this.left = null;
  this.right = null;
}

let pre = [ 1, 2, 4, 7, 3, 5, 6, 8 ] // 前序遍历
let vin = [ 4, 7, 2, 1, 5, 3, 8, 6 ] // 中序遍历

function reConstructBinaryTree( pre, vin ) {
  const LEFT = 'left'
  const RIGHT = 'right'
  // 定义左子树和右子树
  let newNode = new TreeNode( pre[ 0 ] ) // 根节点
  // 父节点的左边即父节点的左子树
  let leftVin = vin.slice( 0, vin.indexOf( pre[ 0 ] ) )
  let leftPre = pre.slice( 1, leftVin.length + 1 )
  // 父节点的右边即父节点的右子树
  let rightVin = vin.slice( leftVin.length + 1 )
  let rightPre = pre.slice( leftVin.length + 1 )
  // 分别遍历左子树 右子树
  resetNode( newNode, leftPre, leftVin, LEFT )
  resetNode( newNode, rightPre, rightVin, RIGHT )

  /**
   * @param { object } parent 父节点
   * @param { array } pre 左子树
   * @param { array } vin 右子树
   * @param { string } direction 方向
   */
  function resetNode( parent, pre, vin, direction ) {
    // 根节点就是前序遍历的第一个值
    let newNode = new TreeNode( pre[ 0 ] )
    parent[ direction ] = newNode

    let leftVin = vin.slice( 0, vin.indexOf( pre[ 0 ] ) )
    let leftPre = pre.slice( 1, leftVin.length + 1 )
    let rightVin = vin.slice( leftVin.length + 1 )
    let rightPre = pre.slice( leftVin.length + 1 )
    // 若为空 则return
    if ( !leftPre.length && !rightPre.length ) return
    resetNode( newNode, leftPre, leftVin, LEFT )
    resetNode( newNode, rightPre, rightVin, RIGHT )
  }
  return newNode
}

reConstructBinaryTree( pre, vin )