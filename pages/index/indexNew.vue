<template>
	<view class="content">
		<!-- 刷新页面后的顶部提示框 -->
		<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
		<page-meta :root-font-size="footSize"></page-meta>
		<!-- 轮播图 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-if="bannerList.length > 0" v-for="item in bannerList"  :autoplay="autoplay" :interval="interval" :duration="duration">
					<image :src="item.imgUrl" mode="scaleToFill" :style="{width: `${windowWidth}px`, height: `${windowWidth/2}px`}" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 通告 -->
		<view class="notice" v-if="noticeList.length > 0">
			<uni-icons type="sound-filled" size="18" color="#55aaff" style="margin-left: 3px;"></uni-icons>
			<swiper class="swiper-nav" :circular="true" vertical="true" :autoplay="true" :interval="5000" :duration="1000">
				<swiper-item style="display: table;"  v-for="(item,index) in noticeList" :key="index">
					<view class="right" @click="noticeDetail(item.id)">{{item.noticeName}}</view>					
				</swiper-item>
			</swiper>
		</view>
		<uni-notice-bar v-if="noticeList.length == 0" single="true" text="暂无公告" showIcon="true" style="width: 100%; margin-bottom: -10px;" background-color="blank" color="#b9b9b8"></uni-notice-bar>
		<!-- 服务项目列表 -->
		<view>
			<text class="text">服务项目</text>
			<view class="imageStyle">
				<image @click="toPsychometrics" mode="widthFix" src="/static/psychometrics.png"></image>
				<image @click="toPsychologicalCounsel" mode="widthFix" src="/static/counsel.png"></image>
				<image mode="widthFix" src="/static/CareerPlanning.png"></image>
				<image @click="toPsychologicalCounsel" mode="widthFix" src="/static/psychologicalCourses.png"></image>
				<image @click="toPsychologicalCounsel" mode="widthFix" src="/static/psychologicalMall.png"></image>
				<image @click="toPsychologicalCounsel" mode="widthFix" src="/static/professionalSupport.png"></image>
				<image @click="toPsychologicalCounsel" mode="widthFix" src="/static/sharedRoom.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	export default {
		data() {
			return {
				tipShow: false,// 是否显示顶部提示框,
				footSize: this.$footFontSize,
				autoplay: true,
				interval: 2000,
				duration: 500,
				windowWidth: 0,
				pCount: 0,
				bannerList: [],
				noticeList: [],
			}
		},
		onReady() {
			//获取窗口大小适配图片
			uni.getSystemInfo({
				success: (r) => {
					this.windowWidth = r.windowWidth;
				}
			});
		},
		onShow() {
			let projectClass = uni.getStorageSync("projectClass")
			if(projectClass && projectClass.length > 0) {
				this.pCount = projectClass.length
				return
			} else {
				this.pCount = 0
			}
		},
		//分享页面标题设置
		onShareAppMessage(res) {
		    return {
		      title: '心宅同行心理健康服务平台',
		      path: 'pages/index/indexNew?source=1'
		    }
		},
		onShareTimeline() {
			return {
			  title: '心宅同行心理健康服务平台',
			  path: 'pages/index/indexNew?source=1'
			}
		},
		onLoad(option) {
			uni.showShareMenu({
				title: '心宅同行心理健康服务平台',
				path: 'pages/index/indexNew?source=1'
			})
			if(option && option.scene) {
				let arr = decodeURIComponent(option.scene).split("=")
				if(arr.length == 2) {
					this.projectId = parseInt(arr[1])
					uni.setStorageSync("projectId", this.projectId)
					this.pCount = 100
					//设置超时加入用户组
					let that = this
					this.$apis.postReviewProjectDetail({"id": this.projectId}).then(res => {
						if(res.code == 200) {
							that.defaultBanner = that.$config.aliYunEndpoint +  res.result.cover
						}
					})
					//初始化数据
					this.loadData()
					setTimeout(() => {
						let userData = uni.getStorageSync("userData")
						let projectId = that.projectId
						if(userData) {
							that.$apis.postJoinUserGroup({"userId": userData.userId, "projectId": projectId}).then(res => {
								console.log("joinUserGroup===" + JSON.stringify(res))
							})
						} else {
							setTimeout(() => {
								let userData = uni.getStorageSync("userData")
								if(userData ) {
									that.$apis.postJoinUserGroup({"userId": userData.userId, "projectId": projectId}).then(res => {
										console.log("joinUserGroup===" + JSON.stringify(res))
									})
								}
							}, 500)
						}
					}, 500);
				}
			} else if(option.source && option.source == '1') {
				uni.removeStorageSync("projectId")
				uni.removeStorageSync("projectClass")
			} else {
				let that = this
				let pid = uni.getStorageSync("projectId")
				if (pid && pid != "") {
					this.$apis.postReviewProjectDetail({"id": pid}).then(res => {
						if(res.code == 200) {
							that.defaultBanner = that.$config.aliYunEndpoint +  res.result.cover
						}
					})
				}
			}
			//初始化数据
			this.loadData()
		},
		methods: {
			loadData(pullRefresh) {
				uni.showLoading({
					title: '数据加载中'
				})
				let that = this
				let pid = uni.getStorageSync("projectId")
				if(!pid || pid == 0) {
					//查询banner
					this.$apis.postBannerList({"page": 1, "rows": 20}).then(res => {
						if (res.code == 200) {
							that.bannerList = []
							res.result.records.forEach((row) => {
								that.bannerList.push(row)
							})
						} else {
							uni.showToast({
								title: res.msg
							})
						}
						uni.hideLoading()
					})
				}
				//查询通知公告
				this.$apis.postNoticeList({"pageNo": 1, "pageSize": 20}).then(res => {
					if (res.code == 200) {
						that.noticeList = res.result.records
					} else {
						uni.showToast({
							title: res.msg
						})
					}
					uni.hideLoading()
				})
			},
			/* 跳转到心理评测页面 */
			toPsychometrics() {
				uni.navigateTo({
					url: '/pages/review/listPage?current=0'
				})
			},
			/* 跳转到心理咨询页面 */
			toPsychologicalCounsel() {
				uni.navigateTo({
					url: '/pages/review/listPage?current=1'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.tips {
		color: #00aaff;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}
	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}
	.uni-margin-wrap {
		width:690rpx;
		width: 100%;;
	}
	.swiper {
		height: 400rpx;
	}
	.notice{
		display: flex;
		flex-flow: wrap row;
		width: 100%;
	}
	.swiper-nav{
		width: 90%;
		height: 30px;
		margin-left: 8px;
	}
	.right{
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 1; //可设置显示的行数
		 line-clamp: 1;
		 -webkit-box-orient: vertical;
		 color: #7e7b7b;
		 font-size: 13px;
	}
	.text {
		font-size: 35rpx;
		color: #7f7f7f;
		margin: 0 10px;
		margin-top: 50%;
		font-weight: bold;
	}
	.imageStyle {
		margin: 0 5px;
		margin-top: -5%;
		border-radius: 8px;
		/* box-sizing: border-box; */
		/* display: flex; */
		flex-direction: column;
		width: 80%;
	}
</style>
