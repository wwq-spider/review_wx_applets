 <template>
 	<view>
 		<view class="roundcenter">
 			<view class="formcontent">
 				<u-form :model="form" ref="uForm">
 					<u-form-item label="测评码" prop="evalCode" required label-width="140" border-bottom>
 						<u-input v-model="form.evalCode" placeholder="无测评码？请点击立即购买"/>
 					</u-form-item>
					<view style="display: block;">
						<view><p style="font-size: 24rpx;">{{'测评码价格：￥' + price}}</p></view>
						<view class="paybutton" @click="evalCodeBuy">立即购买</view>
					</view>
					<view style="font-size: 28rpx; margin-top: 20rpx; color: #757575;"><text>可在我的商品中查看已购买的测评码</text></view>
 				</u-form>
				<view class="savebutton" @click="submit">下一步</view>
 			</view>
			<view class="popup-container">
				<uni-popup style="width:100%" ref="popup" type="bottom" @change="change">
					<view style="background-color: #eaeaea;padding: 10px;width:100%;height: 600rpx;margin-top: 300rpx;">
						<view style="font-size: 35rpx;text-align: center;">{{'确认支付'}}</view>
						<view style="font-size: 32rpx;margin: 30rpx 20rpx 50rpx 10rpx;">{{'支付方式：微信支付'}}</view>
						<view style="font-size: 32rpx;margin: 30rpx 20rpx 50rpx 10rpx;display: inline-flex;">
							<p>{{'支付金额：￥0.1'}}</p>
						</view>
						<view style="display: inline-flex;">
							<view class="cancle-button" @click="cancleOrder">{{'取消'}}</view>
							<view class="submit-button" @click="submitOrder">{{'立即支付'}}</view>
						</view>
					</view>
				</uni-popup>	
			</view>
 		</view>
		
		<view class="notefont">
			<text>测评技术支持：北京心智栋梁教育科技有限公司</text>
		</view>
 	</view>
 </template>
 
 <script>
	import userCheck from '@/utils/userAction.js';
 	export default {
 		onLoad(option) {
 			let that = this
			var userData = uni.getStorageSync('userData')
			
			if(option.classId){
				that.classId = option.classId
			}
			this.loadData();
 		},
 		data() {
 			return {
 				reviewClass: {},
 				userId : "",
 				evalCode : "",
 				classId : "",
 				form: {
 					evalCode: ''
 				},
 				rules: {
 					evalCode: [{
 						required: true,
 						message: '请输入测评码',
 						trigger: ['change', 'blur']
 					}]
 				},
 				countDown: 60,
 				timer: {},
 				isLock: false,
 				codeBtnColor: "#ede3cb",
				evalCodeTemp:"",
				price:0
 			}
 		},
 		methods: {
			
			loadData(){
				let that = this
				this.$apis.postEvalPrice().then(res => {
					if(res.code == 200){
						this.price = res.result.price
					}
				})
			},
			
			evalCodeBuy() {	
				this.$refs.popup.open("bottom")
			},
 			
 			submit() {
 				let that = this
				let userData = uni.getStorageSync('userData')
				//测评码验证
				console.log('测评码：', that.form.evalCode)
				this.$apis.postVerifyEvalCode({'userId': userData.userId, 'evalCode': that.form.evalCode}).then(res => {
					console.log('返回数据：', res)
					if(res.code == 200){
						//个人信息确认
						uni.navigateTo({
							url: '/pages/review/personalInfoConfirm?classId=' + that.classId + '&evalCode=' + encodeURIComponent(that.form.evalCode)
						})
					}else {
						uni.showToast({
							title: res.data.message
						})
					}
				}).catch(err => {
					console.log(err)
				})
 			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			cancleOrder() {
				this.$refs.popup.close()
			},
			submitOrder() {
				uni.showLoading({
					title: "数据加载中"
				})
				
				//先获取测评码
				this.$apis.postGetEvalCode().then(res => {
					if(res.code == 200){
						let that = this
						this.loading = true
						this.evalCodeTemp = res.result
						this.$apis.postEvalCodePrePayOrder({"classId": res.result,"orderAmount":that.price}).then(res => {
							uni.hideLoading()
							if(res.code == 200) {
								let preOrder = res.result
								console.log('preOrder========',preOrder)
								if(preOrder && preOrder.prePayID) {
									if(preOrder.prePayID == "000") {
										uni.showToast({
										    title: "购买成功",
											icon: "success"
										})
										this.form.evalCode = this.evalCodeTemp
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
												console.log('===============',res)
												if(res && res.errMsg == "requestPayment:ok") {
													//更新订单状态
													that.$apis.postUpdOrderStatus({"payId": preOrder.prePayID, "status": 2, "orderAmount": that.price}).then(res => {
														console.log(JSON.stringify(res))
													})
													uni.showToast({
													    title: "支付成功",
														icon: "success"
													})
													this.form.evalCode = this.evalCodeTemp
												} else {
													uni.showToast({
													    title: "支付发起失败"
													})
													that.$apis.postUpdateEvalCodeStock({"evalCode": this.evalCodeTemp}).then(res => {
														console.log(JSON.stringify(res))
													})
												}
										    },
										    fail: (res) => {
												uni.showModal({
												    content: "支付失败",
												    showCancel: false,
												})
												that.$apis.postUpdateEvalCodeStock({"evalCode": this.evalCodeTemp}).then(res => {
													console.log(JSON.stringify(res))
												})
										    },
										    complete: () => {
												that.cancleOrder()
										        that.loading = false;
										    }
										})
									}
								} else {
									that.loading = false;
									that.cancleOrder()
									uni.showToast({
										title: '支付失败'
									})
								}
							} else {
								that.loading = false;
								that.cancleOrder()
								uni.showToast({
									title: '支付失败'
								})
							}
						}).catch(err => {
							that.loading = false;
							that.cancleOrder()
							uni.hideLoading()
							console.log(JSON.stringify(err))
						})
					}else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
				
			},
 		}
 	}
 </script>
 
 <style scoped>
 	page {
 		background-color: #EFE4C8;
 	}
 
 	.roundcenter {
 		width: 100%;
 		margin: 60rpx auto 0 auto;
 		background: #ffffff;
 		border: 1px solid #628D3D;
 		border-radius: 50rpx;
 	}
 	.formcontent {
 		padding: 40rpx;
 	}
 
 	.formcontent .label-text span {
 		font-size: 26rpx;
 	}
 
 	.savebutton {
 		width: 622rpx;
 		line-height: 90rpx;
 		color: #fff;
 		font-size: 32rpx;
 		font-weight: 700;
 		margin: 40rpx auto;
 		text-align: center;
 		background-color: #628D3D;
		border-radius: 30rpx;
 	}
	.notefont {
		text-align: center;
		left: 0;
		right: 0;
		position: fixed;
		bottom: 40rpx;
		text-decoration: underline;
		font-weight: 400;
		font-size: 30rpx;
		color: #628D3D;
	}
	.noteShow {
		text-align: center;
		left: 0;
		right: 0;
		position: fixed;
		font-weight: 400;
		font-size: 30rpx;

	}
	.paybutton {
		width: 22%;
		line-height: 60rpx;
		color: #fff;
		font-size: 30rpx;
		font-weight: 600;
		text-align: center;
		background-color: #628D3D;
		border-radius: 6px !important;
		margin: -44rpx 10rpx 0 286rpx;
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
	.popup-container{
		position: absolute;
		z-index: 1000;
		width: 100%;
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

 </style>
 
 