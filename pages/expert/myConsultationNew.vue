<template>
	<view>
		<!-- 刷新页面后的顶部提示框 -->
		<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
		<view class="img-tab">
			<u-tabs :list="tabList" :current="current" @click="changeTab" @change="changeTab"></u-tabs>
	    </view>
		<view class="question" v-for="(consultationInfo, index) in consultationList"  :key="index">
			<view class="questionr">
				<view style="width: 90%;margin: 0 auto;padding: 20rpx 0;">
					<view class="title">{{'预约专家:' + consultationInfo.expertName}}</view>
					<view class="title">{{'预约时间:' + consultationInfo.visitDate}}({{consultationInfo.weekDayName}})  {{consultationInfo.beginTime}}-{{consultationInfo.endTime}}</view>
					<view class="title">{{'问诊内容：'}}<span class="view-button" @click='viewConsultationDetail(consultationInfo.calendarId)'>{{'查看详情'}}</span></view>
				</view>
			</view>
		</view>
		<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
		<uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" />
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	import config from '@/config/index.config.js';
	export default {
		components: {},
		data() {
			return {
				tabList: [{
					name: '待付款(0)',
				}, {
					name: '待开始(0)',
				}, {
					name: '已完成(0)'
				}, {
					name: '全部(0)'
				}],
				bodyShow: true, // 页面显示
				consultationList : [] //预约列表
			};
		},
		onLoad() {
			//查询我的问诊
			this.loadData();
		},
		methods: {
			loadData() {
				uni.showLoading({
					title: '数据加载中'
				})
				let that = this
				let userData = uni.getStorageSync('userData')
				this.$apis.postListConsultation({'userId': userData.userId}).then(res => {
					this.tipShow  = false
					uni.hideLoading()
					that.consultationList = []
					if (res.code == 200) {
						console.log(res.result)
						res.result.forEach((row) => {
							that.consultationList.push(row)
						})
						this.tabList[2].name = '已完成(' + that.consultationList.length + ')'
						this.tabList[3].name = '全部(' + that.consultationList.length + ')'
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			viewConsultationDetail(id){
				console.log('日历id：',id)
				//跳转到预约详情页面
				uni.navigateTo({
					url: '/pages/expert/consultationDetail?id=' + id
				})
			},
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				this.tipShow = true
				//初始化数据
				this.loadData(true)
			}
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
	.img-tab{
		width:100%;
		display: flex;
		justify-content: center;
		background: rgba(215,233,230,0.4);
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
		font-size: 28rpx;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //可设置显示的行数
		line-clamp: 1;
		-webkit-box-ori5ent: vertical;
		line-height: 60rpx;
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
	.img-radio{
		border-radius: 30rpx;
		height:100%;
		width:233rpx;
	}
	.item-masonry image {
	    width: 100%;
	}
	.question-evaluation{
		width: 150rpx;
		line-height: 60rpx;
		background: #628D3D;
		text-align: center;
		font-size: 24rpx;
		font-weight: 700;
		margin: 50rpx 20rpx 0 0;
		border-radius: 30rpx;
		color: #ffffff;
		float:right
	}
	.view-button{
		width: 150rpx;
		line-height: 60rpx;
		background: #628D3D;
		text-align: center;
		font-size: 24rpx;
		font-weight: 700;
		color: #ffffff;
		float:right;
	}
	view.data-v-3b2b1a80, scroll-view.data-v-3b2b1a80{
		background-color: transparent !important;
	}
</style>
