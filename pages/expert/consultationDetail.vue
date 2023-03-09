<template>
	<view class="consultationD" :class="{active: bodyShow}">
		<view class="consultationD-headicon">
			<view style="width: 550rpx;margin-left: 50rpx;margin-top: 20rpx;">
				<text class="title">{{consultationDetail.expertName}}</text>
				<text class="subtitle">{{consultationDetail.expertJobTitle}}|{{consultationDetail.expertLable}}</text>
			</view>
			<!-- <view class="consultationD-headicon1" style="margin-top: 20rpx;margin-left: 300rpx;">
				<image class="consultationD-headicon1img" :src="calendarInfo.avatar || defaultCover" @error="imageError()" mode="aspectFit"></image>
			</view> -->
			
			<view class="expert-headicon1" style="margin-top: 20rpx;">
				<image class="expert-headicon1img" :src="consultationDetail.avatar || defaultCover" @error="imageError()" mode="aspectFit"></image>
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
				<text class="subtitle">预约时段: {{consultationDetail.visitDate}}({{consultationDetail.weekDayName}})  {{consultationDetail.beginTime}} - {{consultationDetail.endTime}}</text>
			</view>
		</view>
		<view class="consultationD-headicon" v-if="consultationDetail.status == '1' && consultationDetail.buy!=true">
			<view  class="canclebutton" style="margin-left: 310rpx;"  @click='cancelReservation()'>取消预约</view>
		</view>
		
		<!-- <view v-if="consultationDetail.buy==true && videoConsult == 'Y' && isConfirmByExpert == 'Y'">
			<button class="testbutton" @click="videoTest()">发起视频咨询</button>
		</view>
		<view v-else>
			<button class="testbutton" @click="videoTest()" disabled="true">发起视频咨询</button>
		</view> -->
		
		<view class="consultationD-headicon">
			<button class="paybutton" style="margin-left: 280rpx;"  @click="buy" :disabled="consultationDetail.buy" v-if="consultationDetail.charge==1">{{buyBtnText}}</button>

		</view>
		<uni-popup ref="showPayConfirm" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">确认支付</text>
				<view>
					<text class="uni-tip-content iconfont" style="color: #dc7a54;">咨询费用：&#xe606;{{consultationDetail.orgPrice}}</text>
					<text class="uni-tip-content iconfont" style="padding-left: 5px; color: #857f77;font-size: 12px;text-decoration:line-through;">优惠金额：&#xe606;{{consultationDetail.dicountPrice}}</text>
				</view>
				<text class="uni-tip-content iconfont" style="color: #dc7a54;">实际应付：&#xe606;{{consultationDetail.realPrice}}</text>
				<view class="uni-tip-group-button">
					<button class="uni-tip-button" style="margin-right: 30px; background-color: #b7b5b2;" @click="cancel()">取消</button>
					<button class="uni-tip-button" @click="confirmBuy()" :loading="loading">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import htmlParser from '@/common/html-parser'
	import config from '@/config/index.config.js';
	export default {
		data() {
			return {
				bodyShow: true, // 页面显示
				consultationDetail : {}, //预约详情
				parentOpenid: '',
				openid: '',
				localtionPlatform: '',
				defaultCover: '../../static/man.png',
				buyBtnText: "立即支付",
				videoConsult:'',
				isConfirmByExpert:''
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
						that.videoConsult = res.videoConsult;
						that.isConfirmByExpert = res.isConfirmByExpert;
						res.result.forEach((row) => {
							row.avatar = that.$config.aliYunEndpoint + row.avatar
							that.consultationDetail = row
							that.buyBtnText = "立即支付"
							/* if(res.videoConsult == 'Y'){
								consultationDetail.buy = true;
							} */
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
			},
			buy() {
				this.$nextTick(() => {
					this.$refs.showPayConfirm.open("center")
				})
			},
			confirmBuy() {
				uni.showLoading({
					title: "数据加载中"
				})
				let that = this
				this.loading = true
				this.$apis.postCreateConsulPrePayOrder({"classId": this.consultationDetail.id,"expertId":this.consultationDetail.expertId}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						let preOrder = res.data
						if(preOrder && preOrder.prePayID) {
							if(preOrder.prePayID == "000") {
								that.buyBtnText = "已购买"
								that.consultationDetail.buy = true
								uni.showToast({
								    title: "购买成功",
									icon: "success"
								})
								that.cancel()
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
											that.buyBtnText = "已购买"
											that.consultationDetail.buy = true
											//更新订单状态
											that.$apis.postUpdOrderStatus({"payId": preOrder.prePayID, "status": 2, "orderAmount": "100"}).then(res => {
												console.log(JSON.stringify(res))
											})
											uni.showToast({
											    title: "支付成功",
												icon: "success"
											})
											/* that.appointTXMeeting(this.consultationDetail.expertName,this.consultationDetail.visitDate,this.consultationDetail.beginTime,this.consultationDetail.endTime) */
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
										that.cancel()
								        that.loading = false;
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
			cancel() {
				this.$refs.showPayConfirm.close()
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			/* appointTXMeeting(expertName,visitDate,startTime,endTime){
				console.log('预约腾讯会议:'+startTime)
				
				this.$apis.postCreateTXMeeting({"startTime":startTime,"endTime":endTime,"expertName":expertName,"visitDate":visitDate}).then(res => {
					console.log('预约腾讯会议成功')
				}).catch(err => {
					console.log('预约腾讯会议失败')
				})
				
			}, */
			videoTest() {
				let roomID = parseInt(Math.random() * 9999);
				console.log('预约时生成的随机房间号：'+roomID);
				let that = this
				//给专家发送房间号
				this.$apis.postSendRoomId({'roomId': roomID,'expertPhone':this.consultationDetail.expertPhone,'expertName':this.consultationDetail.expertName}).then(res => {
					if (res.code == 200) {
						console.log('给专家发送房间号成功')
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
				let userData = uni.getStorageSync('userData')
				uni.navigateTo({
					/* url: '/pages/room/room?userID=oGvzT5cBpAiP48NzKwX7HeqlbI2Q&template=grid&roomID='+roomID+'&debugMode=false&cloudenv=PRO' */
					url: '/pages/room/room?userID=' + userData.userId + '&template=grid&roomID=' + roomID + '&debugMode=false&cloudenv=PRO'
				})
			},
			imageError() {
				this.calendarInfo.avatar = this.defaultCover 
			}
		}
	};
</script>

<style scoped>
	page {
		background-color: #f1f1f1;
	}
</style>
<style lang="scss" scoped>
	.expert-headicon1 {
		border-radius: 50%;
		width: 140rpx;
		height: 140rpx;
	}
	.expert-headicon1 .expert-headicon1img{
		width: 110rpx;
		height: 150rpx;
	}
	.consultationD {
		display: none;
		&.active {
			display: block;
		}
		height: 100%;
		overflow-y: hidden;
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
	.paybutton {
		width: 35%;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: 700;
		text-align: center;
		background-color: #77beff;
		border-radius: 6px !important;
		position: fixed;
		bottom:0;
		//margin-top: 20%;
	}
	/* 提示窗口 */
	.uni-tip {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 15px;
		width: 140%;
		background-color: #e6e3e3;
		border-radius: 10px;
		buttom: 100px;
		left: 50%;
		top: 80%;
	}
	.popup-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px;
		width: 300px;
		background-color: #fff;
	}
	
	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}
	
	.uni-tip-content {
		font-size: 14px;
		color: #353434;
	}
	
	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}
	
	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background-color: #e6a23c;;
	}
	._scroll-list {
		border-bottom: 20rpx solid #eee;
		width: 100%;
	}
	.testbutton {
		width: 230rpx;
		line-height: 60rpx;
		background: #77beff;
		text-align: center;
		font-size: 26rpx;
		color: black;
		margin-top: 10%;
	}
</style>
