<template>
	<view>
		<view v-if="projectId == 0">
			<!-- 刷新页面后的顶部提示框 -->
			<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
			<view class="report" v-for="(item, index) in reportList"  :key="item.resultId">
				<view class="reportr" >
					<view class="title">测评名称: {{item.classTitle}}</view>
					<view class="title">报告时间: {{item.createTime}}</view>
					<view class="title" style="display: flex;">
						<text>报告内容: </text>
						<view class="testbutton"  @click='detail(item.resultId, item.classId, item.classTitle,item.reportResult)'>查看详情</view>
					</view>
				</view>
			</view>	
			<view v-if="reportList.length == 0" style="text-align: center; margin: 10%;">用户暂无测评报告</view>
			<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
			<uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" />
		</view>
		<view v-if="projectId != 0">
			<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
			<view class="report" v-for="(item, index) in limitList">
				<view class="reportr" >
					<view class="title">项目名称: {{projectName}}</view>
					<view class="title">报告时间: {{item.createTime}}</view>
					<view class="title" style="display: flex;">
						<text>报告内容: </text>
						<view class="testbutton"  @click='detailProReview(item.limitId,item.classId)'>查看详情</view>
					</view>
				</view>
			</view>	
			<view v-if="limitList.length == 0" style="text-align: center; margin: 10%;">用户暂无测评报告</view>
			<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
			<uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" />
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				defaultCover: '../../static/default_cover.jpeg',
				reportList: [],
				// 查询字段，多个字段用 , 分割
				field: '_id,mode,avatar,title,user_name,excerpt,last_modify_date',
				formData: {
					status: 'loading', // 加载状态
				},
				tipShow: false, // 是否显示顶部提示框
				projectId : 0,
				projectName : '',
				limitList : [],
				userId : '',
				pCount : 0,
				refreshCount:0
			};
		},
		onUnload() {
			uni.navigateTo({
				url:  '/pages/user/index',
				success(res) {
					console.log(res)
				},
				fail(err) {
					console.log(err)
				}
			});
		},
		onLoad(option) {
			this.loadData()
		},
		methods: {
			detail(resultid, classId, title,reportResult) {
				let dongliangClassId = '402880f082eecb960182eee3b1ef0001'
				let dongliangClassProId = '2c9cff928408eab3018413a00d8a006a'
				//let pdfUrl = 'https://www.zhuxinkang.com/review/upload2/PDF/create/2022/09/20/cp-20220920204836310.pdf'
				if(classId == dongliangClassId || classId == dongliangClassProId){
					//跳转报告查看页面
					uni.navigateTo({
						url: '/pages/report/pdfreport?pdfUrl=' + encodeURIComponent(reportResult)
					})
				}else{
					uni.navigateTo({
						url: '/pages/report/report?source=1&resultId=' + resultid + "&classId=" + classId + "&title=" + title
					})
				}
			},
			detailProReview(limitId,classId){
				let that = this
				let projectId = that.projectId
				let pCount = that.pCount
				uni.navigateTo({
					url: '/pages/report/report?source=1&projectId=' + projectId + "&limitId=" + limitId + "&pCount=" + pCount + "&classId=" + classId  + "&resultId=" + '0'
				})
				
			},
			imageError(index) {
				this.reportList[index]["classCover"] = this.defaultCover
			},
			loadData() {
				this.reportList = []
				let userData = uni.getStorageSync("userData")
				let that = this
				that.userId = userData.userId
				uni.showLoading({
					title: "数据加载中"
				})
				
				let projectId = uni.getStorageSync("projectId")
				let projectClass = uni.getStorageSync("projectClass")
				if (!projectId) {
					projectId = 0
				}else {
					if(that.refreshCount == 0){
						that.projectId = projectId
						that.projectName = projectClass[0].projectName
						that.pCount = projectClass.length
						this.$apis.postProjectReviewCount({"userId": userData.userId, "projectId": projectId,"pCount" : projectClass.length}).then(res => {
							if(res.code == 200) {
								that.refreshCount += 1
								res.result.forEach((result) =>{
									that.limitList.push(result)
								})
							}
						})
					}
				}
				//查询测评记录
				this.$apis.postReviewReports({"userId": userData.userId, "projectId": projectId}).then(res => {
					that.tipShow = false
					uni.hideLoading()
					if (res.code == 200) {
						res.result.forEach((row) => {
							/* if (row.classCover) {
								row.classCover = that.$config.aliYunEndpoint + row.classCover
							} */
							that.reportList.push(row)
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					}
				}).catch(err => {
					that.tipShow = false
					uni.hideLoading()
					console.log(err)
				})
			},
			load(data, ended) {
				if (ended) {
					this.formData.status = 'noMore'
				}
			}
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.formData.status = 'more'
			this.tipShow = true
			this.loadData()
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			//this.$refs.udb.loadMore()
		}
	};
</script>

<style lang="scss">
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.tips {
		color: #67c23a;
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

	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.report {
		width: 88%;
		background: #fff;
		padding: 20rpx;
		border-radius: 50rpx;
		margin: 20rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	
	.reportl {
		width: 20%;
		padding-right: 27px;
	}
	.reportl .reportlimg {
		width: 180rpx;
		height: 233rpx;
	}
	
	.reportr {
		padding-left: 15rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	
	.reportr .title {
		width: 100%;
		color: #594e3f;
		font-size: 30rpx;
		margin: 20rpx 0 20rpx 0;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 1; //可设置显示的行数
		 line-clamp: 1;
		 -webkit-box-orient: vertical;
	}
	
	.reportr .subtitle {
		width: 100%;
		font-size: 25rpx;
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
	
	.reportr .conbottom {
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
	
	.reportr .agescope {
		font-size: 24rpx;
		color: #ff9912;
	}
	
	.reportr .testbutton {
		width: 140rpx;
		line-height: 54rpx;
		background: #55aaff;
		//border-radius: 27rpx;
		text-align: center;
		font-size: 26rpx;
		color: #fff;
		margin-left: 6px;
		margin-bottom: 10rpx;
	}
</style>
