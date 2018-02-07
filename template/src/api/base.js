import { post } from '@/assets/js/http'

const api = {}

api.getAuthorizeURL = (config) => post({
  url: '../wechat/url/getAuthorizeURL',
  ...config
})

api.getUser = (config) => post({
  url: '../wechat/info/getUser',
  ...config
})

export default api
