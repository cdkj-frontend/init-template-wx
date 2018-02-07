import { post } from '@/assets/js/http'

const api = {}

api.getPage = (config) => post({
  url: 'page/getPage',
  ...config
})

api.getPntCategories = (config) => post({
  url: 'pntProduct/getPntCategories',
  ...config
})

api.getSkuView = (config) => post({
  url: 'pntProduct/getSkuView',
  ...config
})

export default api
