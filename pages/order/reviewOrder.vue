<template>
	<view style="width: 100%;">
		<view class="reviewTop">
			<view class="reviewDetail">
				<view class="reviewImg">
					<image class="classImg" mode="scaleToFill" :src="reviewInfo.bannerImg"></image>
				</view>
				<view style="width: 60%;margin-top: 15rpx;">
					<view class="title">{{reviewInfo.title}}</view>
					<view class="classPrice">
					    <text>{{'￥'+ reviewInfo.realPrice }}</text>
					</view>
					<view class="classNum">商品数量：<p style="color: #ff0000;">1</p></view>
				</view>
			</view>
		</view>
		<view class="lineStyle"></view>
		<view style="display: inline-flex;">
			<p style="margin: 0 0 0 30rpx;">商品总额</p>
			<p style="margin: 0 30rpx 0 450rpx; color: #ff0000;">{{'￥'+ reviewInfo.realPrice }}</p>
		</view>
		<view class="lineStyle"></view>
		<view style="background: #ffffff;min-height: 700rpx;">
			<view style="font-size: 28rpx;color: #000000;display: block;text-align: center;">{{'购买须知'}}</view>
			<view style="font-size: 24rpx;width: 85%;min-height: 400rpx;background: rgba(215,233,230, 0.4);border: 1rpx solid rgba(106,150,31,0.42);margin: 20rpx auto;padding: 20rpx;color: #555555;">
				<p>{{'如果您要参加一次测评，请注意以下事项：'}}</p>
				<p>{{'1.确认测评目的和内容：了解测评的目的和内容，确认自己是否符合参测条件，并了解测评结果的应用和影响。'}}</p>
				<p>{{'2.提前准备：确保充分休息、饮食充足，避免在测评前进行身体或心理上的剧烈运动、刺激性活动或大量饮酒等不利于测评结果的行为。'}}</p>
				<p>{{'3.遵从测评人员指导：测评可以涉及不同的测评人员和不同的测试项目。请遵守测评人员的指导，如按时到场、佩戴适当的耳机、眼镜和其他设备等。'}}</p>
				<p>{{'4.保持放松和专注：测评可能会涉及较长时间的测试项目，请保持良好的心态和情绪，避免紧张和焦虑，并集中注意力完成测试项目。'}}</p>
				<p>{{'5.不要作弊或伪装：测评结果对于评估和治疗等领域的决策有重要的影响，请不要伪装或作弊。评估结果只有真实、准确才有参考价值。'}}</p>
			</view>
		</view>
		<view>
			<view class="tabbar-bottom">
				<span style="display: inline-flex;">
					<p style="margin-left: 20rpx;">你需要支付：</p>
					<p style="color: #ff0000; font-size: 34rpx;">{{'￥'+reviewInfo.realPrice}}</p>
				</span>
				<span class="buy-button" @click="buy">{{'提交订单'}}</span>
				<uni-popup ref="popup" style="position: absolute;" :animation="false" :type="bottom" :maskClick="true" @change="change">
					<view style="background-color: #b7ffb3;padding: 10px;">
						popup 内容，此示例没有动画效果
					</view>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reviewInfo: {},
				show: false,
			}
		},
		onLoad(event) {
			var data = uni.getStorageSync('reviewClass')
			this.reviewInfo = data
			uni.removeStorageSync('reviewClass')
		},
		methods: {
			buy() {
				this.$refs.popup.open("bottom")
			},
			change(e) {
				console.log('是否打开：',e)
			}
		},
	}
</script>

<style scoped="scoped" lang="scss">
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
		margin: 70rpx 10rpx 0 0;
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
	.lineStyle {
		width: 100%; 
		height: 15rpx;
		margin: 20rpx 0;
		background-color: rgba(237,237,237,0.4);
	}
</style>
