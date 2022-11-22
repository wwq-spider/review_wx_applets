<template>
	<view>
		<!-- 刷新页面后的顶部提示框 -->
		<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
		<view class="record" v-for="(item, index) in recordList"  :key="item.resultId">
			<view class="recordr" >
				<view class="recordl">
					<image class="recordlimg" :src="item.classCover || defaultCover" @error="imageError(index)"></image>
				</view>
				<view style="width: 70%;">
					<view class="title">{{item.classTitle}}</view>
					<view class="subtitle">测评时间: {{item.createTime}}</view>
					<!-- <view class="testbutton" @click='againTest(item.classId, item.classTitle)' >再测一次</view> -->
				</view>
			</view>
		</view>	
		<view v-if="recordList.length == 0" style="text-align: center; margin: 10%;">用户暂无测评记录</view>
		<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
		<uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				defaultCover: '../../static/default_cover.jpeg',
				recordList: [],
				// 查询字段，多个字段用 , 分割
				field: '_id,mode,avatar,title,user_name,excerpt,last_modify_date',
				formData: {
					status: 'loading', // 加载状态
				},
				tipShow: false // 是否显示顶部提示框
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
			let userData = uni.getStorageSync("userData")
			let that = this
			uni.showLoading({
				title: "数据加载中"
			})
			let pid = uni.getStorageSync("projectId")
			//查询测评记录
			this.$apis.postReviewRecords({"userId": userData.userId, "projectId": pid}).then(res => {
				uni.hideLoading()
				if (res.code == 200) {
					res.rows.forEach((row) => {
						if (row.classCover) {
							row.classCover = that.$config.aliYunEndpoint + row.classCover
						}
						that.recordList.push(row)
					})
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
			})
		},
		methods: {
			againTest(classid, title) {
				// uni.navigateTo({
				// 	url: '/pages/questions/questions?source=1&classId='+classid + "&title=" + title
				// })
				//如果未登录且是扫二维码进来的 则跳转到第一个量表
				let projectClass = uni.getStorageSync("projectClass")
				if(projectClass && projectClass.length > 0) {
					let classInfo = projectClass[0]
					uni.navigateTo({
						//url: '/pages/questions/questions?classId=' + projectClass[0].classId + "&title=" + projectClass[0].title
						url: '/pages/report/guide?classId=' + classInfo.classId
					})
				} else {
					uni.navigateTo({
						//url: '/pages/questions/questions?classId=' + projectClass[0].classId + "&title=" + projectClass[0].title
						url: '/pages/report/guide?classId=' + classid
					})
				}
			},
			imageError(index) {
				this.recordList[index]["classCover"] = this.defaultCover
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
			let userData = uni.getStorageSync("userData")
			let that = this
			let pid = uni.getStorageSync("projectId")
			this.$apis.postReviewRecords({"userId": userData.userId, "projectId": pid}).then(res => {
				this.tipShow  = false
				if (res.code == 200) {
					that.recordList = []
					res.rows.forEach((row) => {
						if (row.classCover) {
							row.classCover = that.$config.aliYunEndpoint + row.classCover
						}
						that.recordList.push(row)
					})
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
				uni.stopPullDownRefresh()
			}).catch(err => {
				uni.hideLoading()
				that.tipShow  = false
				console.log(err)
			})
			
			// this.$refs.udb.loadData({
			// 	clear: true
			// }, () => {
			// 	this.tipShow = true
			// 	clearTimeout(this.timer)
			// 	this.timer = setTimeout(()=>{
			// 		this.tipShow  = false
			// 	},1000)
			// 	uni.stopPullDownRefresh()
			// })
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
	
	.record {
		width: 88%;
		background: #fff;
		padding: 20rpx;
		border-radius: 50rpx;
		margin: 20rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	
	.recordl {
		width: 20%;
		padding-right: 27px;
	}
	.recordl .recordlimg {
		width: 180rpx;
		height: 233rpx;
	}
	
	.recordr {
		padding-left: 15rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	
	.recordr .title {
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
	
	.recordr .subtitle {
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
	
	.recordr .conbottom {
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
	
	.recordr .agescope {
		font-size: 24rpx;
		color: #ff9912;
	}
	
	.recordr .testbutton {
		width: 150rpx;
		line-height: 54rpx;
		background: #8bbeff;
		//border-radius: 27rpx;
		text-align: center;
		font-size: 26rpx;
		color: black;
		//margin-left: 10px;
		margin-top: 18%;
	}
</style>
