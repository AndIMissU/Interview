/**
 * 写一个通用的事件监听器函数
 */

let EventUtil = {
  /**
   * 根据情况分别使用dom2 || IE || dom0方式 来添加事件
   * @param { Object } element 元素对象
   * @param { String } type 事件类型
   * @param { Function } handler 方法
   */
  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent('on'+type, handler)
    } else {
      element['on'+type] = handler
    }
  },

  //根据情况分别获取DOM或者IE中的事件对象，事件目标，阻止事件的默认行为
  getEvent: function(event) {
    return event ? event : window.event
  },
  getTarget: function(event) {
    return event.target || event.srcElement
  },
  preventDefault: function(event) {
    if(event.preventDefault) event.preventDefault()
    else event.returnValue = false
  },

  //根据情况分别取消DOM或者IE中事件冒泡
  stopPropagation: function(event) {
    if(event.stopPropagation) event.stopPropagation()
    else event.cancelBubble = true
  },

  /**
   * 根据情况分别使用dom2 || IE || dom0方式 来删除事件
   * @param { Object } element 元素对象
   * @param { String } type 事件类型
   * @param { Function } handler 方法
   */
  removeHandler: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
      element.detachEvent('on'+type, handler)
    } else {
      element['on'+type] = null
    }
  }
}

let btn = document.getElementById('btn')
let handler = function() {
  alert('clicked')
}
EventUtil.addHandler(btn, 'click', handler)   //添加监听事件
EventUtil.removeHandler(btn, 'click', handler)   //移除监听事件