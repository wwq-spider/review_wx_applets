 <template>
 	<view>
 		<view class="roundcenter">
 			<view class="formcontent">
 				<u-form :model="form" ref="uForm">
 					<u-form-item label="测评码" prop="evalCode" required label-width="140" border-bottom>
 						<u-input v-model="form.evalCode" placeholder="测评码已经被使用,请重新输入"/>
 					</u-form-item>
 				</u-form>
				<view class="savebutton" @click="submit">重新提交</view>
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
				price:"",
				paramList:[]
 			}
 		},
 		methods: {
			
			evalCodeBuy() {
				this.$nextTick(() => {
					this.$refs.showPayConfirm.open("center")
				})
				//this.$refs.showPayConfirm.open()
			},
 			
 			submit() {
				uni.showLoading({
					title: '提交中...'
				})
 				let that = this
				var paramList = uni.getStorageSync("paramList")
				paramList[0].testCode = that.form.evalCode
				//提交测评数据
				this.$apis.postCommitTest(paramList).then(res => {
					that.lock = false
					uni.hideLoading()
					if (res.code == 200) {
						//跳转报告查看页面
						uni.navigateTo({
							url: '/pages/report/pdfreport?pdfUrl=' + encodeURIComponent(res.pdfUrl)
						})
					} else {
						uni.showToast({
							title: '提交失败',
							icon: 'wrong'
						})
						uni.removeStorageSync("paramList")
					}
				}).catch(err => {
					console.log('进入异常')
					uni.hideLoading()
					that.lock = false
				})
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
 		border: 1px solid #55aaff;
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
 		background-color: #70bdff;
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
		color: cornflowerblue;
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
		background-color: #55aaff;
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
		background-color: #e6a23c;;
	}

 </style>
 
 