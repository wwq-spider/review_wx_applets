(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/questions/questions"],{80:function(e,t,s){"use strict";(function(e){s(5);o(s(3));var t=o(s(81));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=s,e(t.default)}).call(this,s(1)["createPage"])},81:function(e,t,s){"use strict";s.r(t);var o=s(82),n=s(84);for(var i in n)"default"!==i&&function(e){s.d(t,e,(function(){return n[e]}))}(i);s(86);var r,c=s(26),a=Object(c["default"])(n["default"],o["render"],o["staticRenderFns"],!1,null,"28fc5ea2",null,!1,o["components"],r);a.options.__file="pages/questions/questions.vue",t["default"]=a.exports},82:function(e,t,s){"use strict";s.r(t);var o=s(83);s.d(t,"render",(function(){return o["render"]})),s.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),s.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),s.d(t,"components",(function(){return o["components"]}))},83:function(e,t,s){"use strict";var o;s.r(t),s.d(t,"render",(function(){return n})),s.d(t,"staticRenderFns",(function(){return r})),s.d(t,"recyclableRender",(function(){return i})),s.d(t,"components",(function(){return o}));try{o={uLineProgress:function(){return s.e("uview-ui/components/u-line-progress/u-line-progress").then(s.bind(null,418))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var e=this,t=e.$createElement;e._self._c},i=!1,r=[];n._withStripped=!0},84:function(e,t,s){"use strict";s.r(t);var o=s(85),n=s.n(o);for(var i in o)"default"!==i&&function(e){s.d(t,e,(function(){return o[e]}))}(i);t["default"]=n.a},85:function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;o(s(9));function o(e){return e&&e.__esModule?e:{default:e}}var n={data:function(){return{firstfloorindex:0,questionIndex:0,capitalindex:["一","二","三","四","五","六"],questionList:[],lock:!1,title:"",source:"",curTimeStamp:0,classCount:0,classId:"",videoAnalysis:!1,monitorTimer:{},healthAnalysisResult:{},showCamera:!1,cameraContext:{},reviewRecordKey:"",evalCode:"",select:"",school:"",userId:"",name:"",sex:"",age:"",paramListAgain:[]}},onUnload:function(){"1"!=this.source&&e.switchTab({url:"/pages/index/index",success:function(e){console.log(e)},fail:function(e){console.log(e)}}),this.videoAnalysis&&(this.closeCamera(),clearTimeout(this.monitorTimer))},onLoad:function(t){this.classId=t.classId,this.reviewRecordKey=this.classId+"_record",this.firstfloorindex=this.getNextIndex(t.classId,!0),this.questionIndex=0,this.cursor=0;if(t.source&&(this.source=t.source),t.title&&(this.title=decodeURIComponent(t.title)),t.userId&&(this.userId=t.userId),t.name&&(this.name=decodeURIComponent(decodeURIComponent(t.name))),t.sex&&(this.sex=t.sex),t.age&&(this.age=t.age),t.evalCode&&(this.evalCode=decodeURIComponent(decodeURIComponent(t.evalCode))),t.select&&(this.select=decodeURIComponent(decodeURIComponent(t.select))),t.school&&(this.school=decodeURIComponent(decodeURIComponent(t.school))),this.loadData(t.classId),this.videoAnalysis=t.videoAnalysis&&1==t.videoAnalysis,this.videoAnalysis){var s=this;e.showModal({title:"提示",content:"测评过程中将通过视频监测您的心率变化，请认真做答",icon:"none",mask:!0,showCancel:!1,success:function(t){t.confirm&&(s.showCamera=!0,s.cameraContext=e.createCameraContext(),setTimeout((function(){s.startRecord()}),1e3))}})}},methods:{inputAnswer:function(e,t){this.questionList[t]["rightAnswer"]=e.target.value},startRecord:function(){var t=this;this.cameraContext.startRecord({success:function(e){console.log("question startRecord success:"+JSON.stringify(e)),t.videoMonitor()},fail:function(t){console.log("question startRecord fail，",t),e.showToast({title:"摄像头开启失败",icon:"none"})}})},videoMonitor:function(){console.log("videoMonitor begin....");var e=this;this.monitorTimer=setTimeout((function(){e.executeAnalysis()}),16e3)},executeAnalysis:function(){console.log("executeAnalysis begin ----");var t=e.getStorageSync("userData"),s=e.getStorageSync("projectId"),o=this;this.cameraContext.stopRecord({success:function(n){console.log("question stopRecord success: ",n),e.uploadFile({url:o.$apis.analysisVideoUrl,filePath:n.tempVideoPath,fileType:"video",name:"file",formData:{classId:o.classId,projectId:s},header:{"Content-Type":"multipart/form-data",userId:t.userId},success:function(t){if(console.log("question videoAnalysis success, res is:",t),200==t.statusCode){var s=JSON.parse(t.data);if(200==s.code){var n=s.result;if(1==n.healthStatus){var i=e.getStorageSync("healthAnalysisResult"),r=n.healthAnalysisResult.result,c=i.hr,a=r.hr,l=Math.abs(a-c)/c;return console.log("oldHr: "+c+", newHr: "+a+", diffRate="+l),l>=.15?void e.showModal({title:"提示",content:"您测评过程中的心率变化超过15%，请认真做答",showCancel:!1,success:function(e){e.confirm&&o.startRecord()}}):void o.startRecord()}}}e.showModal({title:"提示",content:"请确保测评过程中摄像头对准脸部",showCancel:!1,success:function(e){e.confirm&&o.startRecord()}})},fail:function(e){console.log("videoAnalysis fail",e),o.startRecord()}})},fail:function(e){o.startRecord(),console.log("stopRecord fail:",e)}})},error:function(e){console.log(e.detail)},loadData:function(t,s){e.setNavigationBarTitle({title:s}),e.showLoading({title:"数据加载中"});var o=this;this.$apis.postQuestions({classId:t}).then((function(t){e.hideLoading(),o.questionList=t.result,o.setReviewProgress()}))},setReviewProgress:function(){var t=e.getStorageSync(this.classId+"_record");if(t&&t!={}){for(var s=0,o=0;o<this.questionList.length;o++){var n=this.questionList[o];t[n.questionId]&&("2"==n.questionType?n["rightAnswer"]=t[n.questionId].rightAnswer:(n["selCode"]=t[n.questionId].selCode,n["selectGrade"]=t[n.questionId].selectGrade),s++)}this.questionIndex=s}},nextQuestion:function(){var t=this.questionList[this.questionIndex];if("2"!=t.questionType||t.rightAnswer&&""!=t.rightAnswer){if("3"==t.questionType){for(var s=!1,o=0;o<this.items.length;o++)if(this.items[o].answerchecked){s=!0;break}if(!s)return void e.showToast({title:"请选择答案",icon:"none"})}this.saveReviewProgress(),this.questionIndex++}else e.showToast({title:"请输入答案",icon:"none"})},saveReviewProgress:function(){var t=e.getStorageSync("projectId");if(t||(t=0),t>0||"402880f082eecb960182eee3b1ef0001"==this.classId){e.setStorageSync("currentClassId",this.classId);var s=e.getStorageSync(this.reviewRecordKey);s||(s={});var o={},n=this.questionList[this.questionIndex];o["questionId"]=n.questionId,o["selCode"]=n.selCode,o["selectGrade"]=n.selectGrade,2==n.questionType&&(o["rightAnswer"]=n.rightAnswer),s[n.questionId]=o,e.setStorageSync(this.reviewRecordKey,s)}},closeCamera:function(){this.cameraContext.stopRecord({}),this.showCamera=!1,e.removeStorageSync("healthAnalysisResult")},submit:function(){this.videoAnalysis&&(this.closeCamera(),clearTimeout(this.monitorTimer));var t=this.questionList[this.questionIndex];if("1"==t.questionType||"3"==t.questionType){for(var s=!1,o={},n=0;n<t.selectList.length;n++)if(o=t.selectList[n],o.answerchecked){s=o.answerchecked;break}if(!s)return void e.showToast({title:"请选择答案",icon:"none"});this.answerclick(o)}else if("2"==t.questionType){if(!t.rightAnswer||""==t.rightAnswer)return void e.showToast({title:"请填写答案",icon:"none"});this.answerclick({selCode:""})}},mulSelChange:function(e){for(var t=this.questionList[this.questionIndex],s=e.detail.value,o=0,n=0,i=this.items.length;n<i;++n){var r=this.items[n];s.includes(r.selCode)?(this.$set(r,"answerchecked",!0),o+=parseFloat(r.selectGrade)):this.$set(r,"answerchecked",!1)}t["selCode"]=s.join(","),t["selectGrade"]=o},answerclick:function(t){var s=this;if(this.lock)console.log("lock is true now return");else if(t){this.lock=!0;var o=this.questionList[this.questionIndex];if("1"==o.questionType)try{t.selCode&&(o["selCode"]=t.selCode),t.selectGrade&&(o["selectGrade"]=t.selectGrade);var n=o.selectList,i=n.some((function(e){return 1==e.answerchecked}));i&&n.map((function(e){return e.answerchecked=!1,e})),t.answerchecked=!0}catch(c){console.log(c)}var r=this;setTimeout((function(){if(s.saveReviewProgress(),s.questionIndex<s.questionList.length-1)s.questionIndex++,r.lock=!1;else{e.showLoading({title:"测评完成，提交中"});var t=[],o=e.getStorageSync("projectId");o||(o=0);var n="402880f082eecb960182eee3b1ef0001",i="2c9cff928408eab3018413a00d8a006a";if(s.classId==n||s.classId==i){for(var c=0;c<s.questionList.length;c++){var a=s.questionList[c],l={quesNo:a.questionNum,answer:a.selCode,scoreA:a.selectGrade,scoreB:"0"};t.push(l)}var d=e.getStorageSync("userData"),u=(d.name,{serialNum:"130304202206261503435",name:s.name,sex:s.sex,age:s.age,userId:s.userId,select:s.select,school:s.school}),h=[],f="";s.classId==n&&(f=1),s.classId==i&&(f=2);var g={testCode:s.evalCode,userInfo:u,testRecord:t,classId:s.classId,projectId:o,version:f};h.push(g),s.$apis.postCommitTest(h).then((function(t){r.lock=!1,e.hideLoading(),200==t.code?(e.removeStorageSync("currentClassId"),e.removeStorageSync(s.reviewRecordKey),e.navigateTo({url:"/pages/report/pdfreport?pdfUrl="+encodeURIComponent(t.result)})):(e.showToast({title:"提交失败",icon:"wrong"}),e.removeStorageSync("currentClassId"),e.removeStorageSync(s.reviewRecordKey))})).catch((function(t){console.log("进入异常"),e.hideLoading(),r.lock=!1,e.setStorageSync("paramList",h),e.navigateTo({url:"/pages/review/testCodeAagin"})}))}else{for(c=0;c<s.questionList.length;c++){a=s.questionList[c],l={selectGrade:a.selectGrade,content:a.content,questionId:a.questionId,questionNum:a.questionNum,selCode:a.selCode,classId:a.classId,projectId:o};a.rightAnswer&&(l["rightAnswer"]=a.rightAnswer),t.push(l)}s.$apis.postCompleteReview(t).then((function(t){var s=e.getStorageSync("projectId");r.lock=!1,e.hideLoading(),200==t.code?(e.showToast({title:"测评完成，报告已生成",icon:"right"}),r.finished(t.result.classId,t.result.resultId,r.title,s)):e.showToast({title:"测评报告生成失败",icon:"wrong"})})).catch((function(t){e.hideLoading(),r.lock=!1,console.log(t)}))}}}),300)}},getNextIndex:function(t,s){var o=e.getStorageSync("projectClass"),n=-1;if(o){this.classCount=o.length;for(var i=0;i<o.length;i++){var r=o[i];if(r.classId==t&&i<o.length-1){n=i+1;break}if(s&&r.classId==t&&i==o.length-1)return i+1}}return n},finished:function(t,s,o,n){var i=e.getStorageSync("projectClass"),r=this.getNextIndex(t,!1);if(r>-1){e.showToast({title:"测评完成，即将进入下一个量表测试",duration:2e3});var c=i[r];this.questionList=[],this.questionIndex=0,e.setStorageSync("currentClassId",c.classId),e.removeStorageSync(this.reviewRecordKey),e.redirectTo({url:"/pages/report/guide?classId="+c.classId})}else e.removeStorageSync("currentClassId"),e.removeStorageSync(this.reviewRecordKey),e.redirectTo({url:"/pages/report/finished?classId="+t+"&resultId="+s+"&title="+o+"&projectId="+n})},back:function(){this.questionIndex--}},computed:{secondfloorper:function(){return parseInt(100*((this.questionIndex+1)/this.questionList.length).toFixed(2))},items:function(){return this.questionList.length>0?this.questionList[this.questionIndex].selectList:[]}}};t.default=n}).call(this,s(1)["default"])},86:function(e,t,s){"use strict";s.r(t);var o=s(87),n=s.n(o);for(var i in o)"default"!==i&&function(e){s.d(t,e,(function(){return o[e]}))}(i);t["default"]=n.a},87:function(e,t,s){}},[[80,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/questions/questions.js.map