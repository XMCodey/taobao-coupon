import { topClient } from './requests.js'

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

export function getCategoryId (callback, params) {
  return topClient(
    'taobao.itemcats.get',
    params,
    callback
  )
}
