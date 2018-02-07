import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'

Vue.use(Router)

const Helloworld = (resolve) => {
  import('@/view/Helloworld').then((module) => {
    resolve(module)
  })
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'hello-world'
      component: Helloworld,
    }
  ]
})

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  store.commit('updateLoadingStatus', true)

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', 'forward')
    } else {
      store.commit('updateDirection', 'back')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', 'forward')
  }

  if (to.matched[0].components.default.name === 'index') {
    history.clear()
    historyCount = history.getItem('count') * 1 || 0
    history.setItem('/', 0)
    store.commit('updateDirection', 'back')
  }

  // 当跳转时携带指定方向参数则优先使用指定参数
  if (to.params.direction) {
    store.commit('updateDirection', to.params.direction)
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  // 改变标题
  document.title = to.meta.title || document.title
  store.commit('updateLoadingStatus', false)
})

export default router
