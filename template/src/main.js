// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import FastClick from 'fastclick'
import 'vue-ydui/dist/ydui.base.css'
import '@/assets/fonts/iconfont.scss'
import util from '@/assets/js/util'
import init from '@/assets/js/init'
import App from './App'
import router from './router'
import store from './store'
import Lazyload from 'vue-lazyload'
import wechat from '@/assets/js/lib/wechat'
import fundebug from 'fundebug-javascript'
fundebug.apikey = '2103142aa6ba4231b3f6f5d4c74198827cf1d3323e60c0aaeb51a1d54bb94cb1'

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}

Vue.config.errorHandler = function (err, vm, info) {
  const componentName = formatComponentName(vm)
  const propsData = vm.$options && vm.$options.propsData
  fundebug.notifyError(err, {
    metaData:
    {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}

Vue.config.productionTip = false
Vue.use(wechat)
Vue.use(util)
Vue.use(Lazyload, {
  preLoad: 1.3,
  // error: './static/images/loading.svg', // TODO 添加加载错误图片
  loading: './static/images/loading.svg'
})
init()

/* eslint-disable no-new */
const vm = new Vue({
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

if (process.env.NODE_ENV === 'development') {
  console.log('开发模式，注入测试用户数据')
  if (!window.localStorage.getItem('conIdGUONI')) {
    window.localStorage.setItem('conIdGUONI', '75EE4370B72349DAAB2037DF1B86D3C3')
    window.localStorage.setItem('openIdGUONI', 'obfzC1UQpfDKUlhDZabyyLot34nc')
    window.location.reload()
  }
}
