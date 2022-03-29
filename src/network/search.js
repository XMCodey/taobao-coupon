import { topClient } from './requests.js'



export function getCategoryId (callback, params) {
  return topClient(
    'taobao.itemcats.get',
    params,
    callback
  )
}
