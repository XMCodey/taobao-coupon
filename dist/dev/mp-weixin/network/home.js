"use strict";
var network_requests = require("./requests.js");
async function getGoodsList(params = {}) {
  return await network_requests.topClient("taobao.tbk.dg.optimus.material", params);
}
exports.getGoodsList = getGoodsList;
