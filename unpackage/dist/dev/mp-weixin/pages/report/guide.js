(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/report/guide"],{100:function(e,n,t){"use strict";t.r(n);var o=t(101),s=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=s.a},101:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={created:function(){var e=new Date;this.date=e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日"},onLoad:function(n){var t=this;n.classId&&(e.showLoading({title:"数据加载中"}),this.$apis.postReviewClassDetail({classId:n.classId}).then((function(n){e.hideLoading(),200==n.code?t.reviewClass=n.result:e.showToast({title:n.msg})}))),n.userId&&(t.userId=n.userId),n.name&&(t.name=decodeURIComponent(decodeURIComponent(n.name))),n.sex&&(t.sex=n.sex),n.age&&(t.age=n.age),n.evalCode&&(t.evalCode=decodeURIComponent(decodeURIComponent(n.evalCode))),n.select&&(t.select=decodeURIComponent(decodeURIComponent(n.select))),n.school&&(t.school=decodeURIComponent(decodeURIComponent(n.school)))},data:function(){return{reviewClass:{},evalCode:"",select:"",school:"",userId:"",name:"",sex:"",age:""}},methods:{toIndex:function(){e.switchTab({url:"/pages/index/index",success:function(e){console.log(e)},fail:function(e){console.log(e)}})},startTest:function(){var n=this.reviewClass.videoAnalysis;1==n?e.redirectTo({url:"/pages/review/video?classId="+this.reviewClass.classId+"&title="+this.reviewClass.title+"&source=1",success:function(e){console.log(e)},fail:function(e){console.log(e)}}):e.redirectTo({url:"/pages/questions/questions?classId="+this.reviewClass.classId+"&title="+this.reviewClass.title+"&source=1&videoAnalysis="+this.reviewClass.videoAnalysis+"&evalCode="+encodeURIComponent(this.evalCode)+"&select="+this.select+"&school="+this.school+"&userId="+this.userId+"&name="+this.name+"&sex="+this.sex+"&age="+this.age,success:function(e){console.log(e)},fail:function(e){console.log(e)}})}}};n.default=t}).call(this,t(1)["default"])},102:function(e,n,t){"use strict";t.r(n);var o=t(103),s=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=s.a},103:function(e,n,t){},96:function(e,n,t){"use strict";(function(e){t(5);o(t(3));var n=o(t(97));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},97:function(e,n,t){"use strict";t.r(n);var o=t(98),s=t(100);for(var i in s)"default"!==i&&function(e){t.d(n,e,(function(){return s[e]}))}(i);t(102);var c,r=t(26),a=Object(r["default"])(s["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],c);a.options.__file="pages/report/guide.vue",n["default"]=a.exports},98:function(e,n,t){"use strict";t.r(n);var o=t(99);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},99:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return s})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return o}));var s=function(){var e=this,n=e.$createElement;e._self._c},i=!1,c=[];s._withStripped=!0}},[[96,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/report/guide.js.map