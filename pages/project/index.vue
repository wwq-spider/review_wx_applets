<template>
	<view class="content">
		<page-meta :root-font-size="footSize"></page-meta>
		<image class="banner" src="@/static/banner.png"></image>
		<view class="listtitle">
			<image class="titlea" src="@/static/titlea.png"></image><text>测评项目</text>
		</view>
		<!-- <button class="cu-btn bg-orange margin-tb-sm lg text-white" open-type="getUserInfo"
						@getuserinfo="getUserInfo">微信授权登录（open-type 获取）</button>
		<button class="cu-btn bg-orange margin-tb-sm lg text-white" open-type="getPhoneNumber"
			@getphonenumber="getUserPhone">微信手机号登录</button>
		<button class="cu-btn bg-orange margin-tb-sm lg text-white" open-type="contact">联系客服</button>
		<button class="cu-btn bg-orange margin-tb-sm lg text-white" @tap="goLogin">最新版微信登录测试（按钮直接登录）</button> -->
		
		<view class="_scroll-list">
			<view class="_scroll-head">
				<uni-icons type="list" size="20" color="#d6b477"></uni-icons>
				<text class="_text">列表</text>
			</view>
		</view>
		<view class="question" v-for="(reviewClass, index) in reviewClassList">
			<view class="questionr" @click='beginTest(reviewClass.classId, reviewClass.title)' :key="index">
				<view class="questionl">
					<image class="questionlimg" :src="reviewClass.bannerImg || defaultCover" @error="imageError(index, 2)"></image>
				</view>
				<view style="width: 70%;">
					<view class="title">{{reviewClass.title}}</view>
					<view class="subtitle">{{reviewClass.guide}}</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultCover: '../../static/default_cover.jpeg',
				footSize: this.$footFontSize,
				reviewClassList: []
			}
		},
		onLoad(option) {
			let projectId = option.projectId
			let that = this
			this.$apis.postReviewClass({"projectId":projectId}).then(res => {
				if res.code == 200 {
					res.rows.forEach((row) => {
						if (row.bannerImg) {
							row.bannerImg = that.$config.aliYunEndpoint + row.bannerImg
						}
						that.reviewClassList.push(row)
					})
				} else {
					uni.showToast({
						title: "查询失败",
						icon: fail
					})
				}
			})
		},
		methods: {
			imageError(index, type) {
				this.reviewClassList[index]["bannerImg"] = this.defaultCover
			},
			beginTest(classid, title) {
				console.log(e.currentTarget.dataset.classid)
				uni.navigateTo({
					url: '/pages/questions/questions?classId='+classid + "&title=" + title
				})
			},
			//获取用户授权  匿名数据
			getUserInfo(e) {
				if (e.detail.errMsg == 'getUserInfo:ok') {
					//对数据进行操作
					console.log(e)
				} else {
					this.$operate.toast({
						title: '授权失败无法登录！'
					})
				}
			},
			// 获取用户信息  后期放弃
			userInfo() {
				uni.login({
					provider: 'weixin',
					success(login) {
						console.log(login);
						uni.getUserInfo({
							provider: 'weixin',
							lang: 'zh_CN',
							success(user) {
								console.log(user);
							}
						})
					}
				})
			},
			//获取用户手机号
			getUserPhone(e) {
				// 获取code 小程序专有，用户登录凭证。
				uni.login({
					provider: 'weixin',
					success(login) {
						console.log(login);
					}
				})
				console.log(e)
				//手机号加密数据
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					console.log(e)
					//传给后端的参数
					let data = {
						session_key: '后端返回微信 openid ',
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv,
					}
					
				} else {
					this.$operate.toast({
						title: '授权失败无法登录！'
					})
				}
			},
			//最新登录测试
			goLogin() {
				// 获取code 小程序专有，用户登录凭证。
				uni.login({
					provider: 'weixin',
					success(login) {
						console.log(login);
					}
				})
				 // desc: '用于完善会员资料'  必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
				uni.getUserProfile({
					desc: '用于完善会员资料',
					lang: 'zh_CN',
					success(user) {
						console.log(user);
					}
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.banner {
		width: 755rpx;
		height: 522rpx;
		margin-bottom: 60rpx;
	}

	._scroll-list {
		/* padding-bottom: 20rpx; */
		border-bottom: 20rpx solid #eee;
		width: 100%;
	}
	._scroll-head {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
		height: 100%;
		padding: 20rpx 20rpx;
	}
	
	._scroll-head ._text {
		font-size: 32rpx;
		font-weight: bold;
		color: #d6b477;
		padding-left: 8px;
	}

	.question {
		width: 88%;
		background: #fff;
		padding: 20rpx;
		box-shadow: 0 0 28rpx 0 rgb(155 153 146 / 18%);
		border-radius: 50rpx;
		margin: 20rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	
	.questionl {
		width: 20%;
		padding-right: 27px;
	}
	.questionl .questionlimg {
		width: 180rpx;
		height: 233rpx;
	}
	
	.questionr {
		padding-left: 15rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	
	.questionr .title {
		color: #594e3f;
		font-size: 30rpx;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 1; //可设置显示的行数
		 line-clamp: 1;
		 -webkit-box-orient: vertical;
	}
	
	.questionr .subtitle {
		font-size: 23rpx;
		color: #857f77;
		margin: 20rpx 0 20rpx 0;
		line-height: 1.6;
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 5; //可设置显示的行数
		 line-clamp: 5;
		 -webkit-box-orient: vertical;
	}
	
	.questionr .conbottom {
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}
	
	.questionr .agescope {
		font-size: 24rpx;
		color: #ff9912;
	}
	
	.questionr .testbutton {
		width: 140rpx;
		line-height: 54rpx;
		background: #febd00;
		border-radius: 27rpx;
		text-align: center;
		font-size: 26rpx;
		color: #fff;
	}
</style>
