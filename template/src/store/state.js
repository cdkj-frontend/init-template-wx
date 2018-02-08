import {sysAccount} from '@/config'

export default {
  sysAccount,
  conId: window.localStorage.getItem('conIdGUONI'),
  openId: window.localStorage.getItem('openIdGUONI'),
  isLoading: true,
  direction: 'forward'
}
