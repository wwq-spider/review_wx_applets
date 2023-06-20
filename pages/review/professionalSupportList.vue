<template>
	<view>
		<view class="imageStyle">
			<view>
				<image @click="toProfessionalSupport" mode="scaleToFill" class="psychometrics" src="/static/professionalSupport1.png"></image>
				<view class="title" style="color: #416F5D; font-size: 36rpx;margin-bottom: 20rpx;">{{"如何快速掌握受助者的情感，理解受助者.."}}</view>
			</view>
			<view>
				<image @click="toPsychometrics" mode="scaleToFill" class="psychometrics" src="/static/professionalSupport2.png"></image>
				<view class="title" style="color: #416F5D; font-size: 36rpx;margin-bottom: 20rpx;">{{"制定治疗方案：根据患者的症状和情况，制定.."}}</view>
			</view>
			<view>
				<image @click="toPsychometrics" mode="scaleToFill" class="psychometrics" src="/static/professionalSupport3.png"></image>
				<view class="title" style="color: #416F5D; font-size: 36rpx;margin-bottom: 20rpx;">{{"提供咨询服务：提供咨询服务解决心理治疗中.."}}</view>
			</view>
			<view>
				<image @click="toPsychometrics" mode="scaleToFill" class="psychometrics" src="/static/professionalSupport4.png"></image>
				<view class="title" style="color: #416F5D; font-size: 36rpx;margin-bottom: 20rpx;">{{"如何快速掌握受助者的情感，理解受助者的内心.."}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toProfessionalSupport(){
				uni.navigateTo({
					url: '/pages/review/professionalSupportDetail'
				})
			}
		}
	}
</script>

<style>
	.imageStyle {
		margin-top: 7%;
		/* border-radius: 8px; */
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.psychometrics {
		width: 660rpx;
		height: 330rpx;
		/* border-radius: 25rpx; */
		margin: 0 auto;
	}
</style>
