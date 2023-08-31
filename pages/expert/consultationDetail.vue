<template>
	<view>
        <view style="width: 100%;">
			<view class="question">
				<view>
					<view class="questionr">
						<view class="questionl">
							<image class="questionlimg" mode="scaleToFill" :src="consultationDetail.avatar || defaultCover" @error="imageError()"></image>
						</view>
						<view class="counsel-concent">
							<view class="counsel-charge">
								<u-row>
									<u-col>
										<span style="margin-right: 200rpx;line-height: 2;">
											<p>{{'预约类型: '}}<span style="color: #468c00;margin-left: 20rpx;">{{'线上预约'}}</span></p>
											<p>{{'预约咨询师: '}}<span style="color: #468c00;margin-left: 20rpx;">{{consultationDetail.expertName}}</span></p>
											<p>{{'预约时间: '}}<span style="color: #468c00;margin-left: 20rpx;">{{consultationDetail.visitDate}}({{consultationDetail.weekDayName}})  {{consultationDetail.beginTime}} - {{consultationDetail.endTime}}</span></p>
											<p>{{'咨询时长: '}}<span style="color: #468c00;margin-left: 20rpx;">{{'60分钟'}}</span></p>
										</span>
									</u-col>
								</u-row>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%; height: 20rpx;margin: 20rpx 0;background-color: rgba(237,237,237,0.4);"></view>
			<view style="background: #ffffff;min-height: 300rpx;">
				<view style="font-size: 28rpx;color: #000000;display: block;text-align: center;">{{'专家介绍'}}</view>
				<view style="font-size: 24rpx;width: 85%;min-height: 200rpx;background: rgba(215,233,230, 0.4);border: 1rpx solid rgba(106,150,31,0.42);margin: 20rpx auto;padding: 20rpx;color: #555555;">
					<p>{{consultationDetail.expertIntroduction}}</p>
				</view>
			</view>
			<view style="width: 100%; height: 20rpx;margin: 20rpx 0;background-color: rgba(237,237,237,0.4);"></view>
			<view style="background: #ffffff;min-height: 200rpx;">
				<view style="font-size: 28rpx;color: #000000;display: block;text-align: center;">{{'咨询须知'}}</view>
				<view style="font-size: 24rpx;width: 85%;min-height: 150rpx;background: rgba(215,233,230, 0.4);border: 1rpx solid rgba(106,150,31,0.42);margin: 20rpx auto;padding: 20rpx;color: #555555;">
					<p>{{'1、咨询开始前24小时内概不退款；'}}</p>
					<p>{{'2、咨询开始24小时前可随时取消预约；'}}</p>
					<p>{{'3、咨询前15分钟可进去“咨询室”等待咨询师；'}}</p>
					<p>{{'4、咨询期间中断可在咨询时间段内再次进入。'}}</p>
				</view>
			</view>
		</view>
		<view>
			<view class="tabbar-bottom" v-if="consultationDetail.isCancle == '1'">
				<span class="buy-button" @click="cancelReservation">{{'取消预约'}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				consultationDetail : {}, //预约详情
				parentOpenid: '',
				openid: '',
				localtionPlatform: '',
				//defaultCover: '../../static/man.png',
				defaultCover: '../../static/default_cover.jpeg',
				buyBtnText: "立即支付",
				videoConsult:'',
				isConfirmByExpert:''
			}
		},
		onLoad(event) {
			if(event.id){
				this.id = event.id
			}
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
						that.videoConsult = res.result.videoConsult;
						that.isConfirmByExpert = res.result.isConfirmByExpert;
						res.result.forEach((row) => {
							that.consultationDetail = row
							that.buyBtnText = "立即支付"
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
								url: '/pages/expert/myConsultationNew'
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
			},
			imageError() {
				this.consultationDetail.avatar = this.defaultCover 
			},
		}
	}
</script>

<style>
	.tabbar-bottom{
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 998;
		box-sizing: content-box;
		background: rgba(215,233,230, 0.4);
		height: 110rpx;
		justify-content: space-around;
	}
	.buy-button{
		width: 400rpx;
		line-height: 80rpx;
		background: #628D3D;
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
		border-radius: 20rpx;
		color: #ffffff;
		float:right
	}
	.question {
		width: 100%;
		background: #fff;
		padding: 20rpx;
		box-shadow: 0 0 28rpx 0 rgb(155 153 146 / 18%);
		margin: 20rpx;
	}
	.questionr {
		padding: 20rpx 0rpx 20rpx 0rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 88%;
	}
	.questionl {
		width: 30%;
		padding-right: 27px;
	}
	.questionl .questionlimg {
		width: 240rpx;
		height: 280rpx;
	}
	.counsel-concent{
		width: 60%;
		color: #333333;
		font-size: 28rpx;
	}
</style>