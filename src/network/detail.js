import { topClient } from './requests'

export function postDetailList (callback, goodsId) {
  return topClient(
    'taobao.tbk.item.info.get',
    { num_iids: goodsId },
    callback
  )
}

export function postBuyTextPassword (callback, couponClickUrl) {
  return topClient(
    'taobao.tbk.tpwd.create',
    { url: couponClickUrl },
    callback
  )
}

export function postShopInfo (callback, q) {
  return topClient(
    'taobao.tbk.shop.get',
    {
      fields: 'user_id,shop_title,shop_type,seller_nick,pict_url,shop_url',
      q: q,
      count: '20',
      platform: '1'
    },
    callback
  )
}

// export function postShopInfo (callback, q) {
//   return topClient(
//     'taobao.tbk.shop.recommend.get',
//     {
//       fields: 'user_id,shop_title,shop_type,seller_nick,pict_url,shop_url',
//       user_id: q,
//       platform: '1'
//     },
//     callback
//   )
// }
