import { post } from '@/assets/js/http'

const api = {}

api.getCart = (config) => post({
  url: 'cart/get',
  // url: 'http://www.hubeta.com/web/api/cart/get',
  ...config
})

api.deleteCart = (config) => post({
  url: 'cart/deleteCart',
  ...config
})

export const i = 1

export default api
