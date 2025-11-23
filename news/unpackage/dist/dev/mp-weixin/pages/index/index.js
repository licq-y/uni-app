"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      news: []
    };
  },
  onLoad: function() {
    common_vendor.index.showLoading({
      title: "加载中..."
    });
    common_vendor.index.request({
      url: "https://unidemo.dcloud.net.cn/api/news",
      method: "GET",
      data: {},
      success: (res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:36", res);
        this.news = res.data;
        common_vendor.index.hideLoading();
      },
      fail: () => {
      },
      complete: () => {
      }
    });
  },
  methods: {
    openinfo(e) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:46", e);
      var newsid = e.currentTarget.dataset.newsid;
      common_vendor.index.__f__("log", "at pages/index/index.vue:48", newsid);
      common_vendor.index.navigateTo({
        url: "../info/info?newsid=" + newsid
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.news, (item, index, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.created_at),
        d: index,
        e: common_vendor.o((...args) => $options.openinfo && $options.openinfo(...args), index),
        f: item.post_id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
