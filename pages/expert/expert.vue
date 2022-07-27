<template>
	<view class="expert" :class="{active: bodyShow}">
		<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
		<view class="calendar-headicon" v-for="(calendarInfo, index) in calendarList">
			<view class="calendar-headicon" @click='viewCalendarDetail(calendarInfo.id, calendarInfo.title)' :key="index">
				<view class="calendar-headicon1" style="margin-left: 10rpx;">
					<image class="calendar-headicon1img" mode="scaleToFill" src="@/static/man.png"></image>
				</view>
				<view style="width: 60%;margin-right: 220rpx;">
					<text class="title">{{calendarInfo.expertName}}</text>
					<text class="subtitle">{{calendarInfo.jobTitle}}|{{calendarInfo.label}}</text>
				</view>
				<view>
					<view class="savebutton" @click='orderExpert(calendarInfo.id)'>预约</view>
				</view>
			</view>
			
		</view>
		<uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" />
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	import config from '@/config/index.config.js';
	export default {
		data() {
			return {
				bodyShow: true, // 页面显示
				parentOpenid: '',
				openid: '',
				localtionPlatform: '',
				modelTel: '', // 专家手机号码
				calendarList: []//专家列表
			}
		},
		onLoad(option) {
			//初始化数据
			this.loadData();
		},
		methods: {
			loadData(pullRefresh) {
				uni.showLoading({
					title: '数据加载中'
				})
				let that = this
				//查询专家列表
				this.$apis.postCalendarList({"page": 1, rows: 20}).then(res => {
					this.tipShow  = false
					uni.hideLoading()
					that.calendarList = []
					if (res.code == 200) {
						if(pullRefresh) {
							uni.stopPullDownRefresh()
						}
						console.log("获取专家列表成功");
						let queryParamList = []
						res.rows.forEach((row) => {
							that.calendarList.push(row)
							queryParamList.push({"id": row.id, "title": row.title})
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					that.tipShow  = false
					console.log(err)
				})
			},
			viewCalendarDetail(id, title){
				//跳转到专家详情页面
				uni.navigateTo({
					url: '/pages/expert/expertInfo?id=' + id
				})
				
			},
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				this.tipShow = true
				//初始化数据
				this.loadData(true)
			},
			//预约专家
			orderExpert(id){
				//跳转到专家详情页面
				uni.navigateTo({
					url: '/pages/expert/expertInfo?id=' + id
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f1f1f1;
	}
</style>
<style lang="scss">
	@import '@/common/uni-ui.scss';
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
	.calendar-headicon {
		width: 95%;
		background: #fff;
		padding: 3rpx;
		box-shadow: 0 0 28rpx 0 rgba(155, 153, 146, 0.18);
		border-radius: 50rpx;
		margin: 10rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	.calendar-headicon1 {
		width: 30%;
		padding-right: 27px;
	}
	.calendar-headicon1 .calendar-headicon1img{
		width: 100rpx;
		height: 100rpx;
	}
	.title {
		color: #594e3f;
		font-size: 35rpx;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //可设置显示的行数
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.subtitle {
		font-size: 25rpx;
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
	.savebutton {
		/* width: 100rpx;
		line-height: 50rpx;
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 40rpx auto;
		text-align: center;
		//background-color: #B0E0E6;
		background-color: #febd00;
		margin-left:10rpx;
		vertical-align: middle; */
		
		width: 120rpx;
		line-height: 60rpx;
		background: #EFE4C8;
		text-align: center;
		font-size: 26rpx;
		color: black;
		margin-top: 25%;
	}
</style>
