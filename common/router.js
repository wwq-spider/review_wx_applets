// 路由
import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import store from '@/common/store'
import config from '@/config/index.config.js';
import userCheck from '@/utils/userAction.js';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerErrorEach: ({
		type,
		msg
	}) => {
		switch (type) {
			case 3: // APP退出应用
				// #ifdef APP-PLUS
				router.$lockStatus = false;
				uni.showModal({
					title: '提示',
					content: '您确定要退出应用吗？',
					success: function(res) {
						if (res.confirm) {
							plus.runtime.quit();
						}
					}
				});
				// #endif
				break;
			case 2:
				router.$lockStatus = false;
				break;
			default:
				break;
		}

	},
	// 通配符，非定义页面，跳转404
	routes: [...ROUTES,
		{
			path: '*',
			redirect: (to) => {
				return {
					name: '404'
				}
			}
		},
	]
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	//console.log('from: '+ JSON.stringify(from)+ ', to: '+ JSON.stringify(to))
	let fullPath = from.fullPath
	if (fullPath && fullPath != "" && fullPath.indexOf("?scene=") > -1) {
		let scene = fullPath.split("?scene=")[1]
		console.log("beforeEach: scene==" + scene)
		let arr = decodeURIComponent(scene).split("&")
		for (let i=0; i<arr.length; i++) {
			let pairStr = arr[i]
			let paramPair = pairStr.split("=")
			console.log("beforeEach: paramPair==" + paramPair)
			if (paramPair[0] == "tenantId") {
				console.log("beforeEach: tenant_id==" + paramPair[1])
				uni.setStorageSync('tenantId', parseInt(paramPair[1]))
			}
		}
	}
	
	let path = to.path
	if (config.whitePath.indexOf(path) > -1) {
		// 权限控制登录
		next()
	} else {
		let userData = uni.getStorageSync("userData")
		if (userData && userData.mobilePhone) {
			// 权限控制登录
			next()
		} else {
			console.log("beforeEach======================")
			userCheck.checkLogin(function(userData){
				//跳转页面
				if (userData && userData.mobilePhone) {
					//1.保存用户信息
					uni.setStorageSync('userData', userData)
					next()
				} else {
					console.log("user not login, path:" + path + ", redirect to userform")
					next({
						path: '/pages/userform/userform',
						query: {
							toPath: to.fullPath
						},
						NAVTYPE: 'push'
					});
				}
			});
		}
	}
	// // 有两个个判断条件,一个是token,还有一个路由元信息
	// let userInfo = Boolean(uni.getStorageSync('userInfo'));
	// // 权限控制
	// if (to.meta && to.meta.auth && !userInfo) {//没有登录信息执行登录操作
	// } else {
	// 	next()
	// }
});

export {
	router,
	RouterMount
}
