// 商品列表
var productlist = [
  {
    img: './img/orange.jpg',
    name: "[天猫超市]南非葡萄柚6个250g以上/个",
    price: 29.90,
    startnum: 1,
    max: 5,
    totalprice: 29.90,
    weight: 1.5
  },
  {
    img: './img/apple.jpg',
    name: "[天猫超市]陕西红富士2.5kg果径80mm以上",
    price: 29.90,
    startnum: 1,
    max: 5,
    totalprice: 29.90,
    weight: 2.5
  },
  {
    img: './img/mango.jpg',
    name: "[天猫超市]海南小台农芒果2kg",
    price: 25.80,
    startnum: 1,
    max: 5,
    totalprice: 25.80,
    weight: 2
  }
]
// 购物车对象
var cartList = [];

// 添加商品进购物车
function addCart(val) {
  cartList.push(val);
  update();
}

// 将购物车中商品清空
function removeAll() {
  cartList = [];
  update();
}

// 添加所有商品
function addAll() {
  removeAll();
  for(var i = 0; i < productlist.length; i++) {
    cartList.push(i);
  }
  update();
}

// 判断商品是否在购物车中 在的话 返回所在的位置  不在返回-1
function getCartIndex(val) {
  for(var i = 0; i < cartList.length; i++) {
    console.log(cartList[i] + "  " + val + "  ");
    console.log(cartList[i] == val)
    if(cartList[i] == val) return i;
  }
  return -1;
}

// 将购物车中的商品移除
function removeCart(val) {
  console.log("移除" + val)
  var index = getCartIndex(val);
  console.log(index)
  if(index > -1)
    cartList.splice(index,1);
  update();
}

// 查看结账车是否已将该商品加入
function findCart(val) {
  for(var i = 0; i < cartList.length; i++) {
    if(cartList[i] == val) return true;
  }
  return false;
}

// 店铺里面商品的全部选择与 全部不选择
var productItem = document.getElementById('product-item-select');
productItem.addEventListener('click', function() {
  var productItems = document.getElementsByClassName('body-item-product-item-choose');
  if(productItem.checked == true){  // 判断全选按钮是否checked
    // 店铺商品全部选择
    for( var i = 0 ; i< productItems.length ; i++) {
      if(!productItems[i].checked){
        productItems[i].checked = true;
      }
    }
    addAll();
  } else {
    // 店铺商品全部取消
    for( var i = 0 ; i< productItems.length ; i++) {
      if(productItems[i].checked){
        productItems[i].checked = false;
      }
    }
    removeAll();
  }
});

// 所有商品的全部选择和全部不选择
// 顶部的全选
var allSelect = document.getElementById('selectallthing');
allSelect.addEventListener('click', function() {
  var allcheckbox = document.body.querySelectorAll("input[type='checkbox']");
  if(allSelect.checked == true){
    // 所有商品全部选择
    for( var i = 0 ; i< allcheckbox.length ; i++) {
      if(!allcheckbox[i].checked){
        allcheckbox[i].checked = true;
      }
    }
    addAll();
  } else {
    // 所有商品全部取消选择
    for( var i = 0 ; i< allcheckbox.length ; i++) {
      if(allcheckbox[i].checked){
        allcheckbox[i].checked = false;
      }
    }
    removeAll();
  }
});
// 底部的全选 和顶部的一样的功能 所以调用顶部全选的函数
var footerselect = document.getElementById('selectall');
footerselect.addEventListener('click', function() {
  allSelect.click();
})



// 遍历产品列表 添加到html里面
var product = document.getElementById('product-item');
var html = product.getElementsByClassName("body-item-productlist")[0].cloneNode(true);

product.innerHTML = "";
for(var i=0; i < productlist.length; i++) {
  var item = html.cloneNode(true);
  updateItems(item,i);
  item.setAttribute("class",item.getAttribute("class") + " id" + i);
  item.getElementsByTagName('input')[0].addEventListener('click', function() {
    var index = this.getAttribute('i');
    if(!this.checked){
      console.log("取消商品")
      //取消商品，将其从付款列表中移除
      if(findCart(index)) {
        removeCart(index);
      }
      // 店铺商品的全选取消
      if(productItem.checked) {
        productItem.checked = false;
      }
      // 所有商品的全选取消
      if(allSelect.checked) {
        allCheck(false);
      }
    } else {
      // 选中商品  加入购物车
      if(!findCart(index)) {
        addCart(index);
      }
      if(cartList.length == productlist.length) {
        console.log("全选")
        allSelect.click();
      }
    }
  });
  product.appendChild(item);
}

