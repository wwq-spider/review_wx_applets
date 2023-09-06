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
				<swiper-item v-if="bannerList.length == 0 || projectId > 0"  :autoplay="autoplay" :interval="interval" :duration="duration">
					<image :src="defaultBanner" mode="scaleToFill" :style="{width: `${windowWidth}px`, height: `${windowWidth/2}px`}" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 通告 -->
		<view class="notice" v-if="noticeList.length > 0 && pCount == 0">
			<uni-icons type="sound-filled" size="18" color="#55aaff" style="margin-left: 3px;"></uni-icons>
			<swiper class="swiper-nav" :circular="true" vertical="true" :autoplay="true" :interval="5000" :duration="1000">
				<swiper-item style="display: table;"  v-for="(item,index) in noticeList" :key="index">
					<view class="right" @click="noticeDetail(item.id)">{{item.noticeDesc}}</view>					
				</swiper-item>
			</swiper>
		</view>
		<uni-notice-bar v-if="noticeList.length == 0" single="true" text="暂无公告" showIcon="true" style="width: 100%; margin-bottom: -10px;" background-color="blank" color="#b9b9b8"></uni-notice-bar>
		<!-- 服务项目列表 -->
		<view v-if="pCount == 0">
			<text class="text">服务项目</text>
			<view class="imageStyle">
				<image @click="toPsychometrics" mode="scaleToFill" class="psychometrics" src="/static/psychometrics.png"></image>
				<image @click="toPsychologicalCounsel" mode="scaleToFill" class="psychometrics" src="/static/counsel.png"></image>
				<image @click="toCareerPlanning" mode="scaleToFill" class="psychometrics" src="/static/CareerPlanning.png"></image>
				<image @click="toPsychologicalCourses" mode="scaleToFill" class="psychometrics" src="/static/psychologicalCourses.png"></image>
				<image @click="toPsychologicalMall" mode="scaleToFill" class="psychometrics" src="/static/psychologicalMall.png"></image>
				<image @click="toProfessionalSupport" mode="scaleToFill" class="psychometrics" src="/static/professionalSupport.png"></image>
				<image @click="toPharedRoom" mode="scaleToFill" class="psychometrics" src="/static/sharedRoom.png"></image>
			</view>
		</view>
		<!-- 项目测评 -->
		<view v-if="pCount > 0" class="_scroll-list" color="#cfd6d5">
			<uni-notice-bar style="width: 100%;" color="#4a4c4b" background-color="blank" :text="`项目介绍：${projectDesc}`"></uni-notice-bar>
			<uni-notice-bar color="#4a4c4b" style="width: 100%;" background-color="blank" :text="`本次测评共由 ${pCount} 个量表组成，单个量表完成可自动进入下一个量表测评，若中途退出将重新开始测评。`"></uni-notice-bar>
			<view class="startTest" @click="startTest">开始测试</view>
		</view>
		<view  v-if="pCount > 0">
			<view class="question" v-for="(reviewClass, index) in reviewClassList">
				<view class="questionr">
					<view class="questionl">
						<image class="questionlimg" mode="scaleToFill" :src="reviewClass.bannerImg || defaultCover" @error="imageError(0, index, 2)"></image>
					</view>
					<view style="width: 48%;margin-top: 0rpx;">
						<view class="title">{{reviewClass.title}}</view>
						<view class="subtitle">{{reviewClass.classDesc}}</view>
					</view>
				</view>
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
				defaultBanner: this.$config.defaultBanner,
				projectId: 0,
				hotList: [], // 热门测试
				projectDesc:'',
				reviewClassList: [],
				//isshow : 1,
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
			}
		},
		//分享页面标题设置
		onShareAppMessage(res) {
		    return {
		      title: '沃心理SAAS平台',
		      path: 'pages/index/indexNew?source=1'
		    }
		},
		onShareTimeline() {
			return {
			  title: '沃心理SAAS平台',
			  path: 'pages/index/indexNew?source=1'
			}
		},
		onLoad(option) {
			uni.showShareMenu({
				title: '沃心理SAAS平台',
				path: 'pages/index/indexNew?source=1'
			})
			if(option && option.scene) {
				let arr = decodeURIComponent(option.scene).split("*")
				if(arr.length == 2) {
					this.projectId = parseInt(arr[0].split("/")[1])
					uni.setStorageSync("projectId", this.projectId)
					this.pCount = 100
					//设置超时加入用户组
					let that = this
					this.$apis.postReviewProjectDetail({"id": this.projectId}).then(res => {
						if(res.code == 200) {
							that.defaultBanner = res.result.cover
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
					return
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
							that.defaultBanner = res.result.cover
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
				//查询分类
				this.$apis.postReviewClass({"projectId": pid}).then(res => {
					this.tipShow  = false
					uni.hideLoading()
					that.reviewClassList = []
					that.hotList = []
					if (res.code == 200) {
						if(pullRefresh) {
							uni.stopPullDownRefresh()
						}
						let projectClass = []
						res.result.forEach((row) => {
							if(that.projectId == 0 && row.type == 2) {
								that.hotList.push(row)
							} else {
								that.reviewClassList.push(row)
								this.projectDesc = row.projectDesc
							}
							if(pid && pid > 0) {
								projectClass.push({"classId": row.classId, "title": row.title,"projectName":row.projectName})
							}
						})
						//保存到本地缓存中 共下次使用
						if (projectClass.length > 0) {
							uni.setStorageSync("projectClass", projectClass)
							that.pCount = projectClass.length
						} else {
							uni.removeStorageSync("projectClass")
							that.pCount = 0
						}
					}
				}).catch(err => {
					uni.hideLoading()
					that.tipShow  = false
					console.log(err)
				})
			},
			/* 跳转到心理评测页面 */
			toPsychometrics() {
				getApp().globalData.switchId = 0
				uni.switchTab({
					url: '/pages/review/listPage'
				})
			},
			/* 跳转到心理咨询页面 */
			toPsychologicalCounsel() {
				getApp().globalData.switchId = 1
				uni.switchTab({
					url: '/pages/review/listPage'
				})
			},
			/* 跳转到生涯规划页面 */
			toCareerPlanning() {
				getApp().globalData.switchId = 2
				uni.switchTab({
					url: '/pages/review/listPage'
				})
			},
			/* 跳转到心理课程 */
			toPsychologicalCourses() {
				getApp().globalData.switchId = 3
				uni.switchTab({
					url: '/pages/review/listPage'
				})
			},
			/* 跳转到心理商城 */
			toPsychologicalMall() {
				getApp().globalData.switchId = 4
				uni.switchTab({
					url: '/pages/review/listPage'
				})
			},
			/* 跳转到专业支持页面 */
			toProfessionalSupport() {
				getApp().globalData.switchId = 5
				uni.switchTab({
					url: '/pages/review/listPage'
				})
			},
			/* 跳转到共享咨询师页面 */
			toPharedRoom() {
				getApp().globalData.switchId = 6
				uni.switchTab({
					url: '/pages/review/listPage'
				})
			},
			/* 开始项目测评 */
			startTest() {
				//如果未登录且是扫二维码进来的 则跳转到第一个量表
				let projectClass = uni.getStorageSync("projectClass")
				if(projectClass && projectClass.length > 0) {
					let currentClassId = uni.getStorageSync("currentClassId")
					if (!currentClassId || currentClassId == '') {
						currentClassId = projectClass[0].classId
					}
					uni.redirectTo({
						url: '/pages/report/guide?classId=' + currentClassId
					})
				} else {
					uni.showToast({
						title: '当前用户不支持此操作'
					})
				}
				/* let projectClass = uni.getStorageSync("projectClass")
				if(projectClass && projectClass.length > 0) {
					let currentClassId = projectClass[0].classId
					uni.redirectTo({
						url: '/pages/report/guide?classId=' + currentClassId
					})
				} else {
					uni.showToast({
						title: '当前用户不支持此操作'
					})
				} */
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
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
		margin: 1% 2% 0 2%;
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
		font-size: 30rpx;
	}
	.text {
		font-size: 35rpx;
		color: #7f7f7f;
		margin: 0 15px;
		margin-top:15%;
		font-weight: bold;
	}
	.imageStyle {
		margin-top: -2%;
		border-radius: 8px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.psychometrics {
		width: 730rpx;
		height: 360rpx;
		border-radius: 25rpx;
		margin: 0 auto;
	}
	._scroll-list {
		border-bottom: 20rpx solid #eee;
		width: 100%;
	}
	.startTest {
		width: 622rpx;
		line-height: 90rpx;
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 40rpx auto;
		text-align: center;
		background-color: #628D3D;
	}
	.question {
		width: 88%;
		padding: -1rpx;
		background: rgba(215,233,230,0.41);
		border-radius: 50rpx;
		margin: 20rpx auto;
	}
	.questionr {
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	.questionl {
		width: 40%;
		padding-right: 27px;
	}
	.questionl .questionlimg {
		width: 305rpx;
		height: 233rpx;
		border-radius: 20rpx;
	}
	.questionr .title {
		color: #594e3f;
		font-size: 34rpx;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //可设置显示的行数
		line-clamp: 1;
		-webkit-box-ori5ent: vertical;
	}
	.questionr .subtitle {
		font-size: 28rpx;
		color: #857f77;
		margin: 10rpx 0 20rpx 0;
		line-height: 1.3;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; //可设置显示的行数
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.listtitle2 {
		color: #3d7a00;
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: bold;
		padding-top: 22rpx;
	}
	.question-evaluation{
		width: 150rpx;
		line-height: 60rpx;
		background: #628D3D;
		text-align: center;
		font-size: 30rpx;
		font-weight: 700;
		margin: -55rpx 10rpx 0 0;
		border-radius: 22rpx;
		color: #ffffff;
		float:right;
		padding: 2rpx 0 2rpx 0;
	}
</style>
