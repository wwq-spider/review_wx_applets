(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/report/pdfreport"],{112:function(n,e,o){"use strict";(function(n){o(5);t(o(3));var e=t(o(113));function t(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=o,n(e.default)}).call(this,o(1)["createPage"])},113:function(n,e,o){"use strict";o.r(e);var t=o(114),r=o(116);for(var c in r)"default"!==c&&function(n){o.d(e,n,(function(){return r[n]}))}(c);o(118);var i,u=o(26),s=Object(u["default"])(r["default"],t["render"],t["staticRenderFns"],!1,null,null,null,!1,t["components"],i);s.options.__file="pages/report/pdfreport.vue",e["default"]=s.exports},114:function(n,e,o){"use strict";o.r(e);var t=o(115);o.d(e,"render",(function(){return t["render"]})),o.d(e,"staticRenderFns",(function(){return t["staticRenderFns"]})),o.d(e,"recyclableRender",(function(){return t["recyclableRender"]})),o.d(e,"components",(function(){return t["components"]}))},115:function(n,e,o){"use strict";var t;o.r(e),o.d(e,"render",(function(){return r})),o.d(e,"staticRenderFns",(function(){return i})),o.d(e,"recyclableRender",(function(){return c})),o.d(e,"components",(function(){return t}));try{t={uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(o.bind(null,333))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var n=this,e=n.$createElement;n._self._c},c=!1,i=[];r._withStripped=!0},116:function(n,e,o){"use strict";o.r(e);var t=o(117),r=o.n(t);for(var c in t)"default"!==c&&function(n){o.d(e,n,(function(){return t[n]}))}(c);e["default"]=r.a},117:function(n,e,o){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onUnload:function(n){return this.toIndex(),!0},created:function(){var n=new Date;this.date=n.getFullYear()+"年"+(n.getMonth()+1)+"月"+n.getDate()+"日"},onLoad:function(n){n.pdfUrl&&(this.pdfUrl=decodeURIComponent(decodeURIComponent(n.pdfUrl)))},data:function(){return{pdfUrl:""}},methods:{toIndex:function(){n.switchTab({url:"/pages/index/index",success:function(n){console.log(n)},fail:function(n){console.log(n)}})},viewReport:function(){console.log("pdfUrl",this.pdfUrl),n.showLoading({title:"报告加载中..."}),wx.downloadFile({url:this.pdfUrl,success:function(e){n.hideLoading();var o=e.tempFilePath;wx.openDocument({filePath:o,fileType:"pdf",showMenu:!0,success:function(n){console.log("打开文件成功"),console.log(n)},fail:function(n){wx.showToast({icon:"none",title:"打开文件失败"})}})},fail:function(n){console.log("fail"),console.log(n),wx.showToast({icon:"none",title:"下载文件失败"})}})}}};e.default=o}).call(this,o(1)["default"])},118:function(n,e,o){"use strict";o.r(e);var t=o(119),r=o.n(t);for(var c in t)"default"!==c&&function(n){o.d(e,n,(function(){return t[n]}))}(c);e["default"]=r.a},119:function(n,e,o){}},[[112,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/report/pdfreport.js.map