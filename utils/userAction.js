import config from '@/config/index.config.js'
import http from '@/config/requestConfig'

let PlatformType;

// #ifdef MP-QQ
PlatformType = 1;
// #endif
// #ifdef MP-WEIXIN
PlatformType = 2;
// #endif
// #ifdef MP-TOUTIAO
PlatformType = 3;
// #endif
			

function loginAction(callback,parentOpenid) {
	console.log(callback)
	uni.login({
		async success(r) {
			const r2 = await request({
				url: `${config.baseUrl}api/getOpenid`,
				data: {
					code: r.code,
					platform: PlatformType,
					parentOpenid:parentOpenid
				}
			});
			if (r2.error_code === 0) {
				uni.setStorage({
					key: 'openid',
					data: r2.data.openid
				});
				callback && callback(r2.data.openid);
			} else {
				uni.showToast({
					title: '获取openid失败'
				});
			}
		}
	});
};

//检查登陆
function checkLogin(callback){
	
	let openid = uni.getStorageSync("openid")
	if (openid && openid != "") {
		http.post(`${config.baseUrl}/reviewFront/getUserInfoByOpenid.do`, {"openid": openid}).then(res => {
			if (res.code == 200 && res.result && res.result.mobilePhone) {//如果用户信息已经完善 直接跳转到测评项目页面
				callback && callback(res.result);
			} else {
				uni.removeStorageSync("userData")
			}
		})
	} else {
		uni.login({
			provider: 'weixin',
			success(login) {
				http.post(`${config.baseUrl}/reviewFront/getOpenid.do`, {"code": login.code}).then(res => {
					if (res.code == 200) {
						uni.setStorageSync("openid", res.result)
						http.post(`${config.baseUrl}/reviewFront/getUserInfoByOpenid.do`, {"openid": res.result}).then(res => {
							if (res.code == 200 && res.result && res.result.mobilePhone) {//如果用户信息已经完善 直接跳转到测评项目页面
								callback && callback(res.result);
							}
						})
					} else {
						uni.removeStorageSync("openid")
						uni.showToast({
							title: res.msg,
							icon: "error",
							duration: 3000
						})
					}
				})
			}
		})
	}
};

//判断用户是否登陆
function isLogin() {
	let userData = uni.getStorageSync("userData")
	if(userData && userData.mobilePhone && userData.mobilePhone != "") {
		return true
	}
	return false
}

export default{
	checkLogin,
	PlatformType,
	isLogin
}