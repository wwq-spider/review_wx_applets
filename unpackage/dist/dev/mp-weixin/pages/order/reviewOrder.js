(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/reviewOrder"],{333:function(e,n,t){"use strict";(function(e){t(5);r(t(3));var n=r(t(334));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},334:function(e,n,t){"use strict";t.r(n);var r=t(335),o=t(337);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t(339);var s,a=t(26),c=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"38f5a7ec",null,!1,r["components"],s);c.options.__file="pages/order/reviewOrder.vue",n["default"]=c.exports},335:function(e,n,t){"use strict";t.r(n);var r=t(336);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},336:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return s})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return r}));try{r={uniPopup:function(){return t.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(t.bind(null,446))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement;e._self._c},i=!1,s=[];o._withStripped=!0},337:function(e,n,t){"use strict";t.r(n);var r=t(338),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},338:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{reviewInfo:{},show:!1,showPopup:!1}},onLoad:function(n){var t=e.getStorageSync("reviewClass");this.reviewInfo=t,e.removeStorageSync("reviewClass")},methods:{buy:function(){this.$refs.popup.open("bottom")},change:function(e){console.log("是否打开：",e.show)},cancleOrder:function(){this.$refs.popup.close()},submitOrder:function(){var n=this;e.showLoading({title:"数据加载中"});var t=this,r=e.getStorageSync("projectId");this.loading=!0,this.$apis.postCreatePrePayOrder({classId:this.reviewInfo.classId,projectId:r}).then((function(r){if(e.hideLoading(),200==r.code){var o=r.result;o&&o.prePayID?"000"==o.prePayID?(t.reviewInfo.buy=!0,e.showToast({title:"购买成功",icon:"success"}),t.cancleOrder(),t.loading=!1,n.beginTest()):e.requestPayment({timeStamp:o.timeStamp,nonceStr:o.nonceStr,package:o.packageStr,signType:"MD5",paySign:o.paySign,success:function(n){n&&"requestPayment:ok"==n.errMsg?(t.reviewInfo.buy=!0,t.$apis.postUpdOrderStatus({payId:o.prePayID,status:2,orderAmount:t.reviewInfo.realPrice}).then((function(e){console.log(JSON.stringify(e))})),e.showToast({title:"支付成功",icon:"success"})):e.showToast({title:"支付发起失败"})},fail:function(n){e.showModal({content:"支付失败,原因为: "+n.errMsg,showCancel:!1})},complete:function(){t.cancleOrder(),t.loading=!1,e.navigateTo({url:"/pages/order/reviewOrderDetail?payId="+o.prePayID+"&calssId="+n.reviewInfo.classId})}}):(t.loading=!1,t.cancleOrder(),e.showToast({title:r.msg}))}else t.loading=!1,t.cancleOrder(),e.showToast({title:r.msg})})).catch((function(n){t.loading=!1,t.cancleOrder(),e.hideLoading(),console.log(JSON.stringify(n))}))},beginTest:function(){if(this.reviewInfo||e.showToast({title:"量表信息为空"}),0==this.reviewInfo.charge||1==this.reviewInfo.charge&&this.reviewInfo.buy){var n="402880f082eecb960182eee3b1ef0001",t="2c9cff928408eab3018413a00d8a006a";this.reviewInfo.classId==n||this.reviewInfo.classId==t?e.navigateTo({url:"/pages/review/testCode?classId="+this.reviewInfo.classId}):e.navigateTo({url:"/pages/report/guide?classId="+this.reviewInfo.classId})}else e.showToast({title:"用户未购买"})}}};n.default=t}).call(this,t(1)["default"])},339:function(e,n,t){"use strict";t.r(n);var r=t(340),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},340:function(e,n,t){}},[[333,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/reviewOrder.js.map