(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userform/userform"],{72:function(e,o,t){"use strict";(function(e){t(5);n(t(3));var o=n(t(73));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(o.default)}).call(this,t(1)["createPage"])},73:function(e,o,t){"use strict";t.r(o);var n=t(74),r=t(76);for(var i in r)"default"!==i&&function(e){t.d(o,e,(function(){return r[e]}))}(i);t(78);var s,c=t(26),u=Object(c["default"])(r["default"],n["render"],n["staticRenderFns"],!1,null,"5ec33134",null,!1,n["components"],s);u.options.__file="pages/userform/userform.vue",o["default"]=u.exports},74:function(e,o,t){"use strict";t.r(o);var n=t(75);t.d(o,"render",(function(){return n["render"]})),t.d(o,"staticRenderFns",(function(){return n["staticRenderFns"]})),t.d(o,"recyclableRender",(function(){return n["recyclableRender"]})),t.d(o,"components",(function(){return n["components"]}))},75:function(e,o,t){"use strict";var n;t.r(o),t.d(o,"render",(function(){return r})),t.d(o,"staticRenderFns",(function(){return s})),t.d(o,"recyclableRender",(function(){return i})),t.d(o,"components",(function(){return n}));try{n={uForm:function(){return t.e("uview-ui/components/u-form/u-form").then(t.bind(null,379))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,386))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-input/u-input")]).then(t.bind(null,397))},uRadioGroup:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-radio-group/u-radio-group")]).then(t.bind(null,404))},uRadio:function(){return t.e("uview-ui/components/u-radio/u-radio").then(t.bind(null,411))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,o=e.$createElement;e._self._c},i=!1,s=[];r._withStripped=!0},76:function(e,o,t){"use strict";t.r(o);var n=t(77),r=t.n(n);for(var i in n)"default"!==i&&function(e){t.d(o,e,(function(){return n[e]}))}(i);o["default"]=r.a},77:function(e,o,t){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;n(t(9));function n(e){return e&&e.__esModule?e:{default:e}}var r={onLoad:function(o){o.toPath&&(this.toPath=decodeURIComponent(o.toPath)),this.projectId=o.projectId;var t=e.getStorageSync("userData");if(t&&t.mobilePhone)this.toIndex(this.projectId);else;},data:function(){var e=this;return{secrecy:!1,showExtra:!1,showExtra1:!1,projectId:0,toPath:"",code:"",form:{userName:"",age:"",mobilePhone:"",sex:"",openid:"",extraObj:{},msgCode:""},sexList:[{name:"男",code:"1",disabled:!1},{name:"女",code:"2",disabled:!1}],yesOrNo:[{name:"是",code:"1",disabled:!1,checked:!1},{name:"否",code:"2",disabled:!1,checked:!0}],rules:{userName:[{required:!0,message:"请输入姓名",trigger:["change","blur"]}],sex:[{required:!0,message:"请选择性别",trigger:["change","blur"]}],age:[{required:!0,message:"请输入年龄",trigger:["change","blur"]}],msgCode:[{required:!0,message:"请输入短信验证码",trigger:["change","blur"]}],mobilePhone:[{required:!0,message:"请输入联系方式",trigger:["change","blur"]},{validator:function(o,t,n){return e.$u.test.mobile(t)},message:"手机号码不正确",trigger:["change","blur"]}]},countDown:60,timer:{},msgVerCode:"获取验证码",isLock:!1,codeBtnColor:"#ede3cb"}},onUnload:function(){this.timer&&this.clearTimer()},methods:{secrecyCheck:function(e){"0"==e.detail.value?this.secrecy=!0:this.secrecy=!1},toDetail:function(){e.navigateTo({url:"/pages/user/privacyProto"})},sendMsg:function(){var o=this;if(this.form.mobilePhone&&this.$u.test.mobile(this.form.mobilePhone)){this.isLock=!0;var t=this;this.$apis.postSendMsgCode({mobilePhone:this.form.mobilePhone}).then((function(n){200==n.code?(e.showToast({icon:"success",title:"验证码发送成功"}),o.timer=setInterval((function(){0==o.countDown?(o.reset(),o.timer&&o.clearTimer()):o.loading()}),1e3)):(t.reset(),e.showToast({icon:"fail",title:n.msg}))})).catch((function(e){t.reset(),console.log(e)}))}else e.showToast({icon:"fail",title:"手机号为空或格式不正确"})},loading:function(){this.isLock=!0,this.countDown-=1,this.msgVerCode=this.countDown+"秒后重发"},reset:function(){this.countDown=60,this.isLock=!1,this.msgVerCode="获取验证码"},clearTimer:function(){clearInterval(this.timer),this.timer=null},sickChange:function(e){this.showExtra1="1"==e},toOrgPath:function(o){e.redirectTo({url:decodeURIComponent(o)})},toIndex:function(o){e.switchTab({url:"/pages/index/indexNew?projectId="+o,success:function(e){console.log(e)},fail:function(e){console.log(e)}})},postLogin:function(){var o=this,t=e.getStorageSync("projectId");t||(t=0),this.form["projectId"]=t,this.$apis.postRegisterUserInfo(this.form).then((function(t){e.hideLoading(),200==t.code?(o.form.userId=t.result,e.setStorageSync("userData",o.form),o.toPath&&""!=o.toPath&&"/pages/index/indexNew"!=o.toPath?(console.log("that.toPath===="+o.toPath),o.toOrgPath(o.toPath)):(console.log("that.toIndex======"),o.toIndex(o.projectId))):(alert(t.msg),e.showToast({title:t.msg}))})).catch((function(o){e.hideLoading(),console.log(o)}))},submit:function(){var o=this;if(this.secrecy){if(this.showExtra){if(!this.form.extraObj.isSick)return void e.showToast({title:"请选择是否生病",icon:"error"});if("1"==this.form.extraObj.isSick&&!this.form.extraObj.sickDesc)return void e.showToast({title:"请输入自评",icon:"error"})}var t=this;e.showLoading({title:"信息提交中"}),this.$refs.uForm.validate((function(n){if(n){var r=e.getStorageSync("openid");r&&""!=r?(console.log("openid not null"),o.form.openid=r,t.postLogin()):(console.log("openid is null"+r),e.login({provider:"weixin",success:function(o){t.$apis.postGetOpenid({code:o.code}).then((function(o){200==o.code?(t.form.openid=o.result,e.setStorageSync("openid",o.result),t.postLogin()):e.showToast({title:o.msg,icon:"error",duration:3e3})}))}}))}else console.log("验证失败")}))}else e.showToast({title:"请选择同意用户隐私协议",icon:"none"})}},onReady:function(){this.$refs.uForm.setRules(this.rules)}};o.default=r}).call(this,t(1)["default"])},78:function(e,o,t){"use strict";t.r(o);var n=t(79),r=t.n(n);for(var i in n)"default"!==i&&function(e){t.d(o,e,(function(){return n[e]}))}(i);o["default"]=r.a},79:function(e,o,t){}},[[72,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/userform/userform.js.map