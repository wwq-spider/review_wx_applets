(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/videocall/videocall"],{233:function(e,t,o){"use strict";(function(e){o(5);n(o(3));var t=n(o(234));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(t.default)}).call(this,o(1)["createPage"])},234:function(e,t,o){"use strict";o.r(t);var n=o(235),i=o(237);for(var r in i)"default"!==r&&function(e){o.d(t,e,(function(){return i[e]}))}(r);o(239);var a,c=o(26),u=Object(c["default"])(i["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],a);u.options.__file="pages/videocall/videocall.vue",t["default"]=u.exports},235:function(e,t,o){"use strict";o.r(t);var n=o(236);o.d(t,"render",(function(){return n["render"]})),o.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),o.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),o.d(t,"components",(function(){return n["components"]}))},236:function(e,t,o){"use strict";var n;o.r(t),o.d(t,"render",(function(){return i})),o.d(t,"staticRenderFns",(function(){return a})),o.d(t,"recyclableRender",(function(){return r})),o.d(t,"components",(function(){return n}));var i=function(){var e=this,t=e.$createElement;e._self._c},r=!1,a=[];i._withStripped=!0},237:function(e,t,o){"use strict";o.r(t);var n=o(238),i=o.n(n);for(var r in n)"default"!==r&&function(e){o.d(t,e,(function(){return n[e]}))}(r);t["default"]=i.a},238:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=getApp(),n={data:function(){return{roomID:"",template:"1v1",debugMode:!1,cloudenv:"PRO",evnArray:[{value:"PRO",title:"PRO"},{value:"CCC",title:"CCC"},{value:"DEV",title:"DEV"},{value:"UAT",title:"UAT"}],headerHeight:o.globalData.headerHeight,statusBarHeight:o.globalData.statusBarHeight}},components:{},props:{},onLoad:function(){},methods:{enterRoomID:function(e){this.roomID=e.target.value},selectTemplate:function(e){console.log("index selectTemplate",e),this.setData({template:e.detail.value})},switchDebugMode:function(e){console.log("index switchDebugMode",e),this.setData({debugMode:e.detail.value})},selectEnv:function(e){console.log("index switchDebugMode",e),this.setData({cloudenv:e.detail.value})},enterRoom:function(){var t=this.roomID,o=new Date;if(!(o-this.tapTime<1e3))if(t)if(!1!==/^\d*$/.test(t))if(t>4294967295||t<1)e.showToast({title:"房间号取值范围为 1~4294967295",icon:"none",duration:2e3});else{var n="../room/room?userID=oE_EL5pq-KVdghoXSx836eOuG2u0&template=grid&roomID=".concat(t,"&debugMode=false&cloudenv=PRO");console.log(n),this.tapTime=o,this.checkDeviceAuthorize().then((function(t){console.log("授权成功",t),e.navigateTo({url:n})})).catch((function(e){console.log("没有授权",e)}))}else e.showToast({title:"房间号只能为数字",icon:"none",duration:2e3});else e.showToast({title:"请输入房间号",icon:"none",duration:2e3})},checkDeviceAuthorize:function(){var t=this;return this.hasOpenDeviceAuthorizeModal=!1,new Promise((function(o,n){wx.getSetting&&wx.getSetting()||o(),wx.getSetting().then((function(i){console.log("getSetting",i),t.authorizeMic=i.authSetting["scope.record"],t.authorizeCamera=i.authSetting["scope.camera"],i.authSetting["scope.camera"]&&i.authSetting["scope.record"]?o():(console.log("getSetting 没有授权，弹出授权窗口",i),e.authorize({scope:"scope.record"}).then((function(e){console.log("authorize mic",e),t.authorizeMic=!0,t.authorizeCamera&&o()})).catch((function(e){console.log("authorize mic error",e),t.authorizeMic=!1})),e.authorize({scope:"scope.camera"}).then((function(e){console.log("authorize camera",e),t.authorizeCamera=!0,t.authorizeMic?o():(t.openConfirm(),n(new Error("authorize fail")))})).catch((function(e){console.log("authorize camera error",e),t.authorizeCamera=!1,t.openConfirm(),n(new Error("authorize fail"))})))}))}))},openConfirm:function(){var t=this;if(!this.hasOpenDeviceAuthorizeModal)return this.hasOpenDeviceAuthorizeModal=!0,e.showModal({content:"您没有打开麦克风和摄像头的权限，是否去设置打开？",confirmText:"确认",cancelText:"取消",success:function(o){t.hasOpenDeviceAuthorizeModal=!1,console.log(o),o.confirm?(console.log("用户点击确认"),e.openSetting({success:function(e){}})):console.log("用户点击取消")}})},onBack:function(){e.navigateBack({delta:1})}}};t.default=n}).call(this,o(1)["default"])},239:function(e,t,o){"use strict";o.r(t);var n=o(240),i=o.n(n);for(var r in n)"default"!==r&&function(e){o.d(t,e,(function(){return n[e]}))}(r);t["default"]=i.a},240:function(e,t,o){}},[[233,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/videocall/videocall.js.map