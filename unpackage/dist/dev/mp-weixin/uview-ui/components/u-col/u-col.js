(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-col/u-col"],{436:function(t,n,e){"use strict";e.r(n);var r=e(437),u=e(439);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e(441);var o,s=e(26),c=Object(s["default"])(u["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],o);c.options.__file="uview-ui/components/u-col/u-col.vue",n["default"]=c.exports},437:function(t,n,e){"use strict";e.r(n);var r=e(438);e.d(n,"render",(function(){return r["render"]})),e.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),e.d(n,"components",(function(){return r["components"]}))},438:function(t,n,e){"use strict";var r;e.r(n),e.d(n,"render",(function(){return u})),e.d(n,"staticRenderFns",(function(){return o})),e.d(n,"recyclableRender",(function(){return i})),e.d(n,"components",(function(){return r}));var u=function(){var t=this,n=t.$createElement,e=(t._self._c,Number(t.gutter));t.$mp.data=Object.assign({},{$root:{m0:e}})},i=!1,o=[];u._withStripped=!0},439:function(t,n,e){"use strict";e.r(n);var r=e(440),u=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=u.a},440:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"u-col",props:{span:{type:[Number,String],default:12},offset:{type:[Number,String],default:0},justify:{type:String,default:"start"},align:{type:String,default:"center"},textAlign:{type:String,default:"left"},stop:{type:Boolean,default:!0}},data:function(){return{gutter:20}},created:function(){this.parent=!1},mounted:function(){this.parent=this.$u.$parent.call(this,"u-row"),this.parent&&(this.gutter=this.parent.gutter)},computed:{uJustify:function(){return"end"==this.justify||"start"==this.justify?"flex-"+this.justify:"around"==this.justify||"between"==this.justify?"space-"+this.justify:this.justify},uAlignItem:function(){return"top"==this.align?"flex-start":"bottom"==this.align?"flex-end":this.align}},methods:{click:function(t){this.$emit("click")}}};n.default=r},441:function(t,n,e){"use strict";e.r(n);var r=e(442),u=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=u.a},442:function(t,n,e){}}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uview-ui/components/u-col/u-col.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-col/u-col-create-component',
    {
        'uview-ui/components/u-col/u-col-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(436))
        })
    },
    [['uview-ui/components/u-col/u-col-create-component']]
]);
