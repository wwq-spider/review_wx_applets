<template>
	<view>
		<!-- 生涯规划 -->
        <view style="width: 100%;">
			<view style="width: 100%;">
				<view class="imageStyle">
					<image @click="toPsychometrics" mode="widthFix" src="/static/recomm2.jpg"></image>
				</view>
				<view style="margin: 0 35rpx;font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;">
					<view class="title" style="color: #416F5D; font-size: 36rpx;margin-bottom: 20rpx;">{{"2023职业生涯规划"}}</view>
				</view>
			</view>

			<view class="counsel-bar"></view>
			<view class="counsel-detail" style="padding-bottom:120rpx">
				<view style="font-size: 28rpx;color: #000000;display: block;text-align: center;">
					<u-tabs activeColor="#628D3D" :list="tabList" :current="current" @click="changeTab" @change="changeTab"></u-tabs>
				</view>
				<!-- 详情 -->
				<view v-if="current=='0'" class="counsel-detail-content">
					<view class="question-evaluation"  @click='beginTest(1)'>进入职业规划版测评</view>
				</view>
				<!-- 预约时间 -->
				<view v-if="current=='1'" class="counsel-detail-content">
					<view class="question-evaluation"  @click='beginTest(2)'>进入学生版测评</view>
					<!-- <view class="reservation-btn">
						<span>
							<image class="img-size" :src="isReservationFlag?'../../static/Ellipse 9.png':'../../static/Ellipse 10.png'"></image>
							<span @click="reservationClick">{{'可预约'}}</span>
						</span>
						<span>
							<image class="img-size" :src="isNoReservationFlag?'../../static/Ellipse 9.png':'../../static/Ellipse 10.png'"></image>
							<span @click="noReservableClick">{{'不可预约'}}</span>
						</span>
					</view> -->
					<!-- <view style="width: 100%;display: block;float: inline-start;" v-for="(item, index) in timeRadios" :key="index">
						<view>{{item.date}}</view>
						<view style="width: 100%; height: 400rpx; border-bottom: 1rpx solid #DDDDDD;">
							<view v-for="(v, index) in item.dataTime">
								<span class="reservation" :class="[v.isChooseFlag?'bgColorGreen':'bgColorGray']">{{v.time}}</span>
							</view>
						</view>
					</view> -->
					
				</view>
				<view style="background: #ffffff;min-height: 600rpx;">
					<view style="font-size: 24rpx;width: 85%;min-height: 300rpx;background: rgba(215,233,230, 0.4);border: 1rpx solid rgba(106,150,31,0.42);margin: 20rpx auto;padding: 20rpx;color: #555555;">
						<p>{{'生涯规划是一种专业的心理辅导方式，它是指一名经过专业培训的心理督导师，通过与另一名心理工作者的合作学习和讨论，帮助他们提高自身的心理辅导技能和水平。心理督导可以帮助心理工作者提高对心理辅导的认识和理解，加深对受助者心理问题的把握和解决方案的设计能力，同时也可以加强心理工作者的自我认识和自我成长。心理督导通常通过个别或小组形式进行，旨在为心理工作者提供一个安全、私密、专业的交流平台，帮助他们在工作中更好地发挥自己的潜力和能力。 当一名心理咨询师在进行心理辅导工作时，可能会面临一些难以解决的问题，例如无法掌握受助者的情感，无法理解受助者的内心体验等。'}}</p>
					</view>
				</view>
			</view>
			
		</view>
		<!-- <view>
			<view class="tabbar-bottom">
				<span class="buy-button">
					<image src="../../static/icons8-ringer-volume-30 1.png"></image>
					<span>{{'立即预约'}}</span>
				</span>
			</view>
		</view> -->
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				isReservationFlag: true,
				isNoReservationFlag: false,
				tabList:[
					{
						name: '职业规划版',
					}, {
						name: '学生版',
					}
				],
				current:0,
				timeRadios:[{
					date:'4月1日(周六)',
					dataTime:[
						{
							time:'8:00-9:00',
							isChooseFlag:false
						},
						{
							time:'8:00-9:00',
							isChooseFlag:false
							
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:false
						},
						{
							time:'8:00-9:00',
							isChooseFlag:false
							
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						}
					]
				},
				{
					date:'4月1日(周六)',
					dataTime:[
						{
							time:'8:00-9:00',
							isChooseFlag:false
						},
						{
							time:'8:00-9:00',
							isChooseFlag:false
							
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:false
						},
						{
							time:'8:00-9:00',
							isChooseFlag:false
							
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						},
						{
							time:'8:00-9:00',
							isChooseFlag:true
						}
					]
				}
				]
			}
		},
		computed:{
		},
		methods: {
			// 可预约
			reservationClick(){
				this.isReservationFlag = true;
				this.isNoReservationFlag = false;
			},
			// 不可预约
			noReservableClick(){
				this.isReservationFlag = false;
				this.isNoReservationFlag = true;
			},
			changeTab(index) {
			    this.current = index;
			},
			beginTest(classid){
				let dongliangClassId = '402880f082eecb960182eee3b1ef0001';
				let dongliangClassProId = '2c9cff928408eab3018413a00d8a006a';
				//跳转到当前量表
				if(classid == 1){
					uni.navigateTo({
						url: '/pages/review/detailNew?classId=' + dongliangClassProId
					})
				}else {
					uni.navigateTo({
						url: '/pages/review/detailNew?classId=' + dongliangClassId
					})
				}
			},
		}
	}
