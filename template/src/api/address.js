import { post } from '@/assets/js/http'

const api = {}

api.getAddress = (config) => post({
  url: 'address/get',
  ...config
})
/**
 *  [新增地址]
 *  @param    {string}   conId        [用户ID]
 *  @param    {string}   sysAccount   [账套号]
 *  @param    {string}   tel          [电话号码]
 *  @param    {string}   recipients   [收件人]
 *  @param    {string}   country      [国家]
 *  @param    {string}   province     [省份]
 *  @param    {string}   city         [城市]
 *  @param    {string}   district     [辖区]
 *  @param    {string}   address      [详细地址]
 */
api.addAddress = (config) => post({
  url: 'address/add',
  ...config
})
api.updateAddress = (config) => post({
  url: 'address/update',
  ...config
})
api.updateDefault = (config) => post({
  url: 'address/updateDefault',
  ...config
})
/**
 *  @param    {string}   conId  [用户ID]
 *  @param    {string}   id     [地址ID]
 */
api.deleteAddress = (config) => post({
  url: 'address/delete',
  ...config
})
api.getDefault = (config) => post({
  url: 'address/get',
  ...config
})

export default api
