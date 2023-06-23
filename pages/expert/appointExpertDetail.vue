<template>
	<view>
        <view style="width: 100%;">
			<view class="question">
				<view>
					<view class="questionr">
						<view class="questionl">
							<image class="questionlimg" mode="scaleToFill" :src="calendarInfo.avatar || defaultCover" @error="imageError()"></image>
						</view>
						<view class="counsel-concent">
							<view class="counsel-charge">
								<u-row>
									<u-col>
										<span style="margin-right: 200rpx;line-height: 2;">
											<p>{{'预约类型: '}}<span style="color: #468c00;margin-left: 20rpx;">{{'线上预约'}}</span></p>
											<p>{{'预约咨询师: '}}<span style="color: #468c00;margin-left: 20rpx;">{{expertName}}</span></p>
											<p>{{'预约时间: '}}<span style="color: #468c00;margin-left: 20rpx;">{{visitDate + ' ' + beginTime + '-' + endTime}}</span></p>
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
			<view style="background: #ffffff;min-height: 700rpx;">
				<view style="font-size: 28rpx;color: #000000;display: block;text-align: center;">{{'咨询须知'}}</view>
				<view style="font-size: 24rpx;width: 85%;min-height: 400rpx;background: rgba(215,233,230, 0.4);border: 1rpx solid rgba(106,150,31,0.42);margin: 20rpx auto;padding: 20rpx;color: #555555;">
					<p>{{'1、咨询开始前24小时内概不退款，'}}</p>
					<p>{{'2、咨询开始24小时前可随时取消预约;'}}</p>
					<p>{{'3、咨询前15分钟可进去“咨询室”等待咨询师;'}}</p>
					<p>{{'4、咨询期间中断可在咨询时间段内再次进入，'}}</p>
				</view>
			</view>
		</view>
		<view>
			<view class="tabbar-bottom">
				<span>
					<p style="color: #416F5D; font-size: 34rpx;">{{'800/小时'}}</p>
				</span>
				<span class="buy-button" @click="appoint">{{'提交订单'}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				calendarInfo: {}, // 咨询师信息
				expertName:"",
				visitDate:"",
				beginTime:"",
				endTime:"",
				calendarId:"",
				expertId:"",
				mobilePhone:"",
				defaultCover: '../../static/default_cover.jpeg',
				avatar:"",
			}
		},
		onLoad(event) {
			if(event.expertName){
				this.expertName = decodeURIComponent(decodeURIComponent(event.expertName))
			}
			if(event.visitDate){
				this.visitDate = decodeURIComponent(decodeURIComponent(event.visitDate))
			}
			if(event.beginTime){
				this.beginTime = decodeURIComponent(decodeURIComponent(event.beginTime))
			}
			if(event.endTime){
				this.endTime = decodeURIComponent(decodeURIComponent(event.endTime))
			}
			if(event.calendarId){
				this.calendarId = decodeURIComponent(decodeURIComponent(event.calendarId))
			}
			if(event.expertId){
				this.expertId = event.expertId
			}
			if(event.mobilePhone){
				this.mobilePhone = decodeURIComponent(decodeURIComponent(event.mobilePhone))
			}
			this.loadData();
		},
		methods: {
			loadData() {
				let that = this
				//查询咨询师详情
				this.$apis.postCalendarDetail({'id': this.expertId}).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						that.calendarInfo = res.result
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
			imageError() {
				this.calendarInfo.avatar = this.defaultCover 
			},
			appoint() {
				let that = this
				let userData = uni.getStorageSync('userData')
				this.$apis.postOrderExpert({'id': this.calendarId}).then(res => {
					if (res.code == 200) {
						var resultList = []
						var obj = {
							"expertId" : this.expertId,
							"userId" : userData.userId,
							"calendarId" : this.calendarId,
							"patientName" : userData.userName,
							"patientSex" : userData.sex,
							"patientAge" : userData.age,
							"type" : "2",
							"status" : "1"
						}
						resultList.push(obj)
						this.$apis.postSaveOoderInfo(resultList).then(res => {
							if (res.code == 200) {
								wx.showToast({
									title : '预约成功',
									icon : 'success',
									duration : 1000
								});
								console.log("保存预约人信息成功");
								this.requestSubscribeMessage(that.visitDate,that.beginTime,that.endTime,that.expertName,res.result.id,that.mobilePhone);
							} else {
								uni.showToast({
									title: res.msg
								})
							}
							this.$apis.postSendAppointSuccessMsg({'expertName':that.expertName,'expertPhone':that.mobilePhone}).then(res => {
								if (res.code == 200) {
									console.log('给专家发送短信提醒成功')
									uni.switchTab({
										url: '/pages/index/indexNew'
									});
								} else {
									uni.showToast({
										title: res.msg
									})
								}
							}).catch(err => {
								console.log(err)
							})
						}).catch(err => {
							console.log(err)
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
			requestSubscribeMessage(visitDate,beginTime,endTime,expertName,consulId,mobilePhone){
				//获取用户授权允许接收服务通知
				uni.requestSubscribeMessage({
					//tmplIds:["tz0qAaZq2v0s3dZbfPnOYwkFy7QOF82XVFNvpLZGTNQ"],
					tmplIds:["4IVeiK2tYEmXqTcDJ7IVnXduD2CToUiV9Sz7ZHCObfs"],
					success:res=>{
						console.log('调起成功');
						if(res[tempId[0]] === 'accept'){
							console.log('允许')
						}
						if(res[tempId[0]] === 'reject'){
							console.log('拒绝')
						}
					},
					fail:err=>{
						if(err.errCode == 20004){
							console.log('关闭小程序主开关')
						}else{
							console.log('订阅失败')
						}
					}
				})
				//调用后端接口推送服务通知
				let userData = uni.getStorageSync('userData')
				var obj = {
					"touser" : userData.openid,
					"visitDate" : visitDate,
					"beginTime" : beginTime,
					"endTime" : endTime,
					"expertName" : expertName,
					"consulId" : consulId,
					"mobilePhone" : mobilePhone,
					"userId" : userData.userId
				}
				this.$apis.postsendMessage(obj).then(res => {
					if (res.errcode == 0) {
						console.log('模板消息推送成功')
					} else {
						console.log('模板消息推送失败')
					}
				}).catch(err => {
					console.log(err)
				})
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
		width: 233rpx;
		height: 270rpx;
	}
	.counsel-concent{
		width: 60%;
		color: #333333;
		font-size: 28rpx;
	}
</style>