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
			<view>
				<view style="display: inline-flex;">
					<p style="margin: 0 0 30rpx 40rpx;">需支付咨询费</p>
					<p style="margin: 0 20rpx 10rpx 400rpx;color: #ff0000;">{{'￥'+ calendarInfo.realPrice }}</p>
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
				<span style="display: inline-flex;">
					<p style="margin-left: 20rpx;">你需要支付：</p>
					<p style="color: #ff0000; font-size: 34rpx;">{{'￥'+calendarInfo.realPrice}}</p>
				</span>
				<span class="buy-button" @click="buy">{{'提交订单'}}</span>
			</view>
			<view class="popup-container">
					<uni-popup style="width:100%" ref="popup" type="bottom" @change="change">
						<view style="background-color: #eaeaea;padding: 10px;width:100%;height: 600rpx;margin-top: -400rpx;">
							<view style="font-size: 35rpx;text-align: center;">{{'确认支付'}}</view>
							<view style="font-size: 32rpx;margin: 30rpx 20rpx 50rpx 10rpx;">{{'支付方式：微信支付'}}</view>
							<view style="font-size: 32rpx;margin: 30rpx 20rpx 50rpx 10rpx;display: inline-flex;">
								<p>{{'支付金额：￥'}}</p>
								<p>{{calendarInfo.realPrice}}</p>
							</view>
							<view style="display: inline-flex;">
								<view class="cancle-button" @click="cancleOrder">{{'取消'}}</view>
								<view class="submit-button" @click="submitOrder">{{'立即支付'}}</view>
							</view>
						</view>
					</uni-popup>	
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
			buy() {
				this.$refs.popup.open("bottom")
			},
			change(e) {
				console.log('是否打开：',e.show)
			},
			cancleOrder() {
				this.$refs.popup.close()
			},
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
			submitOrder(){
				uni.showLoading({
					title: "数据加载中"
				})
				let that = this
				let pid = uni.getStorageSync("projectId")
				this.loading = true
				this.$apis.postCreateConsulPrePayOrder({"expertId": this.expertId, "classId": this.calendarId}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						let preOrder = res.result
						if(preOrder && preOrder.prePayID) {
							if(preOrder.prePayID == "000") {
								uni.showToast({
								    title: "购买成功",
									icon: "success"
								})
								that.cancleOrder()
								that.loading = false;
							} else {
								uni.requestPayment({
								    timeStamp: preOrder.timeStamp,
								    nonceStr: preOrder.nonceStr,
								    package: preOrder.packageStr,
								    signType: 'MD5',
								    paySign: preOrder.paySign,
								    success: (res) => {
										if(res && res.errMsg == "requestPayment:ok") {
											//更新订单状态
											that.$apis.postUpdOrderStatus({"payId": preOrder.prePayID, "status": 2, "orderAmount": that.calendarInfo.realPrice}).then(res => {
												console.log(JSON.stringify(res))
											})
											uni.showToast({
											    title: "支付成功",
												icon: "success"
											})
										} else {
											uni.showToast({
											    title: "支付发起失败"
											})
										}
								    },
								    fail: (res) => {
								        uni.showModal({
								            content: "支付失败,原因为: " + res.errMsg,
								            showCancel: false,
								        })
								    },
								    complete: () => {
										that.cancleOrder()
								        that.loading = false;
										console.log('支付成功')
										this.appoint()
										uni.navigateTo({
											url: '/pages/order/appointExpertOrderDetail?payId=' + preOrder.prePayID + '&id='+this.calendarId
										})
								    }
								})
							}
						} else {
							that.loading = false;
							that.cancel()
							uni.showToast({
								title: res.msg
							})
						}
					} else {
						that.loading = false;
						that.cancel()
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					that.loading = false;
					that.cancel()
					uni.hideLoading()
					console.log(JSON.stringify(err))
				})
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
								this.requestSubscribeMessage(that.visitDate,that.beginTime,that.endTime,that.expertName,res.result.id,that.mobilePhone);
							} else {
								uni.showToast({
									title: res.msg
								})
							}
							this.$apis.postSendAppointSuccessMsg({'expertName':that.expertName,'expertPhone':that.mobilePhone}).then(res => {
								if (res.code == 200) {
									console.log('给专家发送短信提醒成功')
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
	.popup-container{
		position: absolute;
		z-index: 1000;
		width: 100%;
	}
	.submit-button{
		width: 300rpx;
		line-height: 80rpx;
		background: #628D3D;
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
		border-radius: 20rpx;
		color: #ffffff;
		margin-top: 150rpx;
		margin-left: 100rpx;
			
	}
	.cancle-button {
		width: 300rpx;
		line-height: 80rpx;
		background: #628D3D;
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
		border-radius: 20rpx;
		color: #ffffff;
		margin-top: 150rpx;
		margin-left: 10rpx;
	}
</style>