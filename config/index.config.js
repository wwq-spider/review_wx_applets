const CONFIG = {
	//开发环境配置
	development: {
		loginTitleTxt: "欢迎使用XXX", // 登录页标题
		copyrightTxt: "XXXv1.0", // 版本信息
		assetsPath: "http://cdn.com/img", // 静态资源路径
		//baseUrl: "https://review-system-1282746-1307626513.ap-shanghai.run.tcloudbase.com/review_system",
		//baseUrl: "http://127.0.0.1:8087",
		//baseUrl: "https://www.zhuxinkang.com/review",
		baseUrl: "http://localhost:8080/review",
		//baseUrl: "https://www.xinzhaitongxing.com/review",
		//baseUrl: "http://39.106.33.212:8080/jeecg-boot",
		//baseUrl: "https://wlj.xinzhaitongxing.com/review",
		tokenKey: "WECHAT_TRADE", // 登录标识
		testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
		forcedLogin: true, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
		touristMode: false, // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
		whitePath: [
			"/pages/index/index",
			"/pages/user/index",
			"/pages/user/privacyProto",
			"/pages/userform/userform",
		],
		apiWhitePath: [
			"register.do",
			"getUserInfoByOpenid.do",
			"getReviewClass.do"
		],
		aliYunEndpoint: 'https://xztx-review-img.oss-cn-beijing.aliyuncs.com/',
		defaultBanner: 'https://xztx-review-img.oss-cn-beijing.aliyuncs.com/review_banner.png',
	},

	//生产环境配置
	production: {
		loginTitleTxt: "欢迎使用XXX", // 登录页标题
		copyrightTxt: "XXXv1.0", // 版本信息
		assetsPath: "/static/img", // 静态资源路径
		//baseUrl: "https://review-system-1282746-1307626513.ap-shanghai.run.tcloudbase.com/review_system",
		//baseUrl: "https://www.www.zhuxinkang.com/review",
		baseUrl: "https://www.xinzhaitongxing.com/review",
		tokenKey: "WECHAT_TRADE", // 登录标识
		testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
		forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
		touristMode: true, // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
		whitePath: [
			"/pages/index/index",
			"/pages/user/index",
			"/pages/user/privacyProto",
			"/pages/userform/userform",
		],
		aliYunEndpoint: 'https://xztx-review-img.oss-cn-beijing.aliyuncs.com/',
		apiWhitePath: [
			"register.do",
			"getUserInfoByOpenid.do",
			"getReviewClass.do"
		],
		defaultBanner: 'https://xztx-review-img.oss-cn-beijing.aliyuncs.com/review_banner.png'
	}

}
export default CONFIG[process.env.NODE_ENV];