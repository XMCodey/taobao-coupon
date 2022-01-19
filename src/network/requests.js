const apiUrl = 'https://api.maim.shop/taobao/'

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

import {TopClient} from "./taobaoApi/lib/api/topClient";
const client = new TopClient({
  appkey: '26001843',
  appsecret: '50adc4710ac62951d0b917c19630fd9f',
  REST_URL: apiUrl,
  url: apiUrl
})

export function topClient (apiName = '', params = {}) {
  Object.assign(params, {
    adzone_id: '108980000351'
  })

  return new Promise(function (resolve, reject) {
    client.execute(apiName, params, (r, err) => {
      if (err) {
        console.log(apiName);
        console.log(params);
        reject(err)
        new Error('出现请求错误：')
        return '出现请求错误：'
      }
      resolve(r)
    })
  })

}