// 删除购物车中一类商品
function remove(obj) {
  //获取父节点，该节点是最外层的节点
  var ul = obj.parentNode.parentNode.parentNode.parentNode;
  var i = ul.querySelectorAll("input[type='checkbox']")[0].getAttribute('i')
  removeCart(i);
  product.removeChild(ul);
}

// 根据已经选中的购物车来批量删除
function batchRemove() {
  var childrens = product.getElementsByClassName("body-item-productlist");
  var nodes = [];
    for(var i = 0; i < cartList.length; i++) {
      nodes.push(childrens[cartList[i]])
  }
  for(var l = 0; l < nodes.length; l++) {
    product.removeChild(nodes[l])
  }
  removeAll();
}

// 判断所有商品的选中情况
function allCheck(isChecked) {
  var checks = document.getElementsByClassName("select-all");
  for(var i = 0; i < checks.length; i++ ) {
    checks[i].checked = isChecked;
  }
}

// 添加商品的数量
function addnum(eve) {
  var temp = eve.getAttribute("i");
  if(productlist[temp].startnum >= productlist[temp].max){
    alert('商品限购'+productlist[temp].max+"件");
  } else {
    productlist[temp].startnum += 1;
    productlist[temp].totalprice = Number((productlist[temp].totalprice + productlist[temp].price).toFixed(2));
    var item = product.getElementsByClassName("id" + temp)[0];
    updateItems(item,temp);
    update()
  }
}

// 减少商品的数量
function minusnum(eve) {
  var temp = eve.getAttribute("i");
  if(productlist[temp].startnum <= 1){
    alert('商品最少购买'+productlist[temp].startnum+"件");
  } else {
    productlist[temp].startnum -= 1;
    productlist[temp].totalprice = Number((productlist[temp].totalprice - productlist[temp].price).toFixed(2));
    var item = product.getElementsByClassName("id" + temp)[0];
    updateItems(item,temp);
    update();
  }
}

// 更新页面
function updateItems(item,num) {
  item.getElementsByClassName('body-item-product-item-img')[0].setAttribute('src',productlist[num].img);
  item.getElementsByClassName('body-item-product-item-name')[0].innerHTML = productlist[num].name;
  item.getElementsByClassName('body-item-product-price')[0].innerHTML = "¥"+productlist[num].price;
  item.getElementsByClassName('body-item-product-numinfo-max')[0].innerHTML = "限购 "+ productlist[num].max + " 件";
  item.getElementsByClassName('body-item-product-num')[0].innerHTML = productlist[num].startnum;
  item.getElementsByClassName('body-item-product-totalinfo-price')[0].innerHTML = "¥"+productlist[num].totalprice;
  item.getElementsByClassName('body-item-product-totalinfo-weight')[0].innerHTML = "("+productlist[num].weight + "kg)";
  item.getElementsByClassName('addtotalnum')[0].setAttribute('i',num);
  item.getElementsByClassName('minustotalnum')[0].setAttribute('i',num);
  item.getElementsByTagName('input')[0].setAttribute('i',num);
}

// 购物车的价格和商品数量
function update(){
  console.log(cartList)
  var realtotalnum = document.getElementsByClassName('footer-num')[0];
  var realtotalprice = document.getElementsByClassName('footer-total-price-num')[0];
  var totalNum = 0;
  var totalPrice = 0;
  for(var i = 0; i < cartList.length; i++) {
    totalPrice = Number((totalPrice + productlist[cartList[i]].totalprice).toFixed(2))
    totalNum += productlist[cartList[i]].startnum;
  }
  realtotalnum.innerHTML = totalNum;
  realtotalprice.innerHTML = totalPrice;
}



