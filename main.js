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
// 全局字体配置结束

Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			that.$forceUpdate();
			isFn(callback) && that.$nextTick(callback);
		}
	}
});

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
