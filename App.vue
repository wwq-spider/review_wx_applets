<script>
	import userCheck from '@/utils/userAction.js';
	export default {
		onLaunch: function() {
			userCheck.checkLogin(function(userData){
				//保存用户信息
				uni.setStorageSync('userData', userData)
			});
			// let that = this
			// let openid = uni.getStorageSync("openid")
			// if (openid && openid != "") {
			// 	this.$apis.postUserIsRegister({"openid": openid}).then(res => {
			// 		if (res.code == 200 && res.result && res.result.mobilePhone) {//如果用户信息已经完善 直接跳转到测评项目页面
			// 			//填充用户信息
			// 			uni.setStorageSync('userData', res.result)
			// 		}
			// 	})
			// } else {
			// 	uni.login({
			// 		provider: 'weixin',
			// 		success(login) {
			// 			console.log(login);
			// 			uni.request({
			// 				url: that.wxAuthURL + '&js_code='+login.code,
			// 				success(resAuth) {
			// 					console.log(resAuth)
			// 					let openid = resAuth.data.openid
			// 					uni.setStorageSync('openid', openid)
			// 					that.$apis.postUserIsRegister({"openid": openid}).then(res => {
			// 						if (res.code == 200 && res.result && res.result.mobilePhone) {//如果用户信息已经完善 直接跳转到测评项目页面
			// 							//填充用户信息
			// 							uni.setStorageSync('userData', res.result)
			// 						}
			// 					})
			// 				},
			// 				fail(err) {
			// 					console.log(err)
			// 				}
			// 			})
			// 		}
			// 	})
			// }
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},
		globalData: {
			switchId: 1
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import "./static/icons/iconfont.css";
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	/* @import "uview-ui/index.scss"; */
	body{
		font-size: 16px;
	}
	.uni-progress-bar{
		border-radius: 20px;
	}
	.uni-progress-inner-bar{
		border-radius: 20px;
	}
	.combg {
		width: 85%;
		padding: 30rpx;
		margin: 30rpx auto;
		background: #fff;
		/* box-shadow: 0 40rpx 0 -22rpx rgb(221 138 0 / 23%), 0 -9rpx 0 0 rgb(105 100 87 / 14%) inset; */
		box-shadow: 0 32rpx 0 -22rpx #c2e3ff, 0 -9rpx 0 0 #aacfff inset;
		border-radius: 50rpx;
	}
	.uicon{
		vertical-align: middle;
	}
	.listtitle {
		text-align: left;
		width: 686rpx;
		margin: 0 auto;
	}
	
	.listtitle .titlea {
		width: 44rpx;
		height: 44rpx;
		vertical-align: middle;
		margin-right: 5rpx;
	}
	
	.listtitle text {
		font-weight: bolder;
		vertical-align: middle;
		font-size: 34rpx;
		color:#594e3f;
	}
	
</style>
