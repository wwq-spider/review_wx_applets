(function(e){function t(t){for(var r,i,u=t[0],s=t[1],c=t[2],f=0,d=[];f<u.length;f++)i=u[f],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={index:0},a=[];function i(e){return u.p+"static/js/"+({"pages-index-index":"pages-index-index","pages-questions-questions~pages-report-report~pages-userform-userform":"pages-questions-questions~pages-report-report~pages-userform-userform","pages-questions-questions":"pages-questions-questions","pages-report-report":"pages-report-report","pages-userform-userform":"pages-userform-userform"}[e]||e)+"."+{"pages-index-index":"145c104a","pages-questions-questions~pages-report-report~pages-userform-userform":"56ff6498","pages-questions-questions":"3c11afc0","pages-report-report":"d00174d5","pages-userform-userform":"d1ff01ac"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var a,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=i(e);var c=new Error;a=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",c.name="ChunkLoadError",c.type=r,c.request=a,n[1](c)}o[e]=void 0}};var f=setTimeout((function(){a({type:"timeout",target:s})}),12e4);s.onerror=s.onload=a,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="./",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("5338")},"012a":function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.sort((function(){return Math.random()-.5}))}n("4e82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r;t.default=o},"0c55":function(e,t,n){"use strict";n.r(t);var r=n("586e"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},"0cb9":function(e,t,n){var r=n("fa09");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var o=n("4f06").default;o("72344d66",r,!0,{sourceMap:!1,shadowMode:!1})},1479:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r="1.8.4",o={v:r,version:r,type:["primary","success","info","error","warning"]};t.default=o},"18eb":function(e,t,n){"use strict";var r=n("4ea4");n("99af"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=a;var o=r(n("63c9"));function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"auto",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"rpx";return e=String(e),o.default.number(e)?"".concat(e).concat(t):e}},"19d7":function(e,t,n){"use strict";var r=n("4ea4");n("c975"),n("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("d4ec")),a=r(n("bee2")),i=r(n("4d88")),u=r(n("63c9")),s=function(){function e(){var t=this;(0,o.default)(this,e),this.config={baseUrl:"",header:{},method:"POST",dataType:"json",responseType:"text",showLoading:!0,loadingText:"请求中...",loadingTime:800,timer:null,originalData:!1,loadingMask:!0},this.interceptor={request:null,response:null},this.get=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.request({method:"GET",url:e,header:r,data:n})},this.post=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.request({url:e,method:"POST",header:r,data:n})},this.put=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.request({url:e,method:"PUT",header:r,data:n})},this.delete=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.request({url:e,method:"DELETE",header:r,data:n})}}return(0,a.default)(e,[{key:"setConfig",value:function(e){this.config=(0,i.default)(this.config,e)}},{key:"request",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(this.interceptor.request&&"function"===typeof this.interceptor.request){var n=this.interceptor.request(t);if(!1===n)return new Promise((function(){}));this.options=n}return t.dataType=t.dataType||this.config.dataType,t.responseType=t.responseType||this.config.responseType,t.url=t.url||"",t.params=t.params||{},t.header=Object.assign({},this.config.header,t.header),t.method=t.method||this.config.method,new Promise((function(n,r){t.complete=function(t){if(uni.hideLoading(),clearTimeout(e.config.timer),e.config.timer=null,e.config.originalData)if(e.interceptor.response&&"function"===typeof e.interceptor.response){var o=e.interceptor.response(t);!1!==o?n(o):r(t)}else n(t);else if(200==t.statusCode)if(e.interceptor.response&&"function"===typeof e.interceptor.response){var a=e.interceptor.response(t.data);!1!==a?n(a):r(t.data)}else n(t.data);else r(t)},t.url=u.default.url(t.url)?t.url:e.config.baseUrl+(0==t.url.indexOf("/")?t.url:"/"+t.url),e.config.showLoading&&!e.config.timer&&(e.config.timer=setTimeout((function(){uni.showLoading({title:e.config.loadingText,mask:e.config.loadingMask}),e.config.timer=null}),e.config.loadingTime)),uni.request(t)}))}}]),e}(),c=new s;t.default=c},"1bfa":function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500;uni.showToast({title:e,icon:"none",duration:t})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r;t.default=o},"25e5":function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"success",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];-1==["primary","info","error","warning","success"].indexOf(e)&&(e="success");var n="";switch(e){case"primary":n="info-circle";break;case"info":n="info-circle";break;case"error":n="close-circle";break;case"warning":n="error-circle";break;case"success":n="checkmark-circle";break;default:n="checkmark-circle"}return t&&(n+="-fill"),n}n("c975"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r;t.default=o},"3da8":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("App",{attrs:{keepAliveInclude:e.keepAliveInclude}})},a=[]},"43da":function(e,t,n){"use strict";function r(){return uni.getSystemInfoSync().platform}function o(){return uni.getSystemInfoSync()}Object.defineProperty(t,"__esModule",{value:!0}),t.os=r,t.sys=o},"4d88":function(e,t,n){"use strict";var r=n("4ea4");n("99af"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("d5fa"));function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e=(0,o.default)(e),"object"!==typeof e||"object"!==typeof t)return!1;for(var n in t)t.hasOwnProperty(n)&&(n in e?"object"!==typeof e[n]||"object"!==typeof t[n]?e[n]=t[n]:e[n].concat&&t[n].concat?e[n]=e[n].concat(t[n]):e[n]=a(e[n],t[n]):e[n]=t[n]);return e}var i=a;t.default=i},"525d":function(e,t,n){"use strict";var r=n("4ea4");n("4de4"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("c658")),a=r(n("19d7")),i=r(n("9423")),u=r(n("dc8c")),s=r(n("8bd6")),c=r(n("62e4")),f=r(n("a72a")),l=r(n("f5bd")),d=r(n("f579")),p=r(n("25e5")),g=r(n("012a")),v=r(n("d5fa")),h=r(n("4d88")),m=r(n("18eb")),y=r(n("63c9")),b=r(n("a29c")),_=r(n("bd68")),w=r(n("1bfa")),P=r(n("64fa")),x=r(n("cd19")),T=n("43da"),j=r(n("9767")),k=r(n("6257")),S=r(n("1479")),O=r(n("ca0c"));function C(e){0}var M={queryParams:i.default,route:u.default,timeFormat:s.default,date:s.default,timeFrom:c.default,colorGradient:f.default.colorGradient,colorToRgba:f.default.colorToRgba,guid:l.default,color:d.default,sys:T.sys,os:T.os,type2icon:p.default,randomArray:g.default,wranning:C,get:a.default.get,post:a.default.post,put:a.default.put,delete:a.default.delete,hexToRgb:f.default.hexToRgb,rgbToHex:f.default.rgbToHex,test:y.default,random:b.default,deepClone:v.default,deepMerge:h.default,getParent:P.default,$parent:x.default,addUnit:m.default,trim:_.default,type:["primary","success","error","warning","info"],http:a.default,toast:w.default,config:S.default,zIndex:O.default,debounce:j.default,throttle:k.default};uni.$u=M;var $=function(e){e.mixin(o.default),e.prototype.openShare&&e.mixin(mpShare),e.filter("timeFormat",(function(e,t){return(0,s.default)(e,t)})),e.filter("date",(function(e,t){return(0,s.default)(e,t)})),e.filter("timeFrom",(function(e,t){return(0,c.default)(e,t)})),e.prototype.$u=M},A={install:$};t.default=A},5338:function(e,t,n){"use strict";var r=n("4ea4"),o=r(n("5530"));n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("b8d4"),n("1c31"),n("921b");var a=r(n("e143")),i=r(n("9da2")),u=r(n("525d"));a.default.config.productionTip=!1,a.default.use(u.default);var s="100px",c=uni.getSystemInfoSync();c.screenWidth<640&&(s=c.screenWidth/640*100+"px"),a.default.prototype.$footFontSize=s,i.default.mpType="app";var f=new a.default((0,o.default)({},i.default));f.$mount()},"586e":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={onLaunch:function(){},onShow:function(){},onHide:function(){}};t.default=r},6257:function(e,t,n){"use strict";var r;function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];n?r||(r=!0,"function"===typeof e&&e(),setTimeout((function(){r=!1}),t)):r||(r=!0,setTimeout((function(){r=!1,"function"===typeof e&&e()}),t))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o;t.default=a},"62e4":function(e,t,n){"use strict";var r=n("4ea4");n("a9e3"),n("d3b7"),n("e25e"),n("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("8bd6"));function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-mm-dd";e||(e=Number(new Date)),10==e.toString().length&&(e*=1e3);var n=+new Date(Number(e)),r=(Number(new Date)-n)/1e3,a="";switch(!0){case r<300:a="刚刚";break;case r>=300&&r<3600:a=parseInt(r/60)+"分钟前";break;case r>=3600&&r<86400:a=parseInt(r/3600)+"小时前";break;case r>=86400&&r<2592e3:a=parseInt(r/86400)+"天前";break;default:a=!1===t?r>=2592e3&&r<31536e3?parseInt(r/2592e3)+"个月前":parseInt(r/31536e3)+"年前":(0,o.default)(n,t)}return a}var i=a;t.default=i},"63c9":function(e,t,n){"use strict";function r(e){return/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(e)}function o(e){return/^1[3-9]\d{9}$/.test(e)}function a(e){return/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(e)}function i(e){return!/Invalid|NaN/.test(new Date(e).toString())}function u(e){return/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)}function s(e){return/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)}function c(e){return/^\d+$/.test(e)}function f(e){return/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e)}function l(e){var t=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/,n=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;return 7===e.length?n.test(e):8===e.length&&t.test(e)}function d(e){return/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(e)}function p(e){var t=/^[\u4e00-\u9fa5]+$/gi;return t.test(e)}function g(e){return/^[a-zA-Z]*$/.test(e)}function v(e){var t=/^[0-9a-zA-Z]*$/g;return t.test(e)}function h(e,t){return e.indexOf(t)>=0}function m(e,t){return e>=t[0]&&e<=t[1]}function y(e,t){return e.length>=t[0]&&e.length<=t[1]}function b(e){var t=/^\d{3,4}-\d{7,8}(-\d{3,4})?$/;return t.test(e)}function _(e){switch(typeof e){case"undefined":return!0;case"string":if(0==e.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"").length)return!0;break;case"boolean":if(!e)return!0;break;case"number":if(0===e||isNaN(e))return!0;break;case"object":if(null===e||0===e.length)return!0;for(var t in e)return!1;return!0}return!1}function w(e){if("string"==typeof e)try{var t=JSON.parse(e);return!("object"!=typeof t||!t)}catch(n){return!1}return!1}function P(e){return"function"===typeof Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}function x(e){return"[object Object]"===Object.prototype.toString.call(e)}function T(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;return new RegExp("^\\d{".concat(t,"}$")).test(e)}n("c975"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var j={email:r,mobile:o,url:a,date:i,dateISO:u,number:s,digits:c,idCard:f,carNo:l,amount:d,chinese:p,letter:g,enOrNum:v,contains:h,range:m,rangeLength:y,empty:_,isEmpty:_,jsonString:w,landline:b,object:x,array:P,code:T};t.default=j},"64fa":function(e,t,n){"use strict";function r(e,t){var n=this.$parent;while(n)if(n.$options.name!==e)n=n.$parent;else{var r=function(){var e={};if(Array.isArray(t))t.map((function(t){e[t]=n[t]?n[t]:""}));else for(var r in t)Array.isArray(t[r])?t[r].length?e[r]=t[r]:e[r]=n[r]:t[r].constructor===Object?Object.keys(t[r]).length?e[r]=t[r]:e[r]=n[r]:e[r]=t[r]||!1===t[r]?t[r]:n[r];return{v:e}}();if("object"===typeof r)return r.v}return{}}n("d81d"),n("b64b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},7967:function(e,t,n){"use strict";var r=n("0cb9"),o=n.n(r);o.a},"84c0":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={pages:{"pages/index/index":{titleNView:!1},"pages/userform/userform":{navigationBarTitleText:"基本信息",enablePullDownRefresh:!1},"pages/questions/questions":{navigationBarTitleText:"测试评估",enablePullDownRefresh:!1},"pages/report/report":{navigationBarTitleText:"评估报告",enablePullDownRefresh:!1}},globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"儿童在线免费测评系统",navigationBarBackgroundColor:"#FFFFFF",backgroundColor:"#FFC92A"}};t.default=r},"8bd6":function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-mm-dd";e||(e=Number(new Date)),10==e.toString().length&&(e*=1e3);var n,r=new Date(e),o={"y+":r.getFullYear().toString(),"m+":(r.getMonth()+1).toString(),"d+":r.getDate().toString(),"h+":r.getHours().toString(),"M+":r.getMinutes().toString(),"s+":r.getSeconds().toString()};for(var a in o)n=new RegExp("("+a+")").exec(t),n&&(t=t.replace(n[1],1==n[1].length?o[a]:o[a].padStart(n[1].length,"0")));return t}n("fb6a"),n("a9e3"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("4d90"),n("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,String.prototype.padStart||(String.prototype.padStart=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";if("[object String]"!==Object.prototype.toString.call(t))throw new TypeError("fillString must be String");var n=this;if(n.length>=e)return String(n);var r=e-n.length,o=Math.ceil(r/t.length);while(o>>=1)t+=t,1===o&&(t+=t);return t.slice(0,r)+n});var o=r;t.default=o},9423:function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"brackets",r=t?"?":"",o=[];-1==["indices","brackets","repeat","comma"].indexOf(n)&&(n="brackets");var a=function(t){var r=e[t];if(["",void 0,null].indexOf(r)>=0)return"continue";if(r.constructor===Array)switch(n){case"indices":for(var a=0;a<r.length;a++)o.push(t+"["+a+"]="+r[a]);break;case"brackets":r.forEach((function(e){o.push(t+"[]="+e)}));break;case"repeat":r.forEach((function(e){o.push(t+"="+e)}));break;case"comma":var i="";r.forEach((function(e){i+=(i?",":"")+e})),o.push(t+"="+i);break;default:r.forEach((function(e){o.push(t+"[]="+e)}))}else o.push(t+"="+r)};for(var i in e)a(i);return o.length?r+o.join("&"):""}n("4160"),n("c975"),n("a15b"),n("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r;t.default=o},9767:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=null;function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(null!==r&&clearTimeout(r),n){var o=!r;r=setTimeout((function(){r=null}),t),o&&"function"===typeof e&&e()}else r=setTimeout((function(){"function"===typeof e&&e()}),t)}var a=o;t.default=a},"9da2":function(e,t,n){"use strict";n.r(t);var r=n("3da8"),o=n("0c55");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("7967");var i,u=n("f0c5"),s=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=s.exports},a29c:function(e,t,n){"use strict";function r(e,t){if(e>=0&&t>0&&t>=e){var n=t-e+1;return Math.floor(Math.random()*n+e)}return 0}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r;t.default=o},a72a:function(e,t,n){"use strict";function r(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"rgb(0, 0, 0)",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"rgb(255, 255, 255)",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,r=o(e,!1),i=r[0],u=r[1],s=r[2],c=o(t,!1),f=c[0],l=c[1],d=c[2],p=(f-i)/n,g=(l-u)/n,v=(d-s)/n,h=[],m=0;m<n;m++){var y=a("rgb("+Math.round(p*m+i)+","+Math.round(g*m+u)+","+Math.round(v*m+s)+")");h.push(y)}return h}function o(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;if(e=e.toLowerCase(),e&&n.test(e)){if(4===e.length){for(var r="#",o=1;o<4;o+=1)r+=e.slice(o,o+1).concat(e.slice(o,o+1));e=r}for(var a=[],i=1;i<7;i+=2)a.push(parseInt("0x"+e.slice(i,i+2)));return t?"rgb(".concat(a[0],",").concat(a[1],",").concat(a[2],")"):a}if(/^(rgb|RGB)/.test(e)){var u=e.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");return u.map((function(e){return Number(e)}))}return e}function a(e){var t=e,n=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;if(/^(rgb|RGB)/.test(t)){for(var r=t.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(","),o="#",a=0;a<r.length;a++){var i=Number(r[a]).toString(16);i=1==String(i).length?"0"+i:i,"0"===i&&(i+=i),o+=i}return 7!==o.length&&(o=t),o}if(!n.test(t))return t;var u=t.replace(/#/,"").split("");if(6===u.length)return t;if(3===u.length){for(var s="#",c=0;c<u.length;c+=1)s+=u[c]+u[c];return s}}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.3;e=a(e);var n=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,r=e.toLowerCase();if(r&&n.test(r)){if(4===r.length){for(var o="#",i=1;i<4;i+=1)o+=r.slice(i,i+1).concat(r.slice(i,i+1));r=o}for(var u=[],s=1;s<7;s+=2)u.push(parseInt("0x"+r.slice(s,s+2)));return"rgba("+u.join(",")+","+t+")"}return r}n("99af"),n("a15b"),n("d81d"),n("fb6a"),n("a9e3"),n("d3b7"),n("e25e"),n("ac1f"),n("25f0"),n("5319"),n("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={colorGradient:r,hexToRgb:o,rgbToHex:a,colorToRgba:i};t.default=u},b8d4:function(e,t,n){"use strict";(function(e){var t=n("4ea4"),r=t(n("e143"));e["________"]=!0,delete e["________"],e.__uniConfig={globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"儿童在线免费测评系统",navigationBarBackgroundColor:"#FFFFFF",backgroundColor:"#FFC92A"},easycom:{"^u-(.*)":"@/uview-ui/components/u-$1/u-$1.vue","^unicloud-db$":"@dcloudio/uni-cli-shared/components/unicloud-db.vue","^page-meta$":"@dcloudio/uni-cli-shared/components/page-meta.vue","^navigation-bar$":"@dcloudio/uni-cli-shared/components/navigation-bar.vue","^uni-match-media$":"@dcloudio/uni-cli-shared/components/uni-match-media.vue"}},e.__uniConfig.compilerVersion="3.1.18",e.__uniConfig.router={mode:"hash",base:"./"},e.__uniConfig.publicPath="./",e.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},e.__uniConfig.debug=!1,e.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},e.__uniConfig.sdkConfigs={maps:{}},e.__uniConfig.qqMapKey="XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2",e.__uniConfig.nvue={"flex-direction":"column"},e.__uniConfig.__webpack_chunk_load__=n.e,r.default.component("pages-index-index",(function(e){var t={component:n.e("pages-index-index").then(function(){return e(n("6eb7"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-userform-userform",(function(e){var t={component:Promise.all([n.e("pages-questions-questions~pages-report-report~pages-userform-userform"),n.e("pages-userform-userform")]).then(function(){return e(n("a870"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-questions-questions",(function(e){var t={component:Promise.all([n.e("pages-questions-questions~pages-report-report~pages-userform-userform"),n.e("pages-questions-questions")]).then(function(){return e(n("4c01"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-report-report",(function(e){var t={component:Promise.all([n.e("pages-questions-questions~pages-report-report~pages-userform-userform"),n.e("pages-report-report")]).then(function(){return e(n("1bb4"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),e.__uniRoutes=[{path:"/",alias:"/pages/index/index",component:{render:function(e){return e("Page",{props:Object.assign({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{titleNView:!1})},[e("pages-index-index",{slot:"page"})])}},meta:{id:1,name:"pages-index-index",isNVue:!1,maxWidth:0,pagePath:"pages/index/index",isQuit:!0,isEntry:!0,windowTop:0}},{path:"/pages/userform/userform",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"基本信息",enablePullDownRefresh:!1})},[e("pages-userform-userform",{slot:"page"})])}},meta:{name:"pages-userform-userform",isNVue:!1,maxWidth:0,pagePath:"pages/userform/userform",windowTop:44}},{path:"/pages/questions/questions",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"测试评估",enablePullDownRefresh:!1})},[e("pages-questions-questions",{slot:"page"})])}},meta:{name:"pages-questions-questions",isNVue:!1,maxWidth:0,pagePath:"pages/questions/questions",windowTop:44}},{path:"/pages/report/report",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"评估报告",enablePullDownRefresh:!1})},[e("pages-report-report",{slot:"page"})])}},meta:{name:"pages-report-report",isNVue:!1,maxWidth:0,pagePath:"pages/report/report",windowTop:44}},{path:"/preview-image",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-preview-image",{slot:"page"})])}},meta:{name:"preview-image",pagePath:"/preview-image"}},{path:"/choose-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}],e.UniApp&&new e.UniApp}).call(this,n("c8ba"))},bd68:function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"both";return"both"==t?e.replace(/^\s+|\s+$/g,""):"left"==t?e.replace(/^\s*/,""):"right"==t?e.replace(/(\s*$)/g,""):"all"==t?e.replace(/\s+/g,""):e}n("ac1f"),n("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r;t.default=o},c658:function(e,t,n){n("d81d"),n("a434"),n("b64b"),n("d3b7"),n("ac1f"),e.exports={data:function(){return{}},onLoad:function(){this.$u.getRect=this.$uGetRect},methods:{$uGetRect:function(e,t){var n=this;return new Promise((function(r){uni.createSelectorQuery().in(n)[t?"selectAll":"select"](e).boundingClientRect((function(e){t&&Array.isArray(e)&&e.length&&r(e),!t&&e&&r(e)})).exec()}))},getParentData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.parent||(this.parent=!1),this.parent=this.$u.$parent.call(this,t),this.parent&&Object.keys(this.parentData).map((function(t){e.parentData[t]=e.parent[t]}))},preventEvent:function(e){e&&e.stopPropagation&&e.stopPropagation()}},onReachBottom:function(){uni.$emit("uOnReachBottom")},beforeDestroy:function(){var e=this;if(this.parent&&uni.$u.test.array(this.parent.children)){var t=this.parent.children;t.map((function(n,r){n===e&&t.splice(r,1)}))}}}},ca0c:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={toast:10090,noNetwork:10080,popup:10075,mask:10070,navbar:980,topTips:975,sticky:970,indexListSticky:965};t.default=r},cd19:function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,t=this.$parent;while(t){if(!t.$options||t.$options.name===e)return t;t=t.$parent}return!1}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},d5fa:function(e,t,n){"use strict";function r(e){return"[object Array]"===Object.prototype.toString.call(e)}function o(e){if([null,void 0,NaN,!1].includes(e))return e;if("object"!==typeof e&&"function"!==typeof e)return e;var t=r(e)?[]:{};for(var n in e)e.hasOwnProperty(n)&&(t[n]="object"===typeof e[n]?o(e[n]):e[n]);return t}n("caad"),n("d3b7"),n("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o;t.default=a},dc8c:function(e,t,n){"use strict";var r=n("4ea4");n("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var o=r(n("1da1")),a=r(n("d4ec")),i=r(n("bee2")),u=function(){function e(){(0,a.default)(this,e),this.config={type:"navigateTo",url:"",delta:1,params:{},animationType:"pop-in",animationDuration:300,intercept:!1},this.route=this.route.bind(this)}return(0,i.default)(e,[{key:"addRootPath",value:function(e){return"/"===e[0]?e:"/".concat(e)}},{key:"mixinParam",value:function(e,t){e=e&&this.addRootPath(e);var n="";return/.*\/.*\?.*=.*/.test(e)?(n=uni.$u.queryParams(t,!1),e+"&"+n):(n=uni.$u.queryParams(t),e+n)}},{key:"route",value:function(){var e=(0,o.default)(regeneratorRuntime.mark((function e(){var t,n,r,o,a=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=a.length>0&&void 0!==a[0]?a[0]:{},n=a.length>1&&void 0!==a[1]?a[1]:{},r={},"string"===typeof t?(r.url=this.mixinParam(t,n),r.type="navigateTo"):(r=uni.$u.deepClone(t,this.config),r.url=this.mixinParam(t.url,t.params)),n.intercept&&(this.config.intercept=n.intercept),r.params=n,r=uni.$u.deepMerge(this.config,r),"function"!==typeof uni.$u.routeIntercept){e.next=14;break}return e.next=10,new Promise((function(e,t){uni.$u.routeIntercept(r,e)}));case 10:o=e.sent,o&&this.openPage(r),e.next=15;break;case 14:this.openPage(r);case 15:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"openPage",value:function(e){var t=e.url,n=(e.type,e.delta),r=e.animationType,o=e.animationDuration;"navigateTo"!=e.type&&"to"!=e.type||uni.navigateTo({url:t,animationType:r,animationDuration:o}),"redirectTo"!=e.type&&"redirect"!=e.type||uni.redirectTo({url:t}),"switchTab"!=e.type&&"tab"!=e.type||uni.switchTab({url:t}),"reLaunch"!=e.type&&"launch"!=e.type||uni.reLaunch({url:t}),"navigateBack"!=e.type&&"back"!=e.type||uni.navigateBack({delta:n})}}]),e}(),s=(new u).route;t.default=s},f579:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={primary:"#2979ff",primaryDark:"#2b85e4",primaryDisabled:"#a0cfff",primaryLight:"#ecf5ff",bgColor:"#f3f4f6",info:"#909399",infoDark:"#82848a",infoDisabled:"#c8c9cc",infoLight:"#f4f4f5",warning:"#ff9900",warningDark:"#f29100",warningDisabled:"#fcbd71",warningLight:"#fdf6ec",error:"#fa3534",errorDark:"#dd6161",errorDisabled:"#fab6b6",errorLight:"#fef0f0",success:"#19be6b",successDark:"#18b566",successDisabled:"#71d5a1",successLight:"#dbf1e1",mainColor:"#303133",contentColor:"#606266",tipsColor:"#909399",lightColor:"#c0c4cc",borderColor:"#e4e7ed"},o=r;t.default=o},f5bd:function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),o=[];if(n=n||r.length,e)for(var a=0;a<e;a++)o[a]=r[0|Math.random()*n];else{var i;o[8]=o[13]=o[18]=o[23]="-",o[14]="4";for(var u=0;u<36;u++)o[u]||(i=0|16*Math.random(),o[u]=r[19==u?3&i|8:i])}return t?(o.shift(),"u"+o.join("")):o.join("")}n("a15b"),n("ac1f"),n("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r;t.default=o},fa09:function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*每个页面公共css */body{font-size:16px}.uni-progress-bar{border-radius:20px}.uni-progress-inner-bar{border-radius:20px}.combg{width:%?630?%;padding:%?32?%;margin:%?40?% auto;background:#fff;box-shadow:0 %?40?% 0 %?-22?% rgb(221 138 0/23%),0 %?-9?% 0 0 rgb(105 100 87/14%) inset;border-radius:%?50?%}.uicon{vertical-align:middle}.listtitle{text-align:left;width:%?686?%;margin:0 auto}.listtitle .titlea{width:%?44?%;height:%?44?%;vertical-align:middle;margin-right:%?5?%}.listtitle uni-text{font-weight:bolder;vertical-align:middle;font-size:%?34?%;color:#594e3f}",""]),e.exports=t},ff9a:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={appid:""};t.default=r}});