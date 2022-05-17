import { apiUrl } from './taobaoApi/index';
import { handleRequests } from '../static/common'

// 编辑推荐接口
const recommendApiUrl = 'https://cmscg.dataoke.com/cms-v2/articles';
export function getRecommendData(data= {
    category_id: 0,
    page: 1,
    page_size: 10
}) {
    return uni.request({
        url: recommendApiUrl,
        data
    })
}


// 下拉搜索数据接口
export function getPullDown(q) {
  return uni.request({
    url: apiUrl + 'search',
	timeout: 5000,
    data: {
      code: 'utf-8',
      q: q
    }
  })
}
// // 创建axios实例,并配置初始参数
// const instance = uni.request({
// 	url: apiUrl + 'search/',
// 	timeout: 5000
// })
//
// // 创建post请求
// export function post (url, data) {
//   return instance.post(url, data, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//     }
//   })
// }
//
// // 创建get请求
// export function get (url, params) {
//   return instance.get(url, { params })
// }
import {topClient} from "./taobaoApi";


// 淘宝客-推广者-物料精选 api 封装
export async function getGoodsList ( params = {}) {
  return await topClient(
      'taobao.tbk.dg.optimus.material',
      params
  )
}

// 淘宝客-推广者-物料搜索 api 封装
export function getSearchItem (params = { }) {
    // {
    //   // start_dsr: '10', // 店铺评分
    //   page_size: '20',
    //     page_no: page,
    //   platform: '2',
    //   // end_tk_rate: '1234',
    //   // start_tk_rate: '1234',
    //   // end_price: '10',
    //   // start_price: '10',
    //   // is_overseas: 'false',
    //   // is_tmall: 'false',
    //   sort: 'tk_rate_des', // 排序
    //   // itemloc: '杭州',
    //   // cat: '16,18',
    //   q: keyword,
    //   material_id: '17004', // 物料id
    //   has_coupon: 'true' // 是否有优惠券
    //   // ip: '13.2.33.4'
    //   // need_free_shipment: 'true', // 是否包邮
    //   // need_prepay: 'true', // 是否加入消费者保障
    //   // include_pay_rate_30: 'true', // 成交转化是否高于同类均值
    //   // include_good_rate: 'true', // 好评率是否高于同类均值
    //   // include_rfd_rate: 'true', // 退款率是否高于同类均值
    //   // npx_level: '2' // 牛皮藓程度
    //   // end_ka_tk_rate: '1234',
    //   // start_ka_tk_rate: '1234',
    //   // device_encrypt: 'MD5',
    //   // device_value: 'xxx',
    //   // device_type: 'IMEI',
    //   // lock_rate_end_time: '1567440000000',
    //   // lock_rate_start_time: '1567440000000',
    //   // longitude: '121.473701',
    //   // latitude: '31.230370',
    //   // city_code: '310000',
    //   // seller_ids: '1,2,3,4',
    //   // special_id: '2323',
    //   // relation_id: '3243',
    //   // page_result_key: 'abcdef',
    //   // ucrowd_id: '1',
    //   // ucrowd_rank_items: '数据结构JSON示例'
    // }
    // console.log(params)
    return topClient(
        'taobao.tbk.dg.material.optional',
        params
    )
}

export async function getActivityInfo (activityId) {
  return await topClient(
      'taobao.tbk.activity.info.get',
      { activity_material_id: activityId }
  )
}

export function getGoodsData (goodsId) {
  return topClient(
      'taobao.tbk.item.info.get',
      { num_iids: goodsId, platform: 1 }
  )
}

export async function getShopInfo (q) {
  return await topClient(
      'taobao.tbk.shop.get',
      {
        fields: 'num_iid,click_url,coupon_amount,user_id,shop_title,shop_type,seller_nick,pict_url,shop_url',
        q: q,
        count: '20',
        platform: '1'
      })
}

export function getCouponLink() {
    return topClient(
        'taobao.tbk.item.converttaobao.tbk.item.convert',
        {
            fields: 'num_iid,click_url',
        })
}

// const a = function () {
//     topClient('taobao.tbk.itemid.coupon.get',
//         {
//             num_iids: '614189681721',
//             pid: 'mm_379330064_434650088_108458050343'
//         })
//     topClient(
//         'taobao.tbk.dg.material.optional',
//         {
//             adzone_id: '108980000351',
//             item_id: '633987062575',
//             cat: 17004
//         }
//     )
// }
// a()