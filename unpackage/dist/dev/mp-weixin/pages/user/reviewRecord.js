(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/reviewRecord"],{130:function(e,t,n){"use strict";(function(e){n(5);o(n(3));var t=o(n(131));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},131:function(e,t,n){"use strict";n.r(t);var o=n(132),r=n(134);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);n(136);var i,a=n(26),c=Object(a["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);c.options.__file="pages/user/reviewRecord.vue",t["default"]=c.exports},132:function(e,t,n){"use strict";n.r(t);var o=n(133);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},133:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return i})),n.d(t,"recyclableRender",(function(){return s})),n.d(t,"components",(function(){return o}));try{o={uTabs:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-tabs/u-tabs")]).then(n.bind(null,440))},uniLoadMore:function(){return n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more").then(n.bind(null,447))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},s=!1,i=[];r._withStripped=!0},134:function(e,t,n){"use strict";n.r(t);var o=n(135),r=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=r.a},135:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={components:{},data:function(){return{tabList:[{name:"全部(0)"},{name:"已测评(0)"},{name:"未测评(0)"},{name:"待付款(0)"}],defaultCover:"../../static/default_cover.jpeg",recordList:[],recordListTemp:[],field:"_id,mode,avatar,title,user_name,excerpt,last_modify_date",formData:{status:"loading"},tipShow:!1,current:0}},onUnload:function(){e.navigateTo({url:"/pages/user/index",success:function(e){console.log(e)},fail:function(e){console.log(e)}})},mounted:function(){var t=this,n=e.getStorageSync("userData"),o=this;e.showLoading({title:"数据加载中"});var r=e.getStorageSync("projectId");console.log("个人信息：",n.userId),this.$apis.postReviewRecords({userId:n.userId,projectId:r}).then((function(n){e.hideLoading(),200==n.code?(n.result.forEach((function(e){o.recordList.push(e),o.recordListTemp.push(e)})),t.tabList[1].name="已测评("+o.recordList.length+")",t.tabList[0].name="全部("+o.recordList.length+")"):e.showToast({title:n.msg,icon:"error"})}))},loadData:function(e){},methods:{againTest:function(t,n){var o=e.getStorageSync("projectClass");if(o&&o.length>0){var r=o[0];e.navigateTo({url:"/pages/report/guide?classId="+r.classId})}else e.navigateTo({url:"/pages/report/guide?classId="+t})},imageError:function(e){this.recordList[e]["classCover"]=this.defaultCover},load:function(e,t){t&&(this.formData.status="noMore")},detail:function(t,n,o,r){var s="402880f082eecb960182eee3b1ef0001",i="2c9cff928408eab3018413a00d8a006a";n==s||n==i?e.navigateTo({url:"/pages/report/pdfreport?pdfUrl="+encodeURIComponent(r)}):e.navigateTo({url:"/pages/report/report?source=1&resultId="+t+"&classId="+n+"&title="+o})},changeTab:function(e){var t=this;this.current!=e&&(this.recordList.splice(0,this.recordList.length),2==e||3==e?this.recordList.splice(0,this.recordList.length):this.recordListTemp.forEach((function(e){t.recordList.push(e)}))),this.current=e}},onPullDownRefresh:function(){var t=this;this.formData.status="more",this.tipShow=!0;var n=e.getStorageSync("userData"),o=this,r=e.getStorageSync("projectId");this.$apis.postReviewRecords({userId:n.userId,projectId:r}).then((function(n){t.tipShow=!1,200==n.code?(o.recordList=[],n.rows.forEach((function(e){e.classCover&&(e.classCover=o.$config.aliYunEndpoint+e.classCover),o.recordList.push(e)}))):e.showToast({title:n.msg,icon:"error"}),e.stopPullDownRefresh()})).catch((function(t){e.hideLoading(),o.tipShow=!1,console.log(t)}))},onReachBottom:function(){}};t.default=n}).call(this,n(1)["default"])},136:function(e,t,n){"use strict";n.r(t);var o=n(137),r=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=r.a},137:function(e,t,n){}},[[130,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/reviewRecord.js.map