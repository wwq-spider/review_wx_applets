<template>
	<view>
		<view class="reviewTop">
			<view class="reviewDetail">
				<view class="reviewImg">
					<image class="classImg" mode="scaleToFill" :src="reviewClass.bannerImg"></image>
				</view>
				<view style="width: 60%;margin-top: 15rpx;">
					<view class="title">{{reviewClass.title}}</view>
					<view class="classPrice">
					    <text>{{'￥'+ orderInfo.orderAmount }}</text>
					</view>
					<view class="classNum"><p style="color: #ff0000;">*1</p></view>
				</view>
			</view>
		</view>
		<view class="lineStyle"></view>
		<view>
			<view style="display: inline-flex;">
				<p style="margin: 0 0 30rpx 30rpx;">商品合计</p>
				<p style="margin: 0 20rpx 10rpx 450rpx;color: #000000;">{{'￥'+ reviewClass.realPrice }}</p>
			</view>
			<view style="display: inline-flex;">
				<p style="margin: 0 0 30rpx 30rpx;">实付款</p>
				<p style="margin: 0 20rpx 10rpx 480rpx;color: #000000;">{{'￥'+ orderInfo.orderAmount }}</p>
			</view>
			<view style="display: inline-flex;">
				<p style="margin: 0 0 30rpx 30rpx;">付款方式</p>
				<p style="margin: 0 20rpx 10rpx 450rpx; color: #000000;">{{'微信支付'}}</p>
			</view>
			<view style="display: inline-flex;">
				<p style="margin: 0 0 30rpx 30rpx;">有效期</p>
				<p style="margin: 0 20rpx 10rpx 480rpx; color: #000000;">{{'一年'}}</p>
			</view>
		</view>
		
		<view class="lineStyle"></view>
		<view>
			<view style="display: inline-flex;">
				<p style="margin: 0 0 30rpx 30rpx;">订单编号:</p>
				<p>{{orderInfo.orderNo}}</p>
			</view>
			<view style="display: inline-flex;">
				<p style="margin: 0 0 30rpx 30rpx;">支付时间:</p>
				<p>{{orderInfo.payTime}}</p>
			</view>
		</view>
		<view class="lineStyle"></view>
		<view class="buy-button" @click="beginTest">立即测评</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: {},
				show: false,
				showPopup:false,
				payId:'',
				calssId:'',
				reviewClass: {},
			}
		},
		onLoad(event) {
			if(event){
				this.payId = event.payId
				this.calssId = event.calssId
			}
			this.loadData()
		},
		methods: {
			loadData(){
				let that = this
				if(!this.payId || this.payId == "") {
					uni.showToast({
						title: "订单ID为空"
					})
					return
				}
				if(!this.calssId || this.calssId == "") {
					uni.showToast({
						title: "量表ID为空"
					})
					return
				}
				uni.showLoading({
					title: "数据加载中"
				})
				this.$apis.postReviewOrderDetail({"payId": this.payId}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						that.orderInfo = res.result
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
				this.$apis.postReviewClassDetail({'classId': this.calssId}).then(res => {
					if(res.code == 200) {
						that.reviewClass = res.result
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				
				}).catch(err => {
					console.log(err)
				})
			},
			beginTest() {
				if (!this.reviewClass) {
					uni.showToast({
					    title: "量表信息为空"
					})
				}
				//如果是栋梁测试，先跳转测评码输入页面
				let dongliangClassId = '402880f082eecb960182eee3b1ef0001';
				let dongliangClassProId = '2c9cff928408eab3018413a00d8a006a';
				if(this.reviewClass.classId == dongliangClassId || this.reviewClass.classId == dongliangClassProId){
					//跳转到测评码输入页面
					uni.navigateTo({
						url: '/pages/review/testCode?classId=' + this.reviewClass.classId
					})
				}else{
					//跳转到当前量表
					uni.navigateTo({
						url: '/pages/report/guide?classId=' + this.reviewClass.classId
					})
				}
			},
		},
	}
</script>

<style scoped="scoped" lang="scss">
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
	.popup-container{
		position: absolute;
		z-index: 1000;
		width: 100%;
	}
	.reviewTop {
		margin: 20rpx auto;
	}
	.reviewDetail {
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	.reviewImg {
		width: 35%;
	}
	.reviewImg .classImg {
		width: 233rpx;
		height: 233rpx;
		border-radius: 50rpx;
	}
	.classPrice {
		font-size: 30rpx;
		margin: 70rpx 10rpx 0 0;
		float:left;
		color: #ff0000;
	}
	.classNum{
		text-align: center;
		font-size: 30rpx;
		margin: 70rpx 40rpx 0 0;
		float:right;
		display: inline-flex;
	}
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
	.buy-button {
		width: 500rpx;
		line-height: 80rpx;
		color: #000000;
		font-size: 32rpx;
		margin: 40rpx auto;
		text-align: center;
		background-color: #628D3D;
		margin-bottom: 10rpx;
		border-radius: 30rpx;
	}
	.lineStyle {
		width: 100%; 
		height: 15rpx;
		margin: 20rpx 0;
		background-color: rgba(237,237,237,0.4);
	}
</style>
