<template>
	<view class="user" :class="{active: bodyShow}">
		<view class="user-top">
			<view class="user-head">
				<image v-if="userInfo.sex == '1'" class="user-headicon" src="@/static/man.png"></image>
				<image v-if="userInfo.sex == '2'" class="user-headicon" src="@/static/woman.png"></image>
				<!-- <image class="user-headicon" :src="userInfo.avatarUrl" v-if="userInfo.avatarUrl" mode="widthFix" /> -->
				<view class="user-default" v-if="!userInfo.sex || userInfo.sex == ''">
					<image src="@/static/default-user-headicon.png" mode="widthFix"/>
				</view>
				<view>
					<text class="user-name">{{userInfo.userName ? userInfo.userName : ''}}</text>
					<text class="user-name" v-if="!userInfo.userName && !userInfo.mobilePhone">用户未登陆</text>
					<text class="user-name" style="margin-top: 5px;">{{userInfo.mobilePhone ? userInfo.mobilePhone : ''}}</text>
				</view>
			</view>
		</view>
		<view class="user-list">
			<view @click="toPage('/pages/user/reviewRecord')" class="user-item">
				<image class="image-size" style="width: 44rpx;height: 44rpx;" src="../../static/icons8-list-view-48 1.png"></image>
				<text style="padding-left: 10px;">我的测评</text>
				<image class="icon-back" src="../../static/icons8-back-48 1.png"></image>
			</view>
			<view @click="toPage('/pages/user/reviewReport')" class="user-item">
				<image class="img-icon" src="../../static/icons8-lab-coat-48 1.png"></image>
				<text style="padding-left: 10px;">我的咨询</text>
				<image class="icon-back" src="../../static/icons8-back-48 1.png"></image>
			</view>
			<view @click="toPage('/pages/expert/myConsultation')" class="user-item">
				<image class="img-icon" src="../../static/icons8-school-48 1.png"></image>
				<text style="padding-left: 10px;">我的课程</text>
				<image class="icon-back" src="../../static/icons8-back-48 1.png"></image>
			</view>
			<view @click="toPage('/pages/user/myOrder')" class="user-item">
				<image class="img-icon" src="../../static/icons8-shopping-basket-48 1.png"></image>
				<text style="padding-left: 10px;">我的商品</text>
				<image class="icon-back" src="../../static/icons8-back-48 1.png"></image>
			</view>
			<view @click="toPage('/pages/user/myInfo')" class="user-item">
				<image class="img-icon" src="../../static/icons8-staff-32 1.png"></image>
				<text style="padding-left: 10px;">我的支持</text>
				<image class="icon-back" src="../../static/icons8-back-48 1.png"></image>
			</view>
			<view @click="toPage('/pages/user/myInfo')" class="user-item">
				<image class="img-icon" src="../../static/icons8-settings-48 1.png"></image>
				<text style="padding-left: 10px;">设置</text>
				<image class="icon-back" src="../../static/icons8-back-48 1.png"></image>
			</view>
	<!-- 		<view v-if="isExpert==true" @click="toPage('/pages/expert/myAppoint')" class="user-item">
				<uni-icons type="chat-filled" size="20" color="#8ad2ff"></uni-icons>
				<text style="padding-left: 10px;">我的预约</text>
			</view> -->
			<!-- <view v-if="isExpert==true" @click="toPage('/pages/videocall/videocall')" class="user-item">
				<uni-icons type="videocam-filled" size="20" color="#8ad2ff"></uni-icons>
				<text style="padding-left: 10px;">进入房间</text>
			</view> -->
			<!-- <view @click="toPage('/pages/videocall/videocall')" class="user-item">
				<uni-icons type="videocam-filled" size="20" color="#8ad2ff"></uni-icons>
				<text style="padding-left: 10px;">进入房间</text>
			</view> -->
			<!-- <navigator url="/pages/user/attention" class="user-item">
				<uni-icons type="gear-filled" size="20" color="#d6b477"></uni-icons>
				<text style="padding-left: 10px;">设置</text>
			</navigator>
			<navigator url="/pages/user/attention" class="user-item">
				<uni-icons type="phone-filled" size="20" color="#d6b477"></uni-icons>
				<text style="padding-left: 10px;">联系我们</text>
			</navigator> -->
		</view>
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	import config from '@/config/index.config.js';
	export default {
		data() {
			return {
				bodyShow: true, // 页面显示
				userInfo: {}, // 用户信息
				parentOpenid: '',
				openid: '',
				localtionPlatform: '',
				popupVisible: false, // 绑定手机、修改密码显示隐藏
				modelTel: '', // 手机号码
				modelInitPwd: '', // 初始化密码
				modelNewPwd: '',  // 新密码
				userStatus: 0, // 用户表单类型 1 绑定手机 2 修改密码
				isExpert:false//是否为专家
			}
		},
		onShow() {
			const that = this;
			this.localtionPlatform = userCheck.PlatformType;
 			let userData = uni.getStorageSync("userData")
			if (userData) {
				this.userInfo = userData
			} else {
				userCheck.checkLogin(function(userData){
					//保存用户信息
					uni.setStorageSync('userData', userData)
					that.userInfo = userData
				});
			}
			//判断是否为专家
			this.$apis.postIsExpert({'mobilePhone': userData.mobilePhone}).then(res => {
				console.log('专家手机号：'+userData.mobilePhone);
				if(res.code == 200 && res.isExpert == true){
					that.isExpert = true
				}
			}).catch(err => {
				uni.hideLoading()
				console.log(err)
			})
		},
		onLoad() {
			//this.loadData();
		},
		methods: {
			toPage(path) {
				uni.navigateTo({
					url: path 
				})
			},
		},
		onShareAppMessage(r) {
			let _path = '/pages/index/index?parentOpenid='+this.openid;
			console.log(_path)
			return {
				title: "心理测试、趣味测试",
				path: _path
			}
		}
	}
