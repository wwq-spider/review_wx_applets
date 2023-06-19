<template>
	<view class="bg-color">
		<view class="uLine-progress">
			<view style="width:88%;display: inline-block;float: left;">
				<u-line-progress :percent="percent" inactiveColor="#92B473" activeColor="#628D3D" :show-percent="false" height="22"></u-line-progress>
			</view>
			<view style="float: right;color: #628D3D;font-size: 28rpx;float: left;margin-top: 10rpx;margin-left: 10rpx;">{{'9/20'}}</view>
		</view>
		<view style="background-color: #ffffff; border-radius: 20rpx; width: 80%; height: 800rpx;margin: 0 auto;">
			<view style="width: 95%;padding: 30rpx 0;margin: 0 auto;" v-for="(item, index1) in optionList"
				:key="index1">
			<view class="title">{{item.title}}</view>
			<view :class="{'active':index2 == num}" class="topic-btn" v-for="(v,index2) in item.topic" :key="index2" @click="topicClick(index2)">{{v.name}}</view>
			</view>
		</view>
		<view>
			<view class="tabbar-bottom">
				<span v-if="percent>0" class="buy-button">
					<span>{{'上一题'}}</span>
				</span>
				<span v-if="percent!=100" class="buy-button">
					<span>{{'下一题'}}</span>
				</span>
				<span v-if="percent==100" class="buy-button">
					<span>{{'提交'}}</span>
				</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				percent:30,
				num:"",
				radiovalue:"",
				optionList:[{
					title:'1.做事时提不起劲或没有兴趣',
					topic:[
						{
							name:'A.完全不会'
						},
						{
							name:'B.好几天'
						},
						{
							name:'A.一半以上的天数'
						},
						{
							name:'A.几乎每天'
						}
					]
				}
				]
			}
		},
		methods: {
			topicClick(index){
				console.log(index,'index')
				this.num = index
			}
		}
	}
</script>

<style>
	.active{
		background-color: #92B473;
	}
	.title{
		margin: 40rpx 0;
		font-size: 34rpx;
	}
	.topic-btn{
		width: 95%; 
		height: 100rpx;
		border: 1rpx solid rgba(212,184,132,0.3);
		margin-bottom: 20rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		padding-left: 20rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
	}
	.bg-color{
        background-color: rgba(215,233,230,0.4);
		width: 100%;
		height: 100%;
		min-height: 1200rpx;
	}
	.uLine-progress{
		width: 80%;
		margin: 0 auto;
		height: 80rpx;
		padding-top: 20rpx;
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
		width: 300rpx;
		line-height: 80rpx;
		background: #628D3D;
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
		border-radius: 20rpx;
		color: #ffffff;
		float:right
	}
</style>
