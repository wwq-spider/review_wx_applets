(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"013c":function(t,e,n){"use strict";n("c975"),n("a9e3"),n("acd8"),n("ac1f"),n("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={type:"scrolldone",target:{id:"",offsetLeft:0,offsetTop:0,dataset:{}},currentTarget:{id:"",offsetLeft:0,offsetTop:0,dataset:{}},detail:{}},i={props:{backgroundTextStyle:{type:String,default:"dark",validator:function(t){return-1!==["dark","light"].indexOf(t)}},backgroundColor:{type:String,default:"#ffffff"},backgroundColorTop:{type:String,default:"#ffffff"},backgroundColorBottom:{type:String,default:"#ffffff"},scrollTop:{type:String,default:""},scrollDuration:{type:Number,default:300},pageStyle:{type:String,default:""},enablePullDownRefresh:{type:[Boolean,String],default:!1},rootFontSize:{type:String,default:""}},created:function(){var t=this,e=getCurrentPages()[0];this.$pageVm=e.$vm||e,uni.onWindowResize((function(e){t.$emit("resize",e)})),this.$pageVm.$on("hook:onPageScroll",(function(e){t.$emit("scroll",e)})),this.$watch("backgroundTextStyle",(function(){t.setBackgroundTextStyle()})),this.$watch((function(){return[t.rootFontSize,t.pageStyle]}),(function(){t.setPageMeta()})),this.$watch((function(){return[t.backgroundColor,t.backgroundColorTop,t.backgroundColorBottom]}),(function(){t.setBackgroundColor()})),this.$watch((function(){return[t.scrollTop,t.scrollDuration]}),(function(){t.pageScrollTo()}))},beforeMount:function(){this.setBackgroundColor(),(this.rootFontSize||this.pageStyle)&&this.setPageMeta(),this.backgroundTextStyle&&this.setBackgroundTextStyle(),this.scrollTop&&this.pageScrollTo()},methods:{setPullDownRefresh:function(t,e){t.setStyle({pullToRefresh:{support:e,style:"Android"===plus.os.name?"circle":"default"}})},setPageMeta:function(){uni.setPageMeta({pageStyle:this.pageStyle,rootFontSize:this.rootFontSize})},setBackgroundTextStyle:function(){},setBackgroundColor:function(){},pageScrollTo:function(){var t=this,e=String(this.scrollTop);if(-1!==e.indexOf("rpx")&&(e=uni.upx2px(e.replace("rpx",""))),e=parseFloat(e),!isNaN(e)){var n=function n(i){i.scrollTop===e&&(t.$pageVm.$off("hook:onPageScroll",n),t.$emit("scrolldone",o))};uni.pageScrollTo({scrollTop:e,duration:this.scrollDuration,success:function(){t.$pageVm.$on("hook:onPageScroll",n)}})}}}};e.default=i},"0e27":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticStyle:{display:"none"}},[t._t("default")],2)},a=[]},"25a6":function(t,e,n){t.exports=n.p+"static/img/banner.e0a59f5d.png"},"2e9e":function(t,e,n){var o=n("24fb");e=o(!1),e.push([t.i,".content[data-v-5899e5f8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.banner[data-v-5899e5f8]{width:%?755?%;height:%?522?%;margin-bottom:%?60?%}.question[data-v-5899e5f8]{width:%?636?%;background:#fff;padding:%?32?%;box-shadow:0 0 %?28?% 0 rgb(155 153 146/18%);border-radius:%?50?%;margin:%?40?% auto;display:-webkit-box;display:-webkit-flex;display:flex}.questionl .questionlimg[data-v-5899e5f8]{width:%?180?%;height:%?233?%}.questionr[data-v-5899e5f8]{padding-left:%?24?%}.questionr .title[data-v-5899e5f8]{color:#594e3f;font-size:%?32?%;font-weight:700}.questionr .subtitle[data-v-5899e5f8]{font-size:%?26?%;color:#857f77;margin:%?24?% 0 %?24?% 0;line-height:1.6}.questionr .conbottom[data-v-5899e5f8]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.questionr .agescope[data-v-5899e5f8]{font-size:%?24?%;color:#ff9912}.questionr .testbutton[data-v-5899e5f8]{width:%?140?%;line-height:%?54?%;background:#febd00;border-radius:%?27?%;text-align:center;font-size:%?26?%;color:#fff}",""]),t.exports=e},"48cd":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{footSize:this.$footFontSize}},onLoad:function(){},methods:{}};e.default=o},"542b":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var o={pageMeta:n("6d42").default},i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",[o("v-uni-view",{staticClass:"content"},[o("page-meta",{attrs:{"root-font-size":t.footSize}}),o("v-uni-image",{staticClass:"banner",attrs:{src:n("25a6")}}),o("v-uni-view",{staticClass:"listtitle"},[o("v-uni-image",{staticClass:"titlea",attrs:{src:n("e7cf")}}),o("v-uni-text",[t._v("测评题目")])],1),o("v-uni-view",{staticClass:"question"},[o("v-uni-view",{staticClass:"questionl"},[o("v-uni-image",{staticClass:"questionlimg",attrs:{src:n("c6d3")}})],1),o("v-uni-view",{staticClass:"questionr"},[o("v-uni-view",{staticClass:"title"},[t._v("SNAP-IV评定量表")]),o("v-uni-view",{staticClass:"subtitle"},[t._v("辅助诊断以及治疗疗效与症状改善程度的评估,为父母、教师共用")]),o("v-uni-view",{staticClass:"conbottom"},[o("v-uni-view",{staticClass:"agescope"},[t._v("适合6～18岁儿童青少年")]),o("v-uni-navigator",{attrs:{url:"/pages/userform/userform","open-type":"navigate"}},[o("v-uni-view",{staticClass:"testbutton"},[t._v("立即测试")])],1)],1)],1)],1)],1)],1)},a=[]},"6d42":function(t,e,n){"use strict";n.r(e);var o=n("0e27"),i=n("8f28");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);var r,s=n("f0c5"),u=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=u.exports},"6eb7":function(t,e,n){"use strict";n.r(e);var o=n("542b"),i=n("8135");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("6feb");var r,s=n("f0c5"),u=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"5899e5f8",null,!1,o["a"],r);e["default"]=u.exports},"6feb":function(t,e,n){"use strict";var o=n("df8e"),i=n.n(o);i.a},8135:function(t,e,n){"use strict";n.r(e);var o=n("48cd"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"8f28":function(t,e,n){"use strict";n.r(e);var o=n("013c"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},c6d3:function(t,e,n){t.exports=n.p+"static/img/study.aa85c9c4.png"},df8e:function(t,e,n){var o=n("2e9e");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("adf9a49a",o,!0,{sourceMap:!1,shadowMode:!1})},e7cf:function(t,e){t.exports="data:image/png;base64,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"}}]);