"use strict";
var network_taobaoApi_lib_api_topClient = require("./taobaoApi/lib/api/topClient.js");
const apiUrl = "https://api.maim.shop/taobao/";
const client = new network_taobaoApi_lib_api_topClient.TopClient({
  appkey: "26001843",
  appsecret: "50adc4710ac62951d0b917c19630fd9f",
  REST_URL: apiUrl,
  url: apiUrl
});
function topClient(apiName = "", params = {}) {
  Object.assign(params, {
    adzone_id: "108980000351"
  });
  return new Promise(function(resolve, reject) {
    client.execute(apiName, params, (r, err) => {
      if (err) {
        console.log(apiName);
        console.log(params);
        reject(err);
        return "\u51FA\u73B0\u8BF7\u6C42\u9519\u8BEF\uFF1A";
      }
      resolve(r);
    });
  });
}
exports.topClient = topClient;
