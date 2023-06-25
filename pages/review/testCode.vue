 <template>
 	<view>
 		<view class="roundcenter">
 			<view class="formcontent">
 				<u-form :model="form" ref="uForm">
 					<u-form-item label="测评码" prop="evalCode" required label-width="140" border-bottom>
 						<u-input v-model="form.evalCode" placeholder="无测评码？请点击立即购买"/>
 					</u-form-item>
					<view class="paybutton" @click="evalCodeBuy">立即购买</view>
					<view style="font-size: 28rpx; margin-top: 20rpx; color: #757575;"><text>可在我的商品中查看已购买的测评码</text></view>
 				</u-form>
				<view class="savebutton" @click="submit">下一步</view>
 			</view>
 		</view>
		
		<uni-popup ref="showPayConfirm" @change="change">
			<!-- <text style="color: #628D3D;">暂不支持购买</text> -->
			<!-- <view class="uni-tip">
				<text class="uni-tip-title">购买确认</text>
				<text class="uni-tip-content">测评码购买</text>
				<text class="uni-tip-content iconfont" style="color: #dc7a54;">价格：&#xe606;{{price}}</text>
				<view class="uni-tip-group-button">
					<button class="uni-tip-button" style="margin-right: 30px; background-color: #b7b5b2;" @click="cancel()">取消</button>
					<button class="uni-tip-button" @click="confirmBuy()" :loading="loading">确定</button>
				</view>
			</view> -->
			<view class="uni-tip">
				<text class="uni-tip-title">购买确认</text>
				<text class="uni-tip-content">暂不支持购买</text>
				<view class="uni-tip-group-button">
					<button class="uni-tip-button" style="margin-right: 30px; background-color: #b7b5b2;" @click="cancel()">取消</button>
					<button class="uni-tip-button" @click="confirmBuy1()" :loading="loading">确定</button>
				</view>
			</view>
		</uni-popup>
		
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
				price:""
 			}
 		},
 		methods: {
			
			loadData(){
				let that = this
				this.$apis.postEvalPrice().then(res => {
					if(res.code == 200){
						this.price = res.price
					}
				})
			},
			
			evalCodeBuy() {
				this.$nextTick(() => {
					this.$refs.showPayConfirm.open("center")
				})
				//this.$refs.showPayConfirm.open()
			},
 			
 			submit() {
 				let that = this
					let userData = uni.getStorageSync('userData')
					//测评码验证
					this.$apis.postVerifyEvalCode({'userId': userData.userId, 'evalCode': that.form.evalCode}).then(res => {
						if(res.code == 200){
							//个人信息确认
							uni.navigateTo({
								url: '/pages/review/personalInfoConfirm?classId=' + that.classId + '&evalCode=' + encodeURIComponent(that.form.evalCode)
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
			change(e) {
				console.log('是否打开:' + e.show)
			},
			confirmBuy1() {
				this.$refs.showPayConfirm.close()
			},
			confirmBuy() {
				uni.showLoading({
					title: "数据加载中"
				})
				
				//先获取测评码
				this.$apis.postGetEvalCode().then(res => {
					console.log("获取测评码：",res.code)
					if(res.code == 200){
						let that = this
						this.loading = true
						this.evalCodeTemp = res.evalCode
						this.$apis.postEvalCodePrePayOrder({"classId": res.evalCode,"orgAmount":that.price}).then(res => {
							uni.hideLoading()
							if(res.code == 200) {
								let preOrder = res.data
								console.log('签名:',preOrder.paySign)
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
										            content: "支付失败,原因为: " + res.errMsg,
										            showCancel: false,
										        })
												that.$apis.postUpdateEvalCodeStock({"evalCode": this.evalCodeTemp}).then(res => {
													console.log(JSON.stringify(res))
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
					}else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
				
			},
			cancel() {
				this.$refs.showPayConfirm.close()
			}
 		}
 	}
 </script>
 
 <style scoped>
 	page {
 		background-color: #EFE4C8;
 	}
 
 	.roundcenter {
 		width: 686rpx;
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
 		color: #594e3f;
 		font-size: 32rpx;
 		font-weight: 700;
 		margin: 40rpx auto;
 		text-align: center;
 		background-color: #628D3D;
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
		width: 25%;
		line-height: 60rpx;
		color: #fff;
		font-size: 30rpx;
		font-weight: 600;
		/* margin: 100rpx auto; */
		text-align: center;
		/* background: url(@/static/savebtn.png) no-repeat 50%/100%; */
		background-color: #628D3D;
		border-radius: 6px !important;
	}
	
	/* 提示窗口 */
	.uni-tip {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
		padding: 15px;
		width: 130%;
		background-color: #e6e3e3;
		border-radius: 10px;
		buttom: 100px;
		left: 50%;
		top: 50%;
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
		background-color:  #628D3D;
	}

 </style>
 
 