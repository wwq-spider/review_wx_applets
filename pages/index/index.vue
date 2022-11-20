<template>
	<view class="content">
		<!-- 刷新页面后的顶部提示框 -->
		<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
		<page-meta :root-font-size="footSize"></page-meta>
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
		<view class="notice" v-if="noticeList.length > 0">
			<uni-icons type="sound-filled" size="18" color="#55aaff" style="margin-left: 3px;"></uni-icons>
			<swiper class="swiper-nav" :circular="true" vertical="true" :autoplay="true" :interval="5000" :duration="1000">
				<swiper-item style="display: table;"  v-for="(item,index) in noticeList" :key="index">
					<view class="right" @click="noticeDetail(item.id)">{{item.noticeName}}</view>					
				</swiper-item>
			</swiper>
		</view>
		<uni-notice-bar v-if="noticeList.length == 0" single="true" text="暂无公告" showIcon="true" style="width: 100%; margin-bottom: -10px;" background-color="blank" color="#b9b9b8"></uni-notice-bar>
		<view class="_scroll-list" v-if="false">
			<view class="savebutton" @click="beginRecord">开始录制</view>
		</view>
		<view v-for="(subject, index1) in subjectList" style="width: 100%;">
			<view class="_scroll-list" v-if="subject.classList.length > 0">
				<view class="_scroll-head" v-if="subject.classList.length > 0">
					<uni-icons type="list" size="16" color="#55aaff"></uni-icons>
					<!-- <image src="@/static/ic-label.png" mode="widthFix"  style="width: 25rpx; height: 25rpx;" class="_img"></image> -->
					<text class="_text">{{subject.subjectName}}</text>
				</view>
			</view>
			<view class="scroll-list" v-if="subject.classList.length > 0">
				<view class="hot" v-for="(review, index2) in subject.classList">
					<view class="hotr" @click='beginTest(review.classId, review.title)'>
						<view class="hotl">
							<image class="hotlimg" mode="scaleToFill" :src="review.bannerImg || defaultCover" @error="imageError(index1, index2, 1)"></image>
							<view class="title">{{review.title}}</view>
							<view v-if="review.charge==1">
								<span class="iconfont" style="color: #df7a58;font-size: 9px;">&#xe606;{{review.realPrice}}</span>
								<span class="iconfont" style="padding-left: 5px; color: #857f77;font-size: 9px;text-decoration:line-through;" v-if="review.dicounPrice != '0' && review.dicounPrice != '0.00'">&#xe606;{{review.orgPrice}}</span>
								<span style="padding-left: 10px; color: #857f77; font-size: 9px;">{{review.buyCount}}人付款</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<view class="_scroll-list" color="#cfd6d5">
			<uni-notice-bar v-if="pCount > 0" style="width: 100%;" color="#4a4c4b" background-color="blank" :text="`项目介绍：${projectDesc}`"></uni-notice-bar>
			<uni-notice-bar v-if="pCount > 0" color="#4a4c4b" style="width: 100%;" background-color="blank" :text="`本次测评共由 ${pCount} 个量表组成，单个量表完成可自动进入下一个量表测评，若中途退出将重新开始测评。`"></uni-notice-bar>
			<view v-if="pCount > 0" class="savebutton" @click="startTest">开始测试</view>
		</view>
		<view v-if="isshow == 1">
			<view class="_scroll-list">
				<view class="_scroll-head">
					<uni-icons type="list" size="20" color="#55aaff"></uni-icons>
					<text class="_text">列表</text>
				</view>
			</view>
		
			<view class="question" v-for="(reviewClass, index) in reviewClassList">
				<view class="questionr" @click='beginTest(reviewClass.classId, reviewClass.title)' :key="index">
					<view class="questionl">
						<image class="questionlimg" mode="scaleToFill" :src="reviewClass.bannerImg || defaultCover" @error="imageError(0, index, 2)"></image>
					</view>
					<view style="width: 60%;">
					
						<view class="title">{{reviewClass.title}}</view>
						<view class="subtitle">{{reviewClass.classDesc}}</view>
						<view v-if="reviewClass.charge==1">
							<span class="iconfont" style="color: #df7a58;font-size: 9px;">&#xe606;{{reviewClass.realPrice}}</span>
							<span class="iconfont" style="padding-left: 5px; color: #857f77;font-size: 9px;text-decoration:line-through;" v-if="reviewClass.dicounPrice != '0' && reviewClass.dicounPrice != '0.00'">&#xe606;{{reviewClass.orgPrice}}</span>
							<span style="padding-left: 10px; color: #857f77; font-size: 9px;">{{reviewClass.buyCount}}人付款</span>
						</view>
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
				pCount: 0,
				defaultBanner: this.$config.defaultBanner,
				defaultCover: '../../static/default_cover.jpeg',
				autoplay: true,
				interval: 2000,
				duration: 500,
				windowWidth: 0,
				footSize: this.$footFontSize,
				banner: [{'topic_id': 1, banner_img: '@/static/banner.png'}], // 轮播图
				hotList: [], // 热门测试
				reviewClassList: [], // 上新测试
				projectId: 0,
				tipShow: false ,// 是否显示顶部提示框,
				projectClassIdsObj: {},
				subjectList: [], //测评专题列表
				noticeList: [],
				bannerList: [],
				isshow : 1,
				projectDesc:''
			}
		},
		computed: {
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
		onShareAppMessage(res) {
		    return {
		      title: '心宅同行心理健康服务平台',
		      path: 'pages/index/index?source=1'
		    }
		},
		onShareTimeline() {
			return {
			  title: '心宅同行心理健康服务平台',
			  path: 'pages/index/index?source=1'
			}
		},
		onLoad(option) {
			uni.showShareMenu({
				title: '心宅同行心理健康服务平台',
				path: 'pages/index/index?source=1'
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
							that.defaultBanner = that.$config.aliYunEndpoint +  res.result.cover
						}
					})
				}
			}
			//初始化数据
			this.loadData()
		},
		methods: {
			beginRecord() {
				uni.navigateTo({
					url: '/pages/review/video?classId=123&title=456'
				})
			},
			noticeDetail(id){
				uni.navigateTo({
					url: '/pages/index/notice_detail?id=' + id
				})
			},
			//开始测试
			startTest() {
				//如果未登录且是扫二维码进来的 则跳转到第一个量表
				let projectClass = uni.getStorageSync("projectClass")
				if(projectClass && projectClass.length > 0) {
					let currentClassId = uni.getStorageSync("currentClassId")
					if (!currentClassId || currentClassId == '') {
						currentClassId = projectClass[0].classId
					}
					uni.redirectTo({
						//url: '/pages/questions/questions?classId=' + projectClass[0].classId + "&title=" + projectClass[0].title
						url: '/pages/report/guide?classId=' + currentClassId
					})
				} else {
					uni.showToast({
						title: '当前用户不支持此操作'
					})
				}
			},
			isProjectClass() {
				let projectId = uni.getStorageSync("projectId")
				if(projectId && projectId > 0) {
					return true
				}
				return false
			},
			loadData(pullRefresh) {
				uni.showLoading({
					title: '数据加载中'
				})
				let that = this
				//查询通知公告
				this.$apis.postNoticeList({"page": 1, rows: 20}).then(res => {
					if (res.code == 200) {
						that.noticeList = res.rows
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				})
				
				let pid = uni.getStorageSync("projectId")
				if(!pid || pid == 0) {
					//查询banner
					this.$apis.postBannerList({"page": 1, rows: 20}).then(res => {
						if (res.code == 200) {
							that.bannerList = []
							res.rows.forEach((row) => {
								if (row.imgUrl) {
									row.imgUrl = that.$config.aliYunEndpoint + row.imgUrl
								}
								that.bannerList.push(row)
							})
						} else {
							uni.showToast({
								title: res.msg
							})
						}
					})
				}
				
				//查询分类
				this.$apis.postReviewClass({"projectId": pid}).then(res => {
					this.tipShow  = false
					uni.hideLoading()
					that.reviewClassList = []
					that.hotList = []
					if (res.code == 200) {
						
						//this.isshow = res.isshow
						if(pullRefresh) {
							uni.stopPullDownRefresh()
						}
						let projectClass = []
						res.rows.forEach((row) => {
							if (row.bannerImg) {
								row.bannerImg = that.$config.aliYunEndpoint + row.bannerImg
							}
							if(that.projectId == 0 && row.type == 2) {
								that.hotList.push(row)
							} else {
								that.reviewClassList.push(row)
								this.isshow = row.showClass
								this.projectDesc = row.projectDesc
							}
							if(pid && pid > 0) {
								row.charge = 0
								projectClass.push({"classId": row.classId, "title": row.title})
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
				
				if(!pid || pid == 0) {
					//查询专题
					this.$apis.postReviewSubjectClass({"dataGrid": {"page": 1, "rows": 4}}).then(res => {
						that.subjectList = []
						that.hotList = []
						if (res.code == 200) {
							let projectClass = []
							res.rows.forEach((row) => {
								if (row.classList && row.classList.length > 0) {
									row.classList.forEach((classInfo) => {
										if (classInfo.bannerImg) {
											classInfo.bannerImg = that.$config.aliYunEndpoint + classInfo.bannerImg
										}
									})
								}
							})
							that.subjectList = res.rows
						}
					}).catch(err => {
						uni.hideLoading()
						that.tipShow  = false
						console.log(err)
					})
				}
			},
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				this.tipShow = true
				//初始化数据
				this.loadData(true)
			},
			imageError(index1, index2, type) {
				if (type == 1) {
					this.subjectList[index1].classList[index2]["bannerImg"] = this.defaultCover
				} else {
					this.reviewClassList[index2]["bannerImg"] = this.defaultCover
				}
			},
			beginTest(classid, title) {
				let projectClass = uni.getStorageSync("projectClass")
				if(projectClass && projectClass.length > 0) {
					return
				}
				//跳转到当前量表
				uni.navigateTo({
					//url: '/pages/questions/questions?classId='+classid + "&title=" + title
					//url: '/pages/report/guide?classId=' + classid
					url: '/pages/review/detail?classId=' + classid
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
	.notice{
		display: flex;
		/* justify-content: space-around; */
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
	.swiper-item {
		display: block;
		height: 400rpx;
		line-height: 300rpx;
		text-align: center;
	}
	
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
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
	._scroll-head ._img {
		display: block;
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}
	._scroll-head ._text {
		font-size: 30rpx;
		/* font-weight: bold; */
		color: #737373;
		padding-left: 8px;
	}
	.scroll-list {
		display: flex;			
		justify-content: space-around; 
		flex-flow: wrap row;
	}
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

	.hot {
		width: 42%;
		background: #fff;
		padding: 15rpx;
		box-shadow: 0 0 28rpx 0 rgb(155 153 146 / 18%);
		border-radius: 50rpx;
		margin: 18rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}

	.hotl .hotlimg {
		width: 100%;
		height: 233rpx;
	}

	.hotr {
		padding-left: 24rpx;
		width: 100%;
	}

	.hotr .title {
		color: #594e3f;
		font-size: 23rpx;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 1; //可设置显示的行数
		 line-clamp: 1;
		 -webkit-box-orient: vertical;
	}

	.hotr .subtitle {
		font-size: 20rpx;
		color: #857f77;
		margin: 20rpx 0 20rpx 0;
		line-height: 1.6;
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 3; //可设置显示的行数
		 line-clamp: 3;
		 -webkit-box-orient: vertical;
	}

	.hotr .conbottom {
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

	.hotr .agescope {
		font-size: 24rpx;
		color: #ff9912;
	}

	.hotr .testbutton {
		width: 140rpx;
		line-height: 54rpx;
		background: #febd00;
		border-radius: 27rpx;
		text-align: center;
		font-size: 26rpx;
		color: #fff;
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
		 width: 30%;
		padding-right: 27px;
	}
	.questionl .questionlimg {
		width: 233rpx;
		height: 233rpx;
	}
	
	.questionr {
		padding-left: 10rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
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
		 -webkit-box-orient: vertical;
	}
	
	.questionr .subtitle {
		font-size: 20rpx;
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
	
	.savebutton {
		width: 622rpx;
		line-height: 90rpx;
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 40rpx auto;
		text-align: center;
		/* background: url(../../static/savebtn.png) no-repeat 50%/100%; */
		background-color: #80ccff;
	}
</style>
