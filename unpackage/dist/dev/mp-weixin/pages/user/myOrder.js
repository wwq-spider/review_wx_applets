(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/myOrder"],{138:function(n,e,t){"use strict";(function(n){t(5);o(t(3));var e=o(t(139));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t(1)["createPage"])},139:function(n,e,t){"use strict";t.r(e);var o=t(140),r=t(142);for(var a in r)"default"!==a&&function(n){t.d(e,n,(function(){return r[n]}))}(a);t(144);var i,u=t(26),s=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);s.options.__file="pages/user/myOrder.vue",e["default"]=s.exports},140:function(n,e,t){"use strict";t.r(e);var o=t(141);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},141:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return r})),t.d(e,"staticRenderFns",(function(){return i})),t.d(e,"recyclableRender",(function(){return a})),t.d(e,"components",(function(){return o}));try{o={uniLoadMore:function(){return t.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more").then(t.bind(null,439))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var n=this,e=n.$createElement;n._self._c},a=!1,i=[];r._withStripped=!0},142:function(n,e,t){"use strict";t.r(e);var o=t(143),r=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,(function(){return o[n]}))}(a);e["default"]=r.a},143:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={components:{},data:function(){return{defaultCover:"../../static/default_cover.jpeg",orderList:[],formData:{status:"loading"},tipShow:!1}},onUnload:function(){n.navigateTo({url:"/pages/user/index",success:function(n){console.log(n)},fail:function(n){console.log(n)}})},onLoad:function(n){this.loadData()},methods:{beginTest:function(e){n.navigateTo({url:"/pages/report/guide?classId="+e})},imageError:function(n){this.orderList[n]["bannerImg"]=this.defaultCover},load:function(n,e){e&&(this.formData.status="noMore")},loadData:function(){var e=this,t=n.getStorageSync("userData"),o=this;n.showLoading({title:"数据加载中"}),this.$apis.postMyOrder({userId:t.userId}).then((function(t){n.hideLoading(),e.tipShow=!1,200==t.code?t.result.forEach((function(n){o.orderList.push(n)})):n.showToast({title:t.msg,icon:"error"}),n.stopPullDownRefresh()})).catch((function(e){n.hideLoading(),o.tipShow=!1,console.log(e)}))},copyClick:function(e){n.setClipboardData({data:e,success:function(e){n.getClipboardData({success:function(e){n.showToast({title:"复制成功",icon:"none"})}})}})}},onPullDownRefresh:function(){this.formData.status="more",this.tipShow=!0,this.loadData()},onReachBottom:function(){}};e.default=t}).call(this,t(1)["default"])},144:function(n,e,t){"use strict";t.r(e);var o=t(145),r=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,(function(){return o[n]}))}(a);e["default"]=r.a},145:function(n,e,t){}},[[138,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/myOrder.js.map