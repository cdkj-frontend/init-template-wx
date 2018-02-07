import Vue from 'vue'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog'
import checkAuth from './checkAuth'

export default () => {

  Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading
  }

  Array.prototype.remove = function (index) { // eslint-disable-line
    const head = this.slice(0, index)
    const tail = this.slice(index + 1, this.length)
    return head.concat(tail)
  }
}