</script>

<style>
	.img-size{
		width: 10rpx;
		height: 10rpx;
		margin-left: 30rpx;
	}
	.reservation-btn{
		width: 100%;
		height: 40rpx;
		display: flex;
		justify-content: flex-end;
		border-bottom: 1rpx solid #DDDDDD;
		margin-bottom: 20rpx;
	}
	.imageStyle {
		border-radius: 16px;
		flex-direction: column;
		width: 90%;
		/* margin: 0 auto; */
		margin: 20rpx auto;
		display: flex;
	}
	.imageStyle image{
		width: 100%;
		display: block;
		margin: auto;
		border-radius: 30rpx;
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
		width: 600rpx;
		line-height: 80rpx;
		background: #628D3D;
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
		border-radius: 20rpx;
		color: #ffffff;
		float:right
	}
	.buy-button image{
		width: 48rpx;
		height: 48rpx;
		margin-right: 20rpx;
		vertical-align: middle
	}
	.question {
		width: 100%;
		background: #fff;
		padding: 20rpx;
		/* box-shadow: 0 0 28rpx 0 rgb(155 153 146 / 18%); */
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
		height: 233rpx;
	}
	.counsel-concent{
		width: 60%;
		color: #333333;
		font-size: 28rpx;
	}
	.counsel-charge{
		color: #416F5D;
		overflow: scroll;
		line-height: 1.6;
		display: flex;
	}
	.counsel-unit{
		font-size: 20rpx;
	}
	.counsel-title{
		font-size: 34rpx;
		margin-bottom: 20rpx;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		padding-left: 10rpx;
	}
	.counsel-intro{
		float: left;
		font-size:20rpx;
		height: 110rpx;
		overflow: scroll;
		line-height: 1.6;
	}
	.counsel-us{
		color:#979797; 
		font-size: 24rpx;
	}
	.counsel-bar{
		width: 100%; 
		height: 20rpx;
		margin: 20rpx 0;
		background-color: rgba(237,237,237,0.4);
	}
	.counsel-Detail{
		background: #ffffff;
		min-height: 1000rpx;
		padding-bottom: 100rpx;
	}
	.counsel-detail-content{
		font-size: 24rpx;
		width: 85%;
		min-height:100rpx;
		background: rgba(215,233,230, 0.4);
		border: 1rpx solid rgba(106,150,31,0.42);
		margin: 20rpx auto;
		padding: 20rpx;
		color: #555555;
		overflow: scroll;
	}
	.reservation {
		width: 140rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: 700;
		margin: 10rpx;
		border-radius: 30rpx;
		float:left;
		
	}
	.bgColorGreen{
		background: #628D3D;
		color: #ffffff;
	}
	.bgColorGray{
		background: #D9D9D9;
		color: #000000;
	}
	.question-evaluation{
		width: 360rpx;
		line-height: 60rpx;
		background: #628D3D;
		text-align: center;
		font-size: 24rpx;
		font-weight: 700;
		border-radius: 30rpx;
		color: #ffffff;
		margin-top: 15rpx;
		margin-left: 150rpx;
	}
</style>