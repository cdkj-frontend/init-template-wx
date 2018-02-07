import axios from 'axios'
import qs from 'qs'
import { baseUrl, requestTimeOut, showRequestLoading, loadingTime } from '@/config'
import { Toast, Loading } from 'vue-ydui/dist/lib.rem/dialog'

const http = axios.create({
  baseURL: baseUrl,
  timeout: requestTimeOut,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

// 拦截响应response，并做一些错误处理
http.interceptors.response.use((response) => {
  const data = response.data

  if (data.resultCode === 1) {
    // 接口正常调用
    return data
  } else if (data.resultCode === -1) {
    const err = new Error(data.errorMsg)
    throw err
  }
  // TODO 接口授权校验
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.message) {
    if (err.message.indexOf('timeout') > -1) {
      err.message = '服务器超时，请重试'
    } else if (err.message.indexOf('Network Error') > -1) {
      err.message = '服务器异常，请重试'
    } else {
      err.message = '未知错误，请重试'
    }
  }
  return Promise.reject(err)
})

const errorTip = (mes = '服务器异常，请重试！') => {
  console.log(mes)
  Toast({
    mes,
    timeout: 800,
    icon: 'error'
  })
}

export const post = (config) => {
  const loading = (showRequestLoading && !config.preventLoading) ? Loading : { // 当设置ajax不弹出加载弹窗时，将loading置空
    open: () => {},
    close: () => {}
  }

  loading.open('加载中...')
  const begin = new Date() // 接口开始前获得一个日期时间，以计算loading持续时间
  http.post(config.url, qs.stringify(config.params)) // 参数需经过qs模块的序列化才能正确传递
    .then((res) => {
      const finish = new Date()
      const during = finish.getTime() - begin.getTime()
      if (during > loadingTime) { // 控制关闭loading蒙层的最短时间，以免发生屏闪现象
        loading.close()
      } else { // 当loading持续时间未达到设置的最小时间时，设置关闭延时
        const delay = loadingTime - during
        setTimeout(() => {
          loading.close()
        }, delay)
      }
      if (config.success) { // 当存在成功回调方法时，执行成功回调
        config.success(res)
      }
    })
    .catch((err) => {
      loading.close()
      if (config.error) { // 当存在失败回调方法时，执行失败回调
        config.error()
      }
      errorTip(err.message)
    })
}

export const get = (config) => {
  const loading = (showRequestLoading || config.preventLoading) ? Loading : { // 当设置ajax不弹出加载弹窗时，将loading置空
    open: () => {},
    close: () => {}
  }

  loading.open('加载中...')
  const begin = new Date() // 接口开始前获得一个日期时间，以计算loading持续时间
  http.get(config.url, qs.stringify(config.params)) // 参数需经过qs模块的序列化才能正确传递
    .then((res) => {
      const finish = new Date()
      const during = finish.getTime() - begin.getTime()
      if (during > loadingTime) { // 控制关闭loading蒙层的最短时间，以免发生屏闪现象
        loading.close()
      } else { // 当loading持续时间未达到设置的最小时间时，设置关闭延时
        const delay = loadingTime - during
        setTimeout(() => {
          loading.close()
        }, delay)
      }
      if (config.success) { // 当存在成功回调方法时，执行成功回调
        config.success(res)
      }
    })
    .catch((err) => {
      loading.close()
      if (config.error) { // 当存在失败回调方法时，执行失败回调
        config.error()
      }
      errorTip(err.message)
    })
}
