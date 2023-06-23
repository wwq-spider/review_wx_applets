(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userform/userform"],{72:function(e,t,o){"use strict";(function(e){o(5);n(o(3));var t=n(o(73));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(t.default)}).call(this,o(1)["createPage"])},73:function(e,t,o){"use strict";o.r(t);var n=o(74),r=o(76);for(var i in r)"default"!==i&&function(e){o.d(t,e,(function(){return r[e]}))}(i);o(78);var s,c=o(26),u=Object(c["default"])(r["default"],n["render"],n["staticRenderFns"],!1,null,"5ec33134",null,!1,n["components"],s);u.options.__file="pages/userform/userform.vue",t["default"]=u.exports},74:function(e,t,o){"use strict";o.r(t);var n=o(75);o.d(t,"render",(function(){return n["render"]})),o.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),o.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),o.d(t,"components",(function(){return n["components"]}))},75:function(e,t,o){"use strict";var n;o.r(t),o.d(t,"render",(function(){return r})),o.d(t,"staticRenderFns",(function(){return s})),o.d(t,"recyclableRender",(function(){return i})),o.d(t,"components",(function(){return n}));try{n={uForm:function(){return o.e("uview-ui/components/u-form/u-form").then(o.bind(null,357))},uFormItem:function(){return Promise.all([o.e("common/vendor"),o.e("uview-ui/components/u-form-item/u-form-item")]).then(o.bind(null,364))},uInput:function(){return Promise.all([o.e("common/vendor"),o.e("uview-ui/components/u-input/u-input")]).then(o.bind(null,375))},uRadioGroup:function(){return Promise.all([o.e("common/vendor"),o.e("uview-ui/components/u-radio-group/u-radio-group")]).then(o.bind(null,382))},uRadio:function(){return o.e("uview-ui/components/u-radio/u-radio").then(o.bind(null,389))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,s=[];r._withStripped=!0},76:function(e,t,o){"use strict";o.r(t);var n=o(77),r=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,(function(){return n[e]}))}(i);t["default"]=r.a},77:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(o(9));function r(e){return e&&e.__esModule?e:{default:e}}var i={onLoad:function(t){t.toPath&&(this.toPath=decodeURIComponent(t.toPath)),this.projectId=t.projectId;var o=e.getStorageSync("userData");if(o&&o.mobilePhone)this.toIndex(this.projectId);else{var r=this;n.default.checkLogin((function(t){e.setStorageSync("userData",t),r.toPath&&""!=r.toPath?r.toOrgPath(r.toPath):r.toIndex(r.projectId)}))}},data:function(){var e=this;return{secrecy:!1,showExtra:!1,showExtra1:!1,projectId:0,toPath:"",code:"",form:{userName:"",age:"",mobilePhone:"",sex:"",openid:"",extraObj:{},msgCode:""},sexList:[{name:"男",code:"1",disabled:!1},{name:"女",code:"2",disabled:!1}],yesOrNo:[{name:"是",code:"1",disabled:!1,checked:!1},{name:"否",code:"2",disabled:!1,checked:!0}],rules:{userName:[{required:!0,message:"请输入姓名",trigger:["change","blur"]}],sex:[{required:!0,message:"请选择性别",trigger:["change","blur"]}],age:[{required:!0,message:"请输入年龄",trigger:["change","blur"]}],msgCode:[{required:!0,message:"请输入短信验证码",trigger:["change","blur"]}],mobilePhone:[{required:!0,message:"请输入联系方式",trigger:["change","blur"]},{validator:function(t,o,n){return e.$u.test.mobile(o)},message:"手机号码不正确",trigger:["change","blur"]}]},countDown:60,timer:{},msgVerCode:"获取验证码",isLock:!1,codeBtnColor:"#ede3cb"}},onUnload:function(){this.timer&&this.clearTimer()},methods:{secrecyCheck:function(e){"0"==e.detail.value?this.secrecy=!0:this.secrecy=!1},toDetail:function(){e.navigateTo({url:"/pages/user/privacyProto"})},sendMsg:function(){var t=this;if(this.form.mobilePhone&&this.$u.test.mobile(this.form.mobilePhone)){this.isLock=!0;var o=this;this.$apis.postSendMsgCode({mobilePhone:this.form.mobilePhone}).then((function(n){200==n.code?(e.showToast({icon:"success",title:"验证码发送成功"}),t.timer=setInterval((function(){0==t.countDown?(t.reset(),t.timer&&t.clearTimer()):t.loading()}),1e3)):(o.reset(),e.showToast({icon:"fail",title:n.msg}))})).catch((function(e){o.reset(),console.log(e)}))}else e.showToast({icon:"fail",title:"手机号为空或格式不正确"})},loading:function(){this.isLock=!0,this.countDown-=1,this.msgVerCode=this.countDown+"秒后重发"},reset:function(){this.countDown=60,this.isLock=!1,this.msgVerCode="获取验证码"},clearTimer:function(){clearInterval(this.timer),this.timer=null},sickChange:function(e){this.showExtra1="1"==e},toOrgPath:function(t){e.redirectTo({url:decodeURIComponent(t)})},toIndex:function(t){e.switchTab({url:"/pages/index/index?projectId="+t,success:function(e){console.log(e)},fail:function(e){console.log(e)}})},postLogin:function(){var t=this,o=e.getStorageSync("projectId");o||(o=0),this.form["projectId"]=o,this.$apis.postRegisterUserInfo(this.form).then((function(o){e.hideLoading(),200==o.code?(t.form.userId=o.result,e.setStorageSync("userData",t.form),t.toPath&&""!=t.toPath?t.toOrgPath(t.toPath):t.toIndex(t.projectId)):e.showToast({title:o.msg})})).catch((function(t){e.hideLoading(),console.log(t)}))},submit:function(){var t=this;if(this.secrecy){if(this.showExtra){if(!this.form.extraObj.isSick)return void e.showToast({title:"请选择是否生病",icon:"error"});if("1"==this.form.extraObj.isSick&&!this.form.extraObj.sickDesc)return void e.showToast({title:"请输入自评",icon:"error"})}var o=this;e.showLoading({title:"信息提交中"}),this.$refs.uForm.validate((function(n){if(n){var r=e.getStorageSync("openid");r&&""!=r?(t.form.openid=r,o.postLogin()):e.login({provider:"weixin",success:function(t){o.$apis.postGetOpenid({code:t.code}).then((function(t){200==t.code?(o.form.openid=t.result,e.setStorageSync("openid",t.result),o.postLogin()):e.showToast({title:t.msg,icon:"error",duration:3e3})}))}})}else console.log("验证失败")}))}else e.showToast({title:"请选择同意用户隐私协议",icon:"none"})}},onReady:function(){this.$refs.uForm.setRules(this.rules)}};t.default=i}).call(this,o(1)["default"])},78:function(e,t,o){"use strict";o.r(t);var n=o(79),r=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,(function(){return n[e]}))}(i);t["default"]=r.a},79:function(e,t,o){}},[[72,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/userform/userform.js.map