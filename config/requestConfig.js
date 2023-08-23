import request from "@/request";
import store from '@/common/store';
import config from '@/config/index.config.js';
import userAction from '@/utils/userAction.js';

//可以new多个request来支持多个域名请求
let $http = new request({
	//接口请求地址
	baseUrl: config.baseUrl,
	//服务器本地上传文件地址
	fileUrl: config.baseUrl,
	// 服务器上传图片默认url
	defaultUploadUrl: "api/common/v1/upload_image",
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: {
		'Content-Type': 'application/json;charset=UTF-8',
		//'project_token': config.projectToken, //项目token（可删除）
		'token': uni.getStorageSync("token"),
	},
	config: {
		isPrompt: true,
		load: false,
		isFactory: true,
		resend: 0,
	}
});
// 添加获取七牛云token的方法
$http.getQnToken = function(callback) {
	//该地址需要开发者自行配置（每个后台的接口风格都不一样）
	$http.get("api/common/v1/qn_upload").then(data => {
		/*
		 *接口返回参数：
		 *visitPrefix:访问文件的域名
		 *token:七牛云上传token
		 *folderPath:上传的文件夹
		 *region: 地区 默认为：SCN
		 */
		callback({
			visitPrefix: data.visitPrefix,
			token: data.token,
			folderPath: data.folderPath
		});
	});
}
//请求开始拦截器
$http.requestStart = function(options) {
	if (options.load) {
		//打开加载动画
		store.commit("setLoadingShow", true);
	}
	// 图片上传大小限制
	if (options.method == "FILE" && options.maxSize) {
		// 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
		let maxSize = options.maxSize;
		for (let item of options.files) {
			if (item.size > maxSize) {
				setTimeout(() => {
					uni.showToast({
						title: "图片过大，请重新上传",
						icon: "none"
					});
				}, 500);
				return false;
			}
		}
	}
	if (options.url) {
		let sessionId = uni.getStorageSync("sessionid")
		if (sessionId) {
			options.header['Cookie'] = sessionId
		}
		//请求前加入token
		let url = options.url.substring(options.url.lastIndexOf('/') + 1);
		if(config.apiWhitePath.indexOf(url) < 0) {
			//设置用户信息和项目信息
			let userData = uni.getStorageSync('userData')
			if (userData && userData.userId) {
				options.header['userId'] = userData.userId
			}
			let projectId = uni.getStorageSync('projectId')
			if (projectId && projectId > 0) {
				options.header['projectId'] = projectId
			}
		}
		//请求头加入classID
		if(options.data && options.data.classId) {
			options.header['classId'] = options.data.classId
		}
		let tenantId = uni.getStorageSync("tenantId") 
		if (tenantId && tenantId != 0) {
			options.header['X-Tenant-Id'] = tenantId
		}
		let appId = uni.getStorageSync("appId") 
		if (appId) {
			options.header['X-AppId-Id'] = appId
		}
	}
	return options;
}
//请求结束
$http.requestEnd = function(options) {
	//判断当前接口是否需要加载动画
	if (options.load) {
		// 关闭加载动画
		store.commit("setLoadingShow", false);
	}
}
//所有接口数据处理（此方法需要开发者根据各自的接口返回类型修改，以下只是模板）
$http.dataFactory = async function(res) {
	console.log("接口请求数据", {
		url: res.url,
		resolve: res.response,
		header: res.header,
		data: res.data,
		method: res.method,
	});
	if (res.response.header && res.response.header['Set-Cookie']) {
		let sessionId = res.response.header['Set-Cookie'].split(" ")[0]
		uni.setStorageSync('sessionid', sessionId); //登录返回，保存Cookie到Storage
	}
	if (res.response.statusCode && res.response.statusCode == 200) {
		let httpData = res.response.data;
		if (typeof(httpData) == "string") {
			httpData = JSON.parse(httpData);
		}
		/*********以下只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/

		//判断数据是否请求成功
		// if (httpData.success || httpData.code == 200) {
		if (httpData.code == 200) {
			// 返回正确的结果(then接受数据)
			return Promise.resolve(httpData);
		} else if (httpData.code == "1000" || httpData.code == "1001" || httpData.code == 1100 || httpData.code == 402) {
			store.commit("emptyUserInfo");
			// #ifdef MP-WEIXIN
			// onLogin();跳转登录页面
			// #endif
			// 返回错误的结果(catch接受数据)
			return Promise.resolve({
				statusCode: 0,
				errMsg: "【request】" + (httpData.info || httpData.message),
				data: res.data
			});
		} else if (httpData.code == "401") { // token失效
			setTimeout(() => {
				uni.showToast({
					icon: 'none',
					title: httpData.info || httpData.message,
					duration: 1500
				});
			}, 0);
		} else { //其他错误提示   
			if (res.isPrompt) {
				setTimeout(() => {
					uni.showToast({
						icon: 'none',
						title: httpData.info || httpData.message,
						duration: 3000
					});
				}, 0);
			}
			let data = {}
			if(res.response && res.response.data) {
				data = res.response.data
			}			
			// 返回错误的结果(catch接受数据)
			return Promise.resolve({
				statusCode: 0,
				errMsg: "【request】" + (httpData.info || httpData.message),
				data: data
			});
		}
		/*********以上只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
	} else {
		// 返回错误的结果(catch接受数据)
		return Promise.reject({
			statusCode: res.response.statusCode,
			errMsg: "【request】数据工厂验证不通过",
			data: res.data
		});
	}
};
// 错误回调
$http.requestError = function(e) {
	// e.statusCode === 0 是参数效验错误抛出的
	if (e.statusCode === 0) {
		throw e;
	} else {
		console.log(e);
		uni.showToast({
			title: "网络错误，请检查一下网络",
			icon: "none"
		});
	}
}
export default $http;
