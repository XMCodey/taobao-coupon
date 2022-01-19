"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "index",
  setup(props, context) {
    const history = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      console.log(history);
    });
    return {
      history
    };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  Math.max.call(null, _easycom_uni_icons2, _easycom_uni_search_bar2);
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  Math.max.call(null, _easycom_uni_icons, _easycom_uni_search_bar);
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "left",
      size: "20"
    }),
    b: common_vendor.o(_ctx.blur),
    c: common_vendor.o(_ctx.input),
    d: common_vendor.o(_ctx.cancel),
    e: common_vendor.o(_ctx.change),
    f: common_vendor.o(_ctx.clear),
    g: common_vendor.p({
      placeholder: "\u652F\u6301\u641C\u7D22\u6DD8\u5B9D\u4F18\u60E0",
      focus: true,
      cancelButton: ""
    }),
    h: common_vendor.p({
      type: "trash",
      size: "20",
      color: "#9697"
    }),
    i: common_vendor.f([1, 1, , 1, 1, 1, 1, , 1, 1], (i, k0, i0) => {
      return {
        a: i
      };
    }),
    j: common_vendor.f(["\u53E3\u7F69", "\u53E3\u7EA2", "\u9762\u819C", "\u5145\u7535\u5B9D", "\u7FBD\u7ED2\u670D", "\u87BA\u86F3\u7C89", "\u96F6\u98DF", "\u624B\u673A\u58F3", "\u6D17\u8138\u5DFE", "\u534A\u8EAB\u88D9", "\u6D17\u53D1\u6C34", "\u889C\u5B50", "\u8863\u670D", "\u6D17\u8863\u6DB2", "\u62BD\u7EB8", "\u575A\u679C", "\u907F\u5B55\u5957", "\u70ED\u6C34\u888B", "\u7535\u70ED\u6BEF", "\u725B\u5976", "\u6D17\u9762\u5976", "\u773C\u5F71", "\u53F0\u706F", "\u4FDD\u6696\u5185\u8863", "\u624B\u5957", "\u9762\u5305", "\u5439\u98CE\u673A", "\u5185\u88E4", "\u6C90\u6D74\u9732", "\u7535\u52A8\u7259\u5237", "\u5973\u889C", "\u7535\u996D\u7172", "\u536B\u751F\u5DFE", "\u8EAB\u4F53\u4E73", "\u732B\u7CAE", "\u7259\u818F", "\u62A4\u624B\u971C", "\u5B89\u5168\u5957", "\u7C89\u5E95\u6DB2", "\u5783\u573E\u888B", "\u6570\u636E\u7EBF", "\u52A0\u6E7F\u5668", "\u9F20\u6807", "\u732B\u7802", "\u868A\u9999\u6DB2", "\u6BDB\u5DFE", "\u8336\u53F6", "\u88E4\u5B50", "\u96E8\u4F1E", "\u767D\u9152", "\u8FDE\u8863\u88D9", "\u5E3D\u5B50", "\u7CBD\u5B50", "\u5507\u91C9", "\u536B\u8863", "\u62D6\u628A", "\u56F4\u5DFE", "\u5DE7\u514B\u529B", "\u624B\u673A", "\u978B\u5B50", "\u6696\u98CE\u673A", "\u7709\u7B14", "\u56DB\u4EF6\u5957", "\u5973\u88C5", "\u72D7\u7CAE", "\u5564\u9152", "\u70E7\u6C34\u58F6", "\u6C34\u4E73", "\u816E\u7EA2", "\u9A6C\u4E01\u9774", "\u6F31\u53E3\u6C34", "\u773C\u7EBF\u7B14", "\u5507\u818F", "\u7EAF\u725B\u5976", "\u6563\u7C89", "\u96EA\u5730\u9774", "\u5976\u916A\u68D2", "\u7535\u706B\u9505", "\u978B\u67B6", "\u952E\u76D8", "\u5C3F\u4E0D\u6E7F", "\u6DA6\u5507\u818F", "\u67D3\u53D1\u5242", "\u9152", "\u773C\u971C", "\u9879\u94FE", "\u517B\u751F\u58F6", "\u776B\u6BDB\u818F", "\u69A8\u6C41\u673A", "\u536B\u751F\u7EB8", "\u5378\u5986\u6C34", "\u51C9\u5E2D", "\u87BA\u72EE\u7C89", "\u9762\u971C", "\u773C\u5F71\u76D8", "\u5243\u987B\u5200", "\u5976\u74F6", "\u6708\u997C", "\u88AB\u5957", "\u8033\u9970"].slice(0, 10), (i, k0, i0) => {
      return {
        a: common_vendor.t(i),
        b: i
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7ce016af"]]);
wx.createPage(MiniProgramPage);
