import Vue from 'vue'
import App from './App'
import store from '@/common/store'
import config from "@/config/index.config.js";
import uView from "uview-ui";
import * as $apis from '@/api/index.js'
// 引入路由
import {
	router,
	RouterMount
} from '@/common/router';
import $mUtils from '@/common/utils.js'
Vue.use(router);

Vue.prototype.$mUtils = $mUtils;
Vue.config.productionTip = false
Vue.use(uView);

// 全局字体配置
let fontSize = '100px'
const res = uni.getSystemInfoSync()
if(res.screenWidth < 640){
	fontSize = 100 * (res.screenWidth / 640) + 'px';
}
Vue.prototype.$apis = $apis;
Vue.prototype.$store = store;
Vue.prototype.$config = config;
Vue.prototype.$footFontSize = fontSize;

Vue.prototype.NumberSub = function(arg1, arg2) {
    var re1, re2, m, n;
    try {
        re1 = arg1.toString().split(".")[1].length;
    } catch (e) {
    re1 = 0;
    }
    try {
        re2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        re2 = 0;
    }
    m = Math.pow(10, Math.max(re1, re2)); 
    n = (re1 >= re2) ? re1 : re2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
// 全局字体配置结束

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
