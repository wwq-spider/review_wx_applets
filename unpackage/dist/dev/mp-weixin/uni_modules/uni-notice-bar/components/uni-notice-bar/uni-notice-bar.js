(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar"],{341:function(n,e,t){"use strict";t.r(e);var o=t(342),i=t(344);for(var r in i)"default"!==r&&function(n){t.d(e,n,(function(){return i[n]}))}(r);t(346);var c,a=t(26),u=Object(a["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,"a1596656",null,!1,o["components"],c);u.options.__file="uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.vue",e["default"]=u.exports},342:function(n,e,t){"use strict";t.r(e);var o=t(343);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},343:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return i})),t.d(e,"staticRenderFns",(function(){return c})),t.d(e,"recyclableRender",(function(){return r})),t.d(e,"components",(function(){return o}));try{o={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(t.bind(null,333))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var n=this,e=n.$createElement;n._self._c},r=!1,c=[];i._withStripped=!0},344:function(n,e,t){"use strict";t.r(e);var o=t(345),i=t.n(o);for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=i.a},345:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={name:"UniNoticeBar",emits:["click","getmore","close"],props:{text:{type:String,default:""},moreText:{type:String,default:""},backgroundColor:{type:String,default:"#fffbe8"},speed:{type:Number,default:100},color:{type:String,default:"#de8c17"},moreColor:{type:String,default:"#999999"},single:{type:[Boolean,String],default:!1},scrollable:{type:[Boolean,String],default:!1},showIcon:{type:[Boolean,String],default:!1},showGetMore:{type:[Boolean,String],default:!1},showClose:{type:[Boolean,String],default:!1}},data:function(){var n="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36)),e="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{textWidth:0,boxWidth:0,wrapWidth:"",webviewHide:!1,elId:n,elIdBox:e,show:!0,animationDuration:"none",animationPlayState:"paused",animationDelay:"0s"}},mounted:function(){var n=this;this.$nextTick((function(){n.initSize()}))},methods:{initSize:function(){var e=this;if(this.scrollable){var t=[],o=new Promise((function(t,o){n.createSelectorQuery().in(e).select("#".concat(e.elId)).boundingClientRect().exec((function(n){e.textWidth=n[0].width,t()}))})),i=new Promise((function(t,o){n.createSelectorQuery().in(e).select("#".concat(e.elIdBox)).boundingClientRect().exec((function(n){e.boxWidth=n[0].width,t()}))}));t.push(o),t.push(i),Promise.all(t).then((function(){e.animationDuration="".concat(e.textWidth/e.speed,"s"),e.animationDelay="-".concat(e.boxWidth/e.speed,"s"),setTimeout((function(){e.animationPlayState="running"}),1e3)}))}},loopAnimation:function(){},clickMore:function(){this.$emit("getmore")},close:function(){this.show=!1,this.$emit("close")},onClick:function(){this.$emit("click")}}};e.default=t}).call(this,t(1)["default"])},346:function(n,e,t){"use strict";t.r(e);var o=t(347),i=t.n(o);for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=i.a},347:function(n,e,t){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar-create-component',
    {
        'uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(341))
        })
    },
    [['uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar-create-component']]
]);
