(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/report/finished"],{104:function(e,n,t){"use strict";(function(e){t(5);r(t(3));var n=r(t(105));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},105:function(e,n,t){"use strict";t.r(n);var r=t(106),o=t(108);for(var c in o)"default"!==c&&function(e){t.d(n,e,(function(){return o[e]}))}(c);t(110);var s,u=t(26),i=Object(u["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],s);i.options.__file="pages/report/finished.vue",n["default"]=i.exports},106:function(e,n,t){"use strict";t.r(n);var r=t(107);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},107:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return s})),t.d(n,"recyclableRender",(function(){return c})),t.d(n,"components",(function(){return r}));try{r={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(t.bind(null,357))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement;e._self._c},c=!1,s=[];o._withStripped=!0},108:function(e,n,t){"use strict";t.r(n);var r=t(109),o=t.n(r);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=o.a},109:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={onUnload:function(e){return this.toIndex(),!0},created:function(){var e=new Date;this.date=e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日"},onLoad:function(e){e.classId&&(this.classId=e.classId),e.resultId&&(this.resultId=e.resultId),e.title&&(this.classTitle=e.title),e.projectId&&(this.projectId=e.projectId)},data:function(){return{resArr:[],source:"",reviewResult:{},classTitle:"",user:{name:"",sex:"",age:"",tel:""},classId:"",resultId:"",projectId:0,pCount:""}},methods:{toIndex:function(){e.switchTab({url:"/pages/index/indexNew",success:function(e){console.log(e)},fail:function(e){console.log(e)}})},viewReport:function(){var n=this,t=e.getStorageSync("projectClass");e.navigateTo({url:"/pages/report/report?source=1&classId="+n.classId+"&resultId="+n.resultId+"&title="+n.classTitle+"&projectId="+n.projectId+"&pCount="+t.length})}}};n.default=t}).call(this,t(1)["default"])},110:function(e,n,t){"use strict";t.r(n);var r=t(111),o=t.n(r);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=o.a},111:function(e,n,t){}},[[104,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/report/finished.js.map