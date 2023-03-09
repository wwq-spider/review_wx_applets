<template>
	<view class="expert" :class="{active: bodyShow}">
		<view class="tips" :class="{ 'tips-ani': tipShow }">上拉刷新...</view>
		<view class="consultation" v-for="(item, index) in appointList"  :key="index">
			<view class="consultationr" >
				<view class="title">
					<text>预约人: {{item.patientName}}</text>
					<text v-if="item.buy == true">
						<text style="position: absolute;right: 10rpx;margin-right: 90rpx;">{{item.confirmFlag}}  已支付</text>
					</text>
					<text v-if="item.buy == false">
						<text style="position: absolute;right: 10rpx;margin-right: 90rpx;">{{item.confirmFlag}}  未支付</text>
					</text>
				</view>
				<view class="title">预约时间: {{item.visitDate}} {{item.beginTime}}-{{item.endTime}}</view>
				<view class="title" v-if="item.confirmFlag == '待确认'">
					<!-- <text>腾讯会议码:</text> -->
					<input :value="item.txNumber" maxlength="18" @input="enterTxNumber" placeholder="请输入腾讯会议码再进行确认" placeholder-style="color:#aba6a4;"></input>
				</view>
				<view class="title" style="display: flex;">
					<view v-if="item.confirmFlag == '待确认'" class="testbutton" @click='confirm(item.id,item.patientName,item.userPhone,item.buy,item.visitDate,item.beginTime,item.endTime)'>确认</view>
					<!-- <view v-if="item.confirmFlag == '待确认'" class="testbutton" @click='repulse(item.id)'>打回</view> -->
				</view>
			</view>
		</view>
		<uni-popup ref="showConfirmRemind" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">提醒用户支付</text>
				<view class="uni-tip-group-button">
					<button class="uni-tip-button" style="margin-right: 30px; background-color: #b7b5b2;" @click="cancel()">取消</button>
					<button class="uni-tip-button" @click="confirmRemind()" :loading="loading">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	import config from '@/config/index.config.js';
	import htmlParser from '@/common/html-parser';
	export default {
		data() {
			return {
				bodyShow: true, // 页面显示
				appointList : [], //预约列表
				txNumber : '',
				userPhoneTemp: '',
				patientNameTemp: ''
			}
		},
		onLoad() {
			//查询我的预约
			this.loadData();
		},
		methods: {
			enterTxNumber: function (event) {
			  this.txNumber = event.target.value;
			},
			loadData() {
				uni.showLoading({
					title: '数据加载中'
				})
				let that = this
				let userData = uni.getStorageSync('userData')
				this.$apis.postListAppoint({'expertPhone': userData.mobilePhone}).then(res => {
					this.tipShow  = false
					uni.hideLoading()
					that.appointList = []
					if (res.code == 200) {
						res.result.forEach((row) => {
							that.appointList.push(row)
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
			confirm(id,patientName,userPhone,buy,visitDate,beginTime,endTime){
				const txNumber = this.txNumber
				if(!txNumber){
					wx.showToast({
						title:'请输入腾讯会议码',
						icon: 'none',
						duration:1000
					})
					return;
				}
				if(buy != true){
					wx.showToast({
						title:'用户未支付',
						icon: 'none',
						duration:1000
					})
					this.userPhoneTemp = userPhone
					this.patientNameTemp = patientName
					this.$nextTick(() => {
						this.$refs.showConfirmRemind.open("center")
					})
					return;
				}
				//确认预约
				this.$apis.postConfirmAppoint({'id': id,'patientName': patientName,'userPhone': userPhone,'txNumber': txNumber,'visitDate': visitDate,'beginTime': beginTime,'endTime': endTime}).then(res => {
					if (res.code == 200) {
						//初始化数据
						this.loadData(true)
						wx.showToast({
							title : '已确认',
							icon : 'success',
							duration : 1000
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
			/* repulse(id){
				//确认预约
				this.$apis.postConfirmAppoint({'id': id}).then(res => {
					if (res.code == 200) {
						//初始化数据
						this.loadData(true)
						wx.showToast({
							title : '已确认',
							icon : 'success',
							duration : 1000
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}, */
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				this.tipShow = true
				//初始化数据
				this.loadData(true)
			},
			cancel() {
				this.$refs.showConfirmRemind.close()
				console.log('取消时会议码：' + this.txNumber)
				this.txNumber = ''
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			confirmRemind() {
				this.$apis.postPayRemind({'userPhone': this.userPhoneTemp,'patientName': this.patientNameTemp}).then(res => {
					if (res.code == 200) {
						//初始化数据
						this.loadData(true)
						this.$refs.showConfirmRemind.close()
						wx.showToast({
							title : '已提醒',
							icon : 'success'
						})
						console.log('确认时会议码：' + this.txNumber)
						this.txNumber = ''
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	
	@import '@/common/uni-ui.scss';
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	.expert {
		display: none;
		&.active {
			display: block;
		}
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
	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}
	
	.consultation {
		width: 88%;
		background: #fff;
		padding: 20rpx;
		border-radius: 50rpx;
		margin: 20rpx auto;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	.consultationr {
		padding-left: 15rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	.consultationr .title {
		width: 100%;
		color: #594e3f;
		font-size: 30rpx;
		margin: 20rpx 0 20rpx 0;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //可设置显示的行数
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.consultationr .testbutton {
		width: 140rpx;
		line-height: 54rpx;
		background: #77beff;
		text-align: center;
		font-size: 26rpx;
		color: #fff;
		margin-left: 10px;
	}
	/* 提示窗口 */
	.uni-tip {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 15px;
		width: 170%;
		background-color: #e6e3e3;
		border-radius: 10px;
		buttom: 100px;
		left: 50%;
		top: 80%;
	}
	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
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
</style>