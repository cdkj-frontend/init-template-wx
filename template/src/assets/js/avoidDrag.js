export default () => {
  //  首先禁止body
  document.body.ontouchmove = function (e) {
    e.preventDefault()
  }

  //  然后取得触摸点的坐标
  let startY = 0
  // touchstart事件
  function touchSatrtFunc (evt) {
    try {
      // evt.preventDefault() // 阻止触摸时浏览器的缩放、滚动条滚动等
      let touch = evt.touches[0] // 获取第一个触点
      let y = Number(touch.pageY) // 页面触点Y坐标
      // 记录触点初始位置
      startY = y
    } catch (e) {
      alert('touchSatrtFunc：' + e.message)
    }
  }
  document.addEventListener('touchstart', touchSatrtFunc, false)

  //  然后对允许滚动的条件进行判断，这里将滚动的元素指向body
  let _body = document.body
  _body.ontouchmove = function (ev) {
    let _point = ev.touches[0]
    let _top = _body.scrollTop
    //  什么时候到底部
    let _bottomFaVal = _body.scrollHeight - _body.offsetHeight
    //  到达顶端
    if (_top === 0) {
      //  阻止向下滑动
      if (_point.clientY > startY) {
        ev.preventDefault()
      } else if (_top === _bottomFaVal) {
        ev.preventDefault()
      } else {
        //  阻止冒泡
        //  正常执行
        ev.stopPropagation()
      }
    } else if (_top === _bottomFaVal) {
      //  到达底部时阻止向上滑动
      if (_point.clientY < startY) {
        ev.preventDefault()
      } else {
        //  阻止冒泡
        //  正常执行
        ev.stopPropagation()
      }
    } else if (_top > 0 && _top < _bottomFaVal) {
      ev.stopPropagation()
    } else {
      ev.preventDefault()
    }
  }
}
