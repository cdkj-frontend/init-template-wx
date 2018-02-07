import getUrlParam from './tools/getUrlParam'
import api from '@/api/base'
import { sysAccount } from '@/config'

const getAuthorizeURL = () => {
  const location = window.location
  const urlData = JSON.stringify({
    path: location.hash
  })
  const redirectUri = `${location.origin}${location.pathname}?urlData=${encodeURIComponent(urlData)}`
  api.getAuthorizeURL({
    params: {
      sysAccount,
      redirectUri,
      state: '',
      snsapiBase: true
    },
    success: (res) => {
      window.location.replace(res.result)
    }
  })
}

const getUser = (code, vm) => {
  const urlData = window.location.href.split('urlData=')[1]
  const data = JSON.parse(decodeURIComponent(urlData))
  const path = data.path
  const redirectUrl = `${location.origin}${location.pathname}#/${path.split('#/')[1]}`
  api.getUser({
    params: {
      sysAccount,
      code
    },
    success: (res) => {
      if (!res.result.openId || !res.result.conId) {
        alert('获取用户信息失败！')
      }
      const openId = res.result.openId
      const conId = res.result.conId
      if (!openId || !conId) {
        alert('获取用户信息失败！')
        return false
      }
      window.localStorage.setItem(`openId${sysAccount}`, openId)
      window.localStorage.setItem(`conId${sysAccount}`, conId)
      window.location.replace(redirectUrl)
      // vm.$router.replace({
      //   path: `/${path}`
      // })
    }
  })
}

const getAuth = (vm) => {
  const access_code = getUrlParam('code')
  if (access_code === undefined || access_code === null || access_code === '') {
    getAuthorizeURL()
  } else {
    getUser(access_code, vm)
  }
}

export default (vm) => {
  if (sysAccount === undefined || sysAccount === null || sysAccount === '') {
    alert('缺少系统账套号信息')
    return false
  }
  const conId = window.localStorage.getItem(`conId${sysAccount}`)
  if (conId === undefined || conId=== null || conId === '') {
    getAuth(vm)
  }
}
