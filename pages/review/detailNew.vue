<template>
	<view>
        <view style="width: 100%;">
			<view class="imageStyle">
				<image @click="toPsychometrics" mode="widthFix" :src="reviewClass.bannerImg || defaultCover" @error="imageError()"></image>
			</view>
			<view style="margin: 0 35rpx;font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;">
				<view class="title" style="color: #416F5D; font-size: 40rpx;margin-bottom: 20rpx;">{{reviewClass.title}}</view>
				<view class="content" style="font-size: 32rpx;margin-bottom: 20rpx;color: #555;padding: 0 21rpx;">{{reviewClass.guide}}</view>
				<view class="time" style="font-size: 28rpx;color: #000000;font-weight: 700;">{{'共'+questionList.length+'题|预计用时'+time+'分钟'}}</view>
			</view>
			<view style="width: 100%; height: 20rpx;margin: 20rpx 0;background-color: rgba(237,237,237,0.4);"></view>
			<view style="background: #ffffff;min-height: 700rpx;">
				<view style="font-size: 38rpx;color: #000000;display: block;text-align: center;">{{'测评须知'}}</view>
				<view style="font-size: 30rpx;width: 80%;min-height: 400rpx;background: rgba(215,233,230, 0.4);border: 1rpx solid rgba(106,150,31,0.42);margin: 20rpx auto;padding: 23rpx 23px 120px 23px;color: #555555;line-height: 42rpx;">
					<p>{{'如果您要参加一次测评，请注意以下事项：'}}</p>
					<p>{{'1.确认测评目的和内容：了解测评的目的和内容，确认自己是否符合参测条件，并了解测评结果的应用和影响。'}}</p>
					<p>{{'2.提前准备：确保充分休息、饮食充足，避免在测评前进行身体或心理上的剧烈运动、刺激性活动或大量饮酒等不利于测评结果的行为。'}}</p>
					<p>{{'3.遵从测评人员指导：测评可以涉及不同的测评人员和不同的测试项目。请遵守测评人员的指导，如按时到场、佩戴适当的耳机、眼镜和其他设备等。'}}</p>
					<p>{{'4.保持放松和专注：测评可能会涉及较长时间的测试项目，请保持良好的心态和情绪，避免紧张和焦虑，并集中注意力完成测试项目。'}}</p>
					<p>{{'5.不要作弊或伪装：测评结果对于评估和治疗等领域的决策有重要的影响，请不要伪装或作弊。评估结果只有真实、准确才有参考价值。'}}</p>
				</view>
			</view>
			
		</view>
		<view v-if="this.id != this.dongliangClassId && this.id != dongliangClassProId">
			<view class="tabbar-bottom">
				<span>
					<p style="color: #416F5D; font-size: 34rpx;">{{'￥' + reviewClass.realPrice}}</p>
					<p style="font-size: 22rpx;color:#979797">{{reviewClassNumber + '人测过'}}</p>
				</span>
				<span class="buy-button" @click="buy">{{'购买测评'}}</span>
			</view>
		</view>
		<view v-if="this.id == this.dongliangClassId || this.id == dongliangClassProId">
			<view class="tabbar-bottom">
				<!-- <span>
					<p style="color: #416F5D; font-size: 34rpx;">{{'￥' + reviewClass.realPrice}}</p>
					<p style="font-size: 22rpx;color:#979797">{{reviewClassNumber + '人测过'}}</p>
				</span> -->
				<span class="buy-button1" @click="buyCareerPlan">{{'购买测评码'}}</span>
			</view>
		</view>
		<uni-popup ref="showPayConfirm" @change="change" class="uniPopupStyle">
			<view class="uni-tip">
				<text class="uni-tip-title">{{'购买确认'}}</text>
				<text class="uni-tip-content">量表名称</text>
				<text class="uni-tip-content">{{ reviewClass.title }}</text>
				<text class="uni-tip-content iconfont" style="color: #dc7a54;">量表价格：&#xe606;{{ '0.1' }}</text>
				<view class="uni-tip-group-button">
					<button class="uni-tip-button" style="margin-right: 30px; background-color: #b7b5b2;" @click="cancel()">取消</button>
					<button class="uni-tip-button" @click="confirmBuy()" :loading="loading">确认</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				reviewClass: {},
				questionList: [],
				time: '',
				reviewClassNumber: '',
				loading: false,
				id: '',
				dongliangClassId : '402880f082eecb960182eee3b1ef0001',
				dongliangClassProId : '2c9cff928408eab3018413a00d8a006a',
			}
		},
		computed:{
			//拼接where条件
			//查询条件 ,更多详见 ：https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery
			where(){
				console.log(this.id);
				return `_id =="${this.id}"`
			},
			charge() {
				return this.reviewClass.charge == 1
			}
		},
		onLoad(event) {
			//获取真实id，通常 id 来自上一个页面
			if(event.classId){
				this.id = event.classId
			}
			//若上一页传递了标题过来，则设置导航栏标题
			if(event.title){
				this.title = event.title
				uni.setNavigationBarTitle({
					title:event.title
				})
			}
		},
		onReady() {
			// 开始加载数据，修改 where 条件后才开始去加载 clinetDB 的数据 ，需要等组件渲染完毕后才开始执行 loadData，所以不能再 onLoad 中执行
			if(this.id){// ID 不为空，则发起查询
				//加载详情数据
				this.loadData()
			}else{
				uni.showToast({
					icon:'none',
					title:'出错了，测评量表ID为空'
				})
			}
		},
		methods: {
			loadData() {
				let that = this
				if(!this.id || this.id == "") {
					uni.showToast({
						title: "测评量表ID为空"
					})
					return
				}
				uni.showLoading({
					title: "数据加载中"
				})
				this.$apis.postReviewClassDetail({'classId': this.id}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						that.reviewClass = res.result
						if(that.title == '' && that.reviewClass.title){
							that.title = that.reviewClass.title
							uni.setNavigationBarTitle({
								title: that.title
							})
						}
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
				this.$apis.postQuestions({'classId': this.id}).then(res => {
					that.questionList = res.result
					that.time = Math.round(that.questionList.length * 15/60)//暂时按一道题15秒计算测评时长
				})
				this.$apis.postReviewClassNumber({'classId': this.id}).then(res => {
					that.reviewClassNumber = res.result
				})
			},
			buy() {
				uni.setStorageSync('reviewClass',this.reviewClass)
				uni.navigateTo({
					url: '/pages/order/reviewOrder'
				})
			},
			buyCareerPlan() {
				uni.setStorageSync('reviewClass',this.reviewClass)
				uni.navigateTo({
					url: '/pages/review/testCode?classId=' + this.id
				})
			},
			cancel() {
				this.$refs.showPayConfirm.close()
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			confirmBuy() {
				uni.showLoading({
					title: "数据加载中"
				})
				let that = this
				let pid = uni.getStorageSync("projectId")
				this.loading = true
				this.$apis.postCreatePrePayOrder({"classId": this.reviewClass.classId, "projectId": pid}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						let preOrder = res.result
						if(preOrder && preOrder.prePayID) {
							if(preOrder.prePayID == "000") {
								that.buyBtnText = "已购买"
								that.reviewClass.buy = true
								uni.showToast({
								    title: "购买成功",
									icon: "success"
								})
								that.cancel()
								that.loading = false;
								this.beginTest()
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
											that.reviewClass.buy = true
											//更新订单状态
											that.$apis.postUpdOrderStatus({"payId": preOrder.prePayID, "status": 2, "orderAmount": that.reviewClass.realPrice}).then(res => {
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
			beginTest() {
				if (!this.reviewClass) {
					uni.showToast({
					    title: "量表信息为空"
					})
				}
				//量表是否收费
				if(this.reviewClass.charge == 0 || (this.reviewClass.charge == 1 && this.reviewClass.buy)) {
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
							//url: '/pages/review/evaluationScale?classId=' + this.reviewClass.classId
							url: '/pages/report/guide?classId=' + this.reviewClass.classId
						})
					}
				} else {
					uni.showToast({
					    title: "用户未购买"
					})
				}
			},
		}
	}
</script>

<style>
	.imageStyle {
		border-radius: 16px;
		flex-direction: column;
		width: 90%;
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
		background: #d7e9e6;
		height: 110rpx;
		justify-content: space-around;
		padding: 26rpx 0;
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
	.buy-button1{
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
	.uniPopupStyle {
		position: absolute;
		display: block;
		top: 50%;
	}
	/* 提示窗口 */
	.uni-tip {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5%;
		width: 80%;
		background-color: #dcdcdc;
		border-radius: 10px;
		margin: 0 5%;
	}
	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}
	.uni-tip-content {
		/* padding: 15px;*/
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
	.organization {
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #dcd6d6;
		padding: 15rpx;
		/* margin: 30rpx auto; */
	}
	.savebutton {
		width: 25%;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: 700;
		/* margin: 100rpx auto; */
		text-align: center;
		/* background: url(@/static/savebtn.png) no-repeat 50%/100%; */
		background-color: #55aaff;
		border-radius: 6px !important;
	}
</style>