</script>

<style>
	page {
		background-color: #f1f1f1;
	}
</style>
<style lang="scss" scoped>
	.question {
		width: 88%;
		// padding: 20rpx;
		background: rgba(215,233,230,0.41);
		border-radius: 50rpx;
		margin: 20rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	.questionr {
		// padding-left: 10rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	.questionl {
		width: 30%;
		padding-right: 27px;
	}
	.questionl .questionlimg {
		width: 233rpx;
		height: 233rpx;
		border-radius: 50rpx;
	}
	.questionr .title {
		color: #594e3f;
		font-size: 23rpx;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //可设置显示的行数
		line-clamp: 1;
		-webkit-box-ori5ent: vertical;
	}
	.img-icon{
		width: 44rpx;
		height: 44rpx;
	}
	.icon-back{
		width: 34rpx;
		height: 34rpx;
	}
.user {
	display: none;
	&.active {
		display: block;
	}
}
.user-top {
	background: linear-gradient(to bottom, rgba(47,107,26, 0.4) 0%, rgba(47,107,26, 0.2) 100%);
	display: flex;
	align-items: center;
	padding: 40rpx;
	.user-head {
		// background: linear-gradient(to bottom, rgba(47,107,26, 0.4) 0%, rgba(47,107,26, 0.2) 100%);
		flex: 1;
		display: flex;
		align-items: center;
		.user-headicon {
			border-radius: 50%;
			width: 140rpx;
			height: 140rpx;
		}
		.user-default {
			width: 140rpx;
			height: 140rpx;
			background-color: #f1f1f1;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				display: block;
				width: 50%;
				height: 50%;
				border-radius: 50%;
			}
		}
		.user-name {
			display: block;
			font-size: 36rpx;
			color: #000;
			margin-left: 20rpx;
			flex: 1;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			min-width: 2rpx;
		}
		.user-btn {
			font-size: 28rpx;
			color: #007AFF;
		}
	}
	button {
		color: #5f89ff;
		border: 1px solid #5f89ff;
		border-radius: 10rpx;
		font-size: 26rpx;
		padding: 0 50rpx;
		&:after {
			border: 0;
			background: none;
		}
	}
}
.user-list {
	background-color: #fff;
	margin-top: 40rpx;
	.user-item {
		display: flex;
		align-items: center;
		border: 0;
		border-bottom: 1px solid #f1f1f1;
		background-color: rgba(215,233,230,0.4);
		border-radius: 0;
		padding: 15rpx;
		margin-bottom: 10rpx;
		&:after {
			border: 0;
		}
		&:last-child {
			border-bottom: 0;
		}
		.user-item-ic {
			display: block;
			width: 70rpx;
			height: 70rpx;
			margin-right: 10rpx;
		}
		.user-item-arrow {
			display: block;
			width: 40rpx;
			height: 40rpx;
			margin-right: 40rpx;
		}
		text {
			display: block;
			flex: 1;
			font-size: 32rpx;
			text-align: left;
		}
	}
}
.with-form {
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .8);
	display: none;
	align-items: center;
	justify-content: center;
	&.active {
		display: flex;
	}
	.with-formedit {
		width: 84%;
		background-color: #fff;
		border-radius: 30rpx;
		overflow: hidden;
		dt {
			background-color: #5f89ff;
			font-size: 36rpx;
			color: #fff;
			padding: 30rpx 0;
			text-align: center;
		}
		dd {
			padding: 0 30rpx;
			.with-form-item {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				margin-top: 30rpx;
				label {
					display: block;
					width: 160rpx;
				}
				input {
					border: 1px solid #5f89ff;
					padding: 2rpx 10rpx;
					flex: 1;
					font-size: 24rpx;
					border-radius: 40rpx;
				}
			}
			.with-form-select {
				overflow: hidden;
				padding: 20rpx 0;
				span {
					float: left;
					margin-top: 24rpx;
					font-size: 30rpx;
					text-align: center;
					padding: 20rpx 0;
					background-color: #f0f0f0;
					color: #666;
					width: 28%;
					border-radius: 6rpx;
					box-sizing: border-box;
					border: 1px solid #f0f0f0;
					&.active {
						border: 1px solid #5f89ff;
					}
					&:nth-child(3n-1) {
						margin: 24rpx 8% 0 8%;
					}
				}
			}
			.with-form-tips {
				font-size: 20rpx;
				color: #aaa;
				padding: 0 0 40rpx 0;
				color: red;
			}
			.with-form-submit {
				padding: 0;
				border: 0;
				border-radius: 60rpx;
				color: #fff;
				font-size: 30rpx;
				background: linear-gradient(#5f89ff, #6475fd);
				margin: 40rpx 0;
				&:after {
					border: 0;
				}
			}
		}
	}

	.custom-share-button{
		
		img{
			width: 32rpx;
			height: 32rpx;
			vertical-align: middle;
			margin-top: -2px;
			margin-right: 2px;
		}
		background-color: #007AFF;
		border-radius: 40px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		line-height: 60rpx;
		text-align: right;
		padding-right: 26rpx;
		font-size: 24rpx;
		background-color: #fff;
		position: fixed;
	    right: 0;
	    bottom: 60%;
	    z-index:2000;
	}
	.custom-share-button::after{
		border: 0px solid red;
	}
}
</style>
