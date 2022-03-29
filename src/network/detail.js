import { topClient } from './requests'



export function postBuyTextPassword (callback, couponClickUrl) {
  return topClient(
    'taobao.tbk.tpwd.create',
    { url: couponClickUrl },
    callback
  )
}
