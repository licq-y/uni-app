"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "",
      strings: ""
    };
  },
  onLoad: function(e) {
    common_vendor.index.__f__("log", "at pages/info/info.vue:19", e);
    common_vendor.index.request({
      url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + e.newsid,
      method: "GET",
      data: {},
      success: (res) => {
        common_vendor.index.__f__("log", "at pages/info/info.vue:25", res);
        this.title = res.data.title;
        this.strings = res.data.content;
      },
      fail: () => {
      },
      complete: () => {
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: $data.strings
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/info.js.map
