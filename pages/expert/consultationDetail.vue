<template>
	<view class="consultationD" :class="{active: bodyShow}">
		<view class="consultationD-headicon">
			<view style="width: 100%;margin-left: 50rpx;margin-top: 20rpx;">
				<text class="title">{{consultationDetail.expertName}}</text>
				<text class="subtitle">{{consultationDetail.expertJobTitle}}|{{consultationDetail.expertLable}}</text>
			</view>
			<view class="consultationD-headicon1" style="margin-top: 20rpx;margin-left: 300rpx;">
				<image class="consultationD-headicon1img" :src="calendarInfo.avatar || defaultCover" @error="imageError()" mode="aspectFit"></image>
			</view>
		</view>
		<view class="consultationD-headicon">
			<view style="width: 100%;margin-left: 50rpx;margin-top: 20rpx;">
				<text class="title1">专家简介</text>
				<text class="subtitle">{{consultationDetail.expertIntroduction}}</text>
			</view>
		</view>
		<view class="consultationD-headicon">
			<view style="width: 100%;margin-left: 50rpx;margin-top: 20rpx;">
				<text class="title1">就诊人信息</text>
				<text class="subtitle">姓名: {{consultationDetail.patientName}}</text>
				<text class="subtitle">证件号: {{consultationDetail.userIdCard}}</text>
				<text class="subtitle">手机号: {{consultationDetail.userPhone}}</text>
				<text class="subtitle">预约时段: {{consultationDetail.weekDayName}}  {{consultationDetail.beginTime}} - {{consultationDetail.endTime}}</text>
			</view>
		</view>
		<view class="consultationD-headicon" v-if="consultationDetail.status == '1'">
			<view  class="canclebutton" style="margin-left: 315rpx;"  @click='cancelReservation()'>取消预约</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				bodyShow: true, // 页面显示
				consultationDetail : {}, //预约详情
				parentOpenid: '',
				openid: '',
				localtionPlatform: '',
				defaultCover: '../../static/man.png'
			}
		},
		onLoad(event) {
			if(event.id){
				this.id = event.id
			}
			//初始化数据
			this.loadData();
		},
		methods: {
			loadData() {
				let that = this
				uni.showLoading({
					title: "数据加载中"
				})
			
				this.$apis.postListConsultationDetai({'id': this.id}).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						console.log("获取我的问诊详情成功");
						console.log(res.result);
						res.result.forEach((row) => {
							that.consultationDetail = row
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			cancelReservation(){
				let that = this
				//let userData = uni.getStorageSync('userData')
				var obj = {
					"id" : this.consultationDetail.id,
					"calendarId" : this.consultationDetail.calendarId,
					"userPhone" : this.consultationDetail.userPhone,
					"patientName" : this.consultationDetail.patientName,
					"expertPhone" : this.consultationDetail.expertPhone,
					"expertName" : this.consultationDetail.expertName,
					"weekDayName" : this.consultationDetail.weekDayName,
					"beginTime" : this.consultationDetail.beginTime,
					"endTime" : this.consultationDetail.endTime
				}
				this.$apis.postCancelReser(obj).then(res => {
					if (res.code == 200) {
						console.log("取消预约成功");
						wx.showToast({
							title : '取消成功',
							icon : 'success',
							duration : 1000
						})
						setTimeout(function(){
							//跳转到专家详情页面
							uni.navigateTo({
								url: '/pages/expert/myConsultation'
							})
						},1000)
						
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #f1f1f1;
	}
</style>
<style lang="scss" scoped>
	.consultationD {
		display: none;
		&.active {
			display: block;
		}
	}
	.consultationD-headicon {
		width: 110%;
		background: #fff;
		padding: 3rpx;
		box-shadow: 0 0 28rpx 0 rgba(155, 153, 146, 0.18);
		border-radius: 6rpx;
		margin: 20rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	.title {
		color: #594e3f;
		font-size: 35rpx;
		font-weight: 800;
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
		-webkit-box-orient: vertical;
	}
	.title1 {
		color: #594e3f;
		font-size: 30rpx;
		font-weight: 800;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //可设置显示的行数
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.consultationD-headicon1 {
		width: 100%;
		background: #fff;
		padding: 3rpx;
		box-shadow: 0 0 28rpx 0 rgba(155, 153, 146, 0.18);
		margin: 20rpx auto;
	
	}
	.consultationD-headicon1 .consultationD-headicon1img{
		width: 100rpx;
		height: 100rpx;
	}
	.canclebutton {
		width: 130rpx;
		line-height: 50rpx;
		background: #ccc6c8;
		text-align: center;
		font-size: 26rpx;
		color: #000000;
	}
</style>
