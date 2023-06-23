(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/review/testCode"],{187:function(e,n,o){"use strict";(function(e){o(5);t(o(3));var n=t(o(188));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o(1)["createPage"])},188:function(e,n,o){"use strict";o.r(n);var t=o(189),r=o(191);for(var a in r)"default"!==a&&function(e){o.d(n,e,(function(){return r[e]}))}(a);o(193);var i,c=o(26),s=Object(c["default"])(r["default"],t["render"],t["staticRenderFns"],!1,null,"6e0a0fe6",null,!1,t["components"],i);s.options.__file="pages/review/testCode.vue",n["default"]=s.exports},189:function(e,n,o){"use strict";o.r(n);var t=o(190);o.d(n,"render",(function(){return t["render"]})),o.d(n,"staticRenderFns",(function(){return t["staticRenderFns"]})),o.d(n,"recyclableRender",(function(){return t["recyclableRender"]})),o.d(n,"components",(function(){return t["components"]}))},190:function(e,n,o){"use strict";var t;o.r(n),o.d(n,"render",(function(){return r})),o.d(n,"staticRenderFns",(function(){return i})),o.d(n,"recyclableRender",(function(){return a})),o.d(n,"components",(function(){return t}));try{t={uForm:function(){return o.e("uview-ui/components/u-form/u-form").then(o.bind(null,357))},uFormItem:function(){return Promise.all([o.e("common/vendor"),o.e("uview-ui/components/u-form-item/u-form-item")]).then(o.bind(null,364))},uInput:function(){return Promise.all([o.e("common/vendor"),o.e("uview-ui/components/u-input/u-input")]).then(o.bind(null,375))},uniPopup:function(){return o.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(o.bind(null,424))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c},a=!1,i=[];r._withStripped=!0},191:function(e,n,o){"use strict";o.r(n);var t=o(192),r=o.n(t);for(var a in t)"default"!==a&&function(e){o.d(n,e,(function(){return t[e]}))}(a);n["default"]=r.a},192:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;t(o(9));function t(e){return e&&e.__esModule?e:{default:e}}var r={onLoad:function(n){var o=this;e.getStorageSync("userData");n.classId&&(o.classId=n.classId),this.loadData()},data:function(){return{reviewClass:{},userId:"",evalCode:"",classId:"",form:{evalCode:""},rules:{evalCode:[{required:!0,message:"请输入测评码",trigger:["change","blur"]}]},countDown:60,timer:{},isLock:!1,codeBtnColor:"#ede3cb",evalCodeTemp:"",price:""}},methods:{loadData:function(){var e=this;this.$apis.postEvalPrice().then((function(n){200==n.code&&(e.price=n.price)}))},evalCodeBuy:function(){var e=this;this.$nextTick((function(){e.$refs.showPayConfirm.open("center")}))},submit:function(){var n=this,o=e.getStorageSync("userData");this.$apis.postVerifyEvalCode({userId:o.userId,evalCode:n.form.evalCode}).then((function(o){200==o.code?e.navigateTo({url:"/pages/review/personalInfoConfirm?classId="+n.classId+"&evalCode="+encodeURIComponent(n.form.evalCode)}):e.showToast({title:o.msg})})).catch((function(e){console.log(e)}))},change:function(e){console.log("是否打开:"+e.show)},confirmBuy:function(){var n=this;e.showLoading({title:"数据加载中"}),this.$apis.postGetEvalCode().then((function(o){if(console.log("获取测评码：",o.code),200==o.code){var t=n;n.loading=!0,n.evalCodeTemp=o.evalCode,n.$apis.postEvalCodePrePayOrder({classId:o.evalCode,orgAmount:t.price}).then((function(o){if(e.hideLoading(),200==o.code){var r=o.data;console.log("签名:",r.paySign),r&&r.prePayID?"000"==r.prePayID?(e.showToast({title:"购买成功",icon:"success"}),n.form.evalCode=n.evalCodeTemp,t.cancel(),t.loading=!1):e.requestPayment({timeStamp:r.timeStamp,nonceStr:r.nonceStr,package:r.packageStr,signType:"MD5",paySign:r.paySign,success:function(o){o&&"requestPayment:ok"==o.errMsg?(t.$apis.postUpdOrderStatus({payId:r.prePayID,status:2,orderAmount:t.price}).then((function(e){console.log(JSON.stringify(e))})),e.showToast({title:"支付成功",icon:"success"}),n.form.evalCode=n.evalCodeTemp):(e.showToast({title:"支付发起失败"}),t.$apis.postUpdateEvalCodeStock({evalCode:n.evalCodeTemp}).then((function(e){console.log(JSON.stringify(e))})))},fail:function(o){e.showModal({content:"支付失败,原因为: "+o.errMsg,showCancel:!1}),t.$apis.postUpdateEvalCodeStock({evalCode:n.evalCodeTemp}).then((function(e){console.log(JSON.stringify(e))}))},complete:function(){t.cancel(),t.loading=!1}}):(t.loading=!1,t.cancel(),e.showToast({title:o.msg}))}else t.loading=!1,t.cancel(),e.showToast({title:o.msg})})).catch((function(n){t.loading=!1,t.cancel(),e.hideLoading(),console.log(JSON.stringify(n))}))}else e.showToast({title:o.msg})})).catch((function(e){console.log(e)}))},cancel:function(){this.$refs.showPayConfirm.close()}}};n.default=r}).call(this,o(1)["default"])},193:function(e,n,o){"use strict";o.r(n);var t=o(194),r=o.n(t);for(var a in t)"default"!==a&&function(e){o.d(n,e,(function(){return t[e]}))}(a);n["default"]=r.a},194:function(e,n,o){}},[[187,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/review/testCode.js.map