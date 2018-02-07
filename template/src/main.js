// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import 'vue-ydui/dist/ydui.base.css'
import '@/assets/fonts/iconfont.scss'
import util from '@/assets/js/util'
import init from '@/assets/js/init'
import App from './App'
import router from './router'
import store from './store'
import Lazyload from 'vue-lazyload'

// 在支持全屏的浏览器下进行全屏显示
const de = document.documentElement
if (de.requestFullscreen) {
  de.requestFullscreen()
} else if (de.mozRequestFullScreen) {
  de.mozRequestFullScreen()
} else if (de.webkitRequestFullScreen) {
  de.webkitRequestFullScreen()
}

Vue.config.productionTip = false
Vue.use(util)
Vue.use(Lazyload, {
  preLoad: 1.3,
  // error: './static/images/loading.svg', // TODO 添加加载错误图片
  loading: './static/images/loading.svg'
})
init()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 加载fastclick
document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body)
}, false)
