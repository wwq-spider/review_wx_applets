(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-popup/components/uni-popup/uni-popup"],{417:function(t,i,o){"use strict";o.r(i);var n=o(418),e=o(420);for(var s in e)"default"!==s&&function(t){o.d(i,t,(function(){return e[t]}))}(s);o(422);var r,a=o(26),u=Object(a["default"])(e["default"],n["render"],n["staticRenderFns"],!1,null,"7c43d41b",null,!1,n["components"],r);u.options.__file="uni_modules/uni-popup/components/uni-popup/uni-popup.vue",i["default"]=u.exports},418:function(t,i,o){"use strict";o.r(i);var n=o(419);o.d(i,"render",(function(){return n["render"]})),o.d(i,"staticRenderFns",(function(){return n["staticRenderFns"]})),o.d(i,"recyclableRender",(function(){return n["recyclableRender"]})),o.d(i,"components",(function(){return n["components"]}))},419:function(t,i,o){"use strict";var n;o.r(i),o.d(i,"render",(function(){return e})),o.d(i,"staticRenderFns",(function(){return r})),o.d(i,"recyclableRender",(function(){return s})),o.d(i,"components",(function(){return n}));var e=function(){var t=this,i=t.$createElement;t._self._c},s=!1,r=[];e._withStripped=!0},420:function(t,i,o){"use strict";o.r(i);var n=o(421),e=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(i,t,(function(){return n[t]}))}(s);i["default"]=e.a},421:function(t,i,o){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o={name:"uniPopup",components:{},emits:["change","maskClick"],props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},maskClick:{type:Boolean,default:!0},backgroundColor:{type:String,default:"none"},safeArea:{type:Boolean,default:!0}},watch:{type:{handler:function(t){this.config[t]&&this[this.config[t]](!0)},immediate:!0},isDesktop:{handler:function(t){this.config[t]&&this[this.config[this.type]](!0)},immediate:!0},maskClick:{handler:function(t){this.mkclick=t},immediate:!0}},data:function(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,popupWidth:0,popupHeight:0,config:{top:"top",bottom:"bottom",center:"center",left:"left",right:"right",message:"top",dialog:"center",share:"bottom"},maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{position:"fixed",left:0,right:0},maskShow:!0,mkclick:!0,popupstyle:this.isDesktop?"fixforpc-top":"top"}},computed:{isDesktop:function(){return this.popupWidth>=500&&this.popupHeight>=500},bg:function(){return""===this.backgroundColor||"none"===this.backgroundColor?"transparent":this.backgroundColor}},mounted:function(){var i=this,o=function(){var o=t.getSystemInfoSync(),n=o.windowWidth,e=o.windowHeight,s=o.windowTop,r=o.safeAreaInsets;i.popupWidth=n,i.popupHeight=e+s,i.safeArea?i.safeAreaInsets=r:i.safeAreaInsets=0};o()},created:function(){this.mkclick=this.maskClick,this.animation?this.duration=300:this.duration=0,this.messageChild=null,this.clearPropagation=!1},methods:{closeMask:function(){this.maskShow=!1},disableMask:function(){this.mkclick=!1},clear:function(t){t.stopPropagation(),this.clearPropagation=!0},open:function(t){var i=["top","center","bottom","left","right","message","dialog","share"];t&&-1!==i.indexOf(t)||(t=this.type),this.config[t]?(this[this.config[t]](),this.$emit("change",{show:!0,type:t})):console.error("缺少类型：",t)},close:function(t){var i=this;this.showTrans=!1,this.$emit("change",{show:!1,type:this.type}),clearTimeout(this.timer),this.timer=setTimeout((function(){i.showPopup=!1}),300)},touchstart:function(){this.clearPropagation=!1},onTap:function(){this.clearPropagation?this.clearPropagation=!1:(this.$emit("maskClick"),this.mkclick&&this.close())},top:function(t){var i=this;this.popupstyle=this.isDesktop?"fixforpc-top":"top",this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0,backgroundColor:this.bg},t||(this.showPopup=!0,this.showTrans=!0,this.$nextTick((function(){i.messageChild&&"message"===i.type&&i.messageChild.timerClose()})))},bottom:function(t){this.popupstyle="bottom",this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0,paddingBottom:this.safeAreaInsets&&this.safeAreaInsets.bottom||0,backgroundColor:this.bg},t||(this.showPopup=!0,this.showTrans=!0)},center:function(t){this.popupstyle="center",this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center"},t||(this.showPopup=!0,this.showTrans=!0)},left:function(t){this.popupstyle="left",this.ani=["slide-left"],this.transClass={position:"fixed",left:0,bottom:0,top:0,backgroundColor:this.bg,display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)},right:function(t){this.popupstyle="right",this.ani=["slide-right"],this.transClass={position:"fixed",bottom:0,right:0,top:0,backgroundColor:this.bg,display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)}}};i.default=o}).call(this,o(1)["default"])},422:function(t,i,o){"use strict";o.r(i);var n=o(423),e=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(i,t,(function(){return n[t]}))}(s);i["default"]=e.a},423:function(t,i,o){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-popup/components/uni-popup/uni-popup.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-popup/components/uni-popup/uni-popup-create-component',
    {
        'uni_modules/uni-popup/components/uni-popup/uni-popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(417))
        })
    },
    [['uni_modules/uni-popup/components/uni-popup/uni-popup-create-component']]
]);
