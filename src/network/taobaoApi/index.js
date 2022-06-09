'use strict';
//
// var apiClient = require('./lib/api/topClient.js').TopClient;
// // var dingtalkClient = require('./lib/api/dingtalkClient.js').DingTalkClient;
// // var tmcClient = require('./lib/tmc/tmcClient.js').TmcClient;
// //
// module.exports = {
//     ApiClient: apiClient,
//     // TmcClient: tmcClient,
// 	// DingTalkClient: dingtalkClient
// };

const apiUrl = 'https://api.maim.shop/taobao/';
export { apiUrl }

import { TopClient } from "./lib/api/topClient.js";
const client = new TopClient({
    appkey: '26001843',
    appsecret: '50adc4710ac62951d0b917c19630fd9f',
    REST_URL: apiUrl,
    url: apiUrl
})

export function topClient (apiName = '', params = {}) {
    Object.assign(params, {
        adzone_id: '108980000351',
        session: '610241097dc308e64b14a9e9ec1a582f39c661c7dc393f52711491044'
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
