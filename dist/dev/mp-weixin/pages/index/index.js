"use strict";
var common_vendor = require("../../common/vendor.js");
var network_home = require("../../network/home.js");
require("../../network/requests.js");
require("../../network/taobaoApi/lib/api/topClient.js");
require("../../network/taobaoApi/lib/topUtil.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      value: [],
      search: "323",
      input: "323"
    };
  },
  onLoad() {
    let response = network_home.getGoodsList({ material_id: 27160 });
    response.then((value) => {
      this.value = value;
    });
  },
  methods: {
    goSearchPage() {
      common_vendor.index.navigateTo({ url: "/pages/search/index" });
    }
  },
  setup(props, context) {
    console.log(props);
    console.log(context);
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  Math.max.call(null, _easycom_uni_search_bar2);
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  Math.max.call(null, _easycom_uni_search_bar);
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.value),
    b: common_vendor.o(($event) => $options.goSearchPage())
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
