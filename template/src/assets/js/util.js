/**
 *  [工具js，通过vue.use引入，在组件内部通过this.*的方式引用]
 *  @Author   tj
 *  @DateTime 2017-12-29
 */
exports.install = (Vue) => {
  // 修改spa的页面标题
  Vue.prototype.setDocumentTitle = (title) => {
    setTimeout(() => {
      // 利用iframe的onload事件刷新页面
      document.title = title
      var iframe = document.createElement('iframe')
      iframe.src = '/favicon.ico' // 必须
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.onload = function () {
        setTimeout(function () {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }, 0)
  }
}
