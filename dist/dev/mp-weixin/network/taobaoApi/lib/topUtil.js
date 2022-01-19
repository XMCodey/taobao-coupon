"use strict";
var common_vendor = require("../../../common/vendor.js");
const utilObj = {};
utilObj.hash = function hash(method, s, format) {
  var sum = common_vendor.md5.create(method);
  var isBuffer = common_vendor.buffer.Buffer.isBuffer(s);
  if (!isBuffer && typeof s === "object") {
    s = JSON.stringify(sortObject(s));
  }
  sum.update(s, isBuffer ? "binary" : "utf8");
  return sum.hex(format || "hex");
};
utilObj.md5 = function md5(s, format) {
  return utilObj.hash("md5", s, format);
};
utilObj.YYYYMMDDHHmmss = function(d, options) {
  d = d || new Date();
  if (!(d instanceof Date)) {
    d = new Date(d);
  }
  var dateSep = "-";
  var timeSep = ":";
  if (options) {
    if (options.dateSep) {
      dateSep = options.dateSep;
    }
    if (options.timeSep) {
      timeSep = options.timeSep;
    }
  }
  var date = d.getDate();
  if (date < 10) {
    date = "0" + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = "0" + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return d.getFullYear() + dateSep + month + dateSep + date + " " + hours + timeSep + mintues + timeSep + seconds;
};
utilObj.checkRequired = function(params, keys) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  for (var i = 0, l = keys.length; i < l; i++) {
    var k = keys[i];
    if (!params.hasOwnProperty(k)) {
      var err = new Error("`" + k + "` required");
      err.name = "ParameterMissingError";
      return err;
    }
  }
};
utilObj.getApiResponseName = function(apiName) {
  var reg = /\./g;
  if (apiName.match("^taobao"))
    apiName = apiName.substr(7);
  return apiName.replace(reg, "_") + "_response";
};
utilObj.getLocalIPAdress = function() {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
};
utilObj.is = function(value) {
  return {
    a: function(check) {
      if (check.prototype)
        check = check.prototype.constructor.name;
      var type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
      return value != null && type === check.toLowerCase();
    }
  };
};
exports.utilObj = utilObj;
