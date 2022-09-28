 <template>
 	<view>
 		<view class="roundcenter">
 			<view class="formcontent">
 				<u-form :model="form" ref="uForm">
 					<u-form-item label="测评码" prop="evalCode" required label-width="140" border-bottom>
 						<u-input v-model="form.evalCode" placeholder="请输入测评码" />
 					</u-form-item>
 				</u-form>
				<view class="savebutton" @click="submit">下一步</view>
 			</view>
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
 				codeBtnColor: "#ede3cb"
 			}
 		},
 		methods: {
 			
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
 		background: #f8f7f1;
 		border: 2px solid #EFE4C8;
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
 		background-color: #EFE4C8;
 	}

 </style>
 
 