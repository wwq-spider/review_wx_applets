<template>
	<view style="width: 100%;">
        <view style="width: 100%;">
			<view class="question">
				<view>
					<view class="questionr">
						<view class="questionl">
							<image class="questionlimg" mode="scaleToFill" :src="calendarInfo.avatar || defaultCover" @error="imageError()"></image>
						</view>
						<view class="counsel-concent">
							<view class="counsel-title">
								<span class="counsel-name">{{calendarInfo.expertName}}</span>
							</view>
							<view class="counsel-charge">
								<u-row>
									<u-col>
										<span style="margin-right: 200rpx;">
											<p>{{calendarInfo.workingYears + '年'}}</p>
											<p class="counsel-us">{{'从业年期'}}</p>
										</span>
										<span>
											<p>{{'200+'}}<span class="counsel-unit">{{'人次'}}</span></p>
											<p class="counsel-us">{{'咨询人数'}}</p>
										</span>
									</u-col>
								</u-row>
								<u-row>
									<u-col>
									<view>
										<p style="font-size: 30rpx;color: #3b7600;">{{'$'+calendarInfo.realPrice + '/小时'}}</span></p>
										<p class="counsel-us">{{'咨询费用'}}</p>
									</view>
									<view style="margin-top: 40rpx;">
										<p>{{calendarInfo.serviceDuration+'+'}}<span class="counsel-unit">{{'小时'}}</span></p>
										<p class="counsel-us">{{'服务时长'}}</p>
									</view>
									</u-col>
								</u-row>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="counsel-bar"></view>
			<view class="counsel-detail">
				<!-- <view style="font-size: 30rpx;color: #000000;display: block;text-align: center;">
					<u-tabs activeColor="#628D3D" :list="tabList" :current="current" @click="changeTab" @change="changeTab"></u-tabs>
				</view> -->
				<!-- 介绍 -->
				<!-- <view v-if="current=='0'" class="counsel-detail-content"> -->
				<view class="counsel-detail-content">
					<p>{{calendarInfo.introduction}}</p>
					<p style="font-weight: 700;margin: 10rpx 0;">{{'擅长领域：'}}</p>
					<p v-if="expertFieldGroup == ''">{{'无'}}</p>
					<p v-if="expertFieldGroup != ''">{{expertFieldGroup+'等'}}</p>
				</view>
				<!-- 预约时间 -->
				<!-- <view v-if="current=='1'" class="counsel-detail-content"> -->
				<view class="counsel-detail-content">
					<view class="reservation-btn">
						<span>
							<image class="img-size" :src="isReservationFlag?'../../static/Ellipse 9.png':'../../static/Ellipse 10.png'"></image>
							<!-- <span @click="reservationClick">{{'可预约'}}</span> -->
							<span>{{'可预约'}}</span>
						</span>
						<span>
							<image class="img-size" :src="isNoReservationFlag?'../../static/Ellipse 9.png':'../../static/Ellipse 10.png'"></image>
							<!-- <span @click="noReservableClick">{{'不可预约'}}</span> -->
							<span>{{'不可预约'}}</span>
						</span>
					</view>
					<view style="width: 100%;display: block;float: inline-start;" v-for="(item, index1) in calendarListInfo" :key="index1">
						<view>{{item.visitDateNew}}</view>
						<view style="width: 100%; height: 220rpx; border-bottom: 1rpx solid #DDDDDD;">
							<view v-for="(v, index2) in item.visitDateList" :key="index2">
								<span @click='orderExpert(v.isChooseFlag,v.calendarId,v.visitDate,v.beginTime,v.endTime,calendarInfo.expertName,calendarInfo.mobilePhone)' class="reservation" :class="[v.isChooseFlag?'bgColorGreen':'bgColorGray']">{{v.time}}</span>
							</view>
						</view>
					</view>
				</view>
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
				expertFieldGroup:{},//咨询师擅长领域
				isReservationFlag: true,
				isNoReservationFlag: false,
				calendarListInfo:[],
				tabList:[
					{
						name: '介绍',
					}, {
						name: '预约时间',
					}
				],
				//current:0,
				expertId:"",
				defaultCover: '../../static/default_cover.jpeg',
			}
		},
		onShow() {
			console.log('onShow方法执行了')
			this.calendarListInfo.splice(0,this.calendarListInfo.length)
			this.$apis.postListCalendarInfo({'expertId': this.id}).then(res => {
				uni.hideLoading()
				if (res.code == 200) {
					res.result.forEach((row) => {
						this.calendarListInfo.push(row)
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
		/* mounted() {
			this.loadData();
		}, */
		onLoad(event) {
			if(event.id){
				this.id = event.id
				this.expertId = event.id
			}
			this.loadData();
		},
		computed:{
		},
		methods: {
			loadData() {
				let that = this
				if(!this.id || this.id == "") {
					uni.showToast({
						title: "专家信息为空！"
					})
					return
				}
				uni.showLoading({
					title: "数据加载中"
				})
				//查询咨询师详情
				this.$apis.postCalendarDetail({'id': this.id}).then(res => {
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
				//查询咨询师擅长领域
				this.$apis.postExpertFieldGroup({'id': this.id}).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						that.expertFieldGroup = res.result
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
				//查询咨询师日历
				/* this.$apis.postListCalendarInfo({'expertId': this.id}).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						res.result.forEach((row) => {
							that.calendarListInfo.push(row)
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				}) */
			},
			//预约咨询师
			orderExpert(isChooseFlag,calendarId,visitDate,beginTime,endTime,expertName,mobilePhone){
				if(isChooseFlag){
					let that = this
					let userData = uni.getStorageSync('userData')
					uni.navigateTo({
						url:'/pages/expert/appointExpertDetail?expertName=' + encodeURIComponent(expertName)
						+ '&visitDate=' + encodeURIComponent(visitDate)
						+ '&beginTime=' + encodeURIComponent(beginTime)
						+ '&endTime=' + encodeURIComponent(endTime)
						+ '&calendarId=' + encodeURIComponent(calendarId)
						+ '&expertId=' + this.expertId
						+ '&mobilePhone=' + encodeURIComponent(mobilePhone)
					})
				}	
			},
			toConsultationDetail(id){
				//跳转到预约详情页面
				uni.navigateTo({
					url: '/pages/expert/consultationDetail?id='+ id
				})
			},
			//消息推送
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
			// 可预约
			/* reservationClick(){
				this.isReservationFlag = true;
				this.isNoReservationFlag = false;
			}, */
			// 不可预约
			/* noReservableClick(){
				this.isReservationFlag = false;
				this.isNoReservationFlag = true;
			}, */
			/* changeTab(index) {
			    this.current = index;
			}, */
			imageError() {
				this.calendarInfo.avatar = this.defaultCover 
			},
		}
	}
</script>

<style>
	.img-size{
		width: 10rpx;
		height: 10rpx;
		padding: 0 10rpx 7rpx 13rpx;
		margin: 0 10rpx;
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
		width: 90%;
	}
	.questionl {
		width: 30%;
		padding-right: 27px;
	}
	.questionl .questionlimg {
		width: 250rpx;
		height: 250rpx;
	}
	.counsel-concent{
		width: 55%;
		color: #333333;
		font-size: 28rpx;
	}
	.counsel-charge{
		color: #416F5D;
		overflow: scroll;
		line-height: 1.4;
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
	}
	.counsel-detail-content{
		font-size: 30rpx;
		width: 85%;
		min-height: 400rpx;
		background: rgba(215,233,230, 0.4);
		border: 1rpx solid rgba(106,150,31,0.42);
		margin: 20rpx auto;
		padding: 23rpx 23px 120px 23px;
		color: #555555;
		overflow: scroll;
		line-height: 42rpx;
	}
	.reservation {
		width: 140rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 20rpx;
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
</style>