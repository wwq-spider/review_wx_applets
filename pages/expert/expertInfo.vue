<template>
	<view class="expert" :class="{active: bodyShow}">
		<view class="expert-headicon">
			<view style="width: 100%;margin-left: 50rpx;margin-top: 20rpx;">
				<text class="title">{{calendarInfo.expertName}}</text>
				<text class="subtitle">{{calendarInfo.jobTitle}}|{{calendarInfo.label}}</text>
			</view>
			<view class="expert-headicon1" style="margin-top: 20rpx;margin-left: 300rpx;">
				<image class="expert-headicon1img" :src="calendarInfo.avatar || defaultCover" @error="imageError()" mode="aspectFit"></image>
			</view>
		</view>
		<view class="expert-headicon">
			<view style="width: 100%;margin-left: 50rpx;margin-top: 20rpx;">
				<text class="title1">个人简介</text>
				<text class="subtitle">{{calendarInfo.introduction}}</text>
			</view>
		</view>
		<view class="expert-headicon1">
			<view class="expert-headicon2" style="width: 100%;margin-left: 50rpx;margin-top: 20rpx;">
					<text class="title1"  style="margin-top: 10rpx;">排班信息</text>
					<!-- <picker mode="date" @change="bindDateChange" class="dateCheck" style="margin-left: 390rpx;margin-top: 10rpx;">
						<view>
							日期选择框{{date}}
						</view>
					</picker> -->
			</view>
		</view>
		<view class="expert-headicon1" style="margin-left: 45rpx;">
			<view class="expert-headicon2" v-for="(calendarList, index) in calendarListInfo" :key="index">
				<text style="margin-top: 15rpx;" class="title1">{{calendarList.visitDate}}({{calendarList.weekDayName}})  {{calendarList.beginTime}}-{{calendarList.endTime}}
				</text>
				<button class="testbutton" @click='orderExpert(calendarList.id,calendarList.visitDate,calendarList.beginTime,calendarList.endTime,calendarInfo.expertName,calendarInfo.mobilePhone)'>预约</button>
			</view>
		</view>
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	import config from '@/config/index.config.js';
	export default {
		data() {
			return {
				bodyShow: true, // 页面显示
				calendarInfo: {}, // 专家信息
				calendarListInfo: {}, //专家日历信息
				parentOpenid: '',
				openid: '',
				localtionPlatform: '',
				defaultCover: '../../static/man.png',
				exitCalenAvatar : ''
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
				if(!this.id || this.id == "") {
					uni.showToast({
						title: "专家信息为空！"
					})
					return
				}
				uni.showLoading({
					title: "数据加载中"
				})
				//查询专家详情
				this.$apis.postCalendarDetail({'id': this.id}).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						console.log("获取专家详情成功");
						that.calendarInfo = res.result
						that.calendarInfo.avatar = that.$config.aliYunEndpoint + res.result.avatar				  
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
				//查询专家日历
				this.$apis.postListCalendarInfo({'expertId': this.id}).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						console.log("获取专家日历成功");
						that.calendarListInfo = res.rows
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
			//预约专家
			orderExpert(calendarId,visitDate,beginTime,endTime,expertName,mobilePhone){
				let that = this
				console.log(calendarId)
				let userData = uni.getStorageSync('userData')
				this.$apis.postOrderExpert({'id': calendarId}).then(res => {
					if (res.code == 200) {
						console.log("预约专家成功");
						var resultList = []
						var obj = {
							"expertId" : this.id,
							"userId" : userData.userId,
							"calendarId" : calendarId,
							"patientName" : userData.userName,
							"patientSex" : userData.sex,
							"patientAge" : userData.age,
							"type" : "2",
							"status" : "1"
						}
						resultList.push(obj)
						this.$apis.postSaveOoderInfo(resultList).then(res => {
							
							if (res.code == 200) {
								console.log("保存预约人信息成功");
								this.requestSubscribeMessage(visitDate,beginTime,endTime,expertName,res.id,mobilePhone);
								this.toConsultationDetail(res.id);
							} else {
								uni.showToast({
									title: res.msg
								})
							}
							
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
				//初始化数据
				this.loadData();
				wx.showToast({
					title : '预约成功',
					icon : 'success',
					duration : 1000
				});
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
					tmplIds:["tz0qAaZq2v0s3dZbfPnOYwkFy7QOF82XVFNvpLZGTNQ"],
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
			}
			/* ,bindDateChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.detail.value)
			    this.setData({
			      date: e.detail.value
			    })
			} */
		}
	};
</script>

<style scoped>
	page {
		background-color: #f1f1f1;
	}
</style>
<style lang="scss" scoped>
	.expert {
		display: none;
		&.active {
			display: block;
		}
		height: 100%;
		overflow-y: hidden;
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
	.dateCheck {
		color: 	#FF0000;
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
	.expert-top {
		width: 88%;
		background: #fff;
		padding: 3rpx;
		box-shadow: 0 0 28rpx 0 rgba(155, 153, 146, 0.18);
		border-radius: 50rpx;
		margin: 10rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	.expert-headicon {
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
	.expert-headicon1 {
		/* width: 100%;
		padding-right: 27px; */
		
		width: 100%;
		background: #fff;
		padding: 3rpx;
		box-shadow: 0 0 28rpx 0 rgba(155, 153, 146, 0.18);
		margin: 20rpx auto;

	}
	.expert-headicon2 {
		width: 100%;
		background: #fff;
		padding: 3rpx;
		box-shadow: 0 0 28rpx 0 rgba(155, 153, 146, 0.18);
		margin: 20rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	
	}
	.expert-headicon1 .expert-headicon1img{
		width: 100rpx;
		height: 100rpx;
	}
	.savebutton {
		width: 100rpx;
		line-height: 50rpx;
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 40rpx auto;
		text-align: center;
		background-color: #B0E0E6;
		margin-left:10rpx;
		vertical-align: middle;
	}
	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}
	.testbutton {
		width: 120rpx;
		line-height: 50rpx;
		background: #77beff;
		text-align: center;
		font-size: 26rpx;
		color: black;
		
	}
</style>
