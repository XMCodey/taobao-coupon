"use strict";
var common_vendor = require("../../../../common/vendor.js");
var network_taobaoApi_lib_topUtil = require("../topUtil.js");
new Proxy({}, {
  get() {
    throw new Error('Module "stream" has been externalized for browser compatibility and cannot be accessed in client code.');
  }
});
const util = network_taobaoApi_lib_topUtil.utilObj;
function TopClient(options) {
  if (!(this instanceof TopClient)) {
    return new TopClient(options);
  }
  options = options || {};
  if (!options.appkey || !options.appsecret) {
    throw new Error("appkey or appsecret need!");
  }
  this.url = options.url || "http://gw.api.taobao.com/router/rest";
  this.appkey = options.appkey;
  this.appsecret = options.appsecret;
}
TopClient.prototype.invoke = function(type, method, params, reponseNames, httpHeaders, callback) {
  params.method = method;
  this.request(type, params, httpHeaders, function(err, result) {
    if (err) {
      return callback(err);
    }
    var response = result;
    if (reponseNames && reponseNames.length > 0) {
      for (var i = 0; i < reponseNames.length; i++) {
        var name = reponseNames[i];
        response = response[name];
        if (response === void 0) {
          break;
        }
      }
    }
    callback(null, response);
  });
};
TopClient.prototype.request = function(type, params, httpHeaders, callback) {
  var err = util.checkRequired(params, "method");
  if (err) {
    return callback(err);
  }
  var args = {
    timestamp: this.timestamp(),
    format: "json",
    app_key: this.appkey,
    v: "2.0",
    sign_method: "md5"
  };
  var request = null;
  for (var key in params) {
    if (typeof params[key] === "object" && Buffer.isBuffer(params[key])) {
      request.attach(key, params[key], { knownLength: params[key].length, filename: key });
    } else if (typeof params[key] === "object" && (void 0)(params[key]) && !util.is(params[key]).a(String)) {
      request.attach(key, params[key]);
    } else if (typeof params[key] === "object") {
      args[key] = JSON.stringify(params[key]);
    } else {
      args[key] = params[key];
    }
  }
  args.sign = this.sign(args);
  request = (method) => {
    common_vendor.index.request({
      url: this.url,
      data: args,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method,
      timeout: 2e3,
      complete: callback
    });
  };
  if (type == "get") {
    request("GET");
  } else {
    request("POST");
  }
};
TopClient.prototype.timestamp = function() {
  return util.YYYYMMDDHHmmss();
};
TopClient.prototype.sign = function(params) {
  var sorted = Object.keys(params).sort();
  var basestring = this.appsecret;
  for (var i = 0, l = sorted.length; i < l; i++) {
    var k = sorted[i];
    basestring += k + params[k];
  }
  basestring += this.appsecret;
  return util.md5(basestring).toUpperCase();
};
TopClient.prototype.execute = function(apiname, params, callback) {
  this.invoke("post", apiname, params, [util.getApiResponseName(apiname)], [], callback);
};
TopClient.prototype.executeWithHeader = function(apiname, params, httpHeaders, callback) {
  this.invoke("post", apiname, params, [util.getApiResponseName(apiname)], httpHeaders || [], callback);
};
TopClient.prototype.get = function(apiname, params, callback) {
  this.invoke("get", apiname, params, [util.getApiResponseName(apiname)], [], callback);
};
exports.TopClient = TopClient;
