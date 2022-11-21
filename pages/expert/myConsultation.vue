<template>
	<view class="expert" :class="{active: bodyShow}">
		<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
		<view class="consultation" v-for="(consultationInfo, index) in consultationList"  :key="index">
			<view class="consultationr" >
				<view class="title">
					<text>预约专家: {{consultationInfo.expertName}}</text>
					<text style="position: absolute;right: 10rpx;margin-right: 90rpx;">{{consultationInfo.statusName}}  {{consultationInfo.payStatusName}}</text>
				</view>
				<view class="title">预约时间: {{consultationInfo.visitDate}}({{consultationInfo.weekDayName}})  {{consultationInfo.beginTime}}-{{consultationInfo.endTime}}</view>
				<view class="title" style="display: flex;">
					<text>问诊内容: </text>
					<view class="testbutton" @click='viewConsultationDetail(consultationInfo.id)'>查看详情</view>
				</view>
			</view>
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
				consultationList : [] //预约列表
			}
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
	}
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
	
	.expert {
		display: none;
		&.active {
			display: block;
		}
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
	
	.consultation {
		width: 88%;
		background: #fff;
		padding: 20rpx;
		border-radius: 50rpx;
		margin: 20rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	.consultationr {
		padding-left: 15rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	.consultationr .title {
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
	.consultationr .testbutton {
		width: 140rpx;
		line-height: 54rpx;
		background: #77beff;
		text-align: center;
		font-size: 26rpx;
		color: #fff;
		margin-left: 10px;
	}
</style>