<template>
	<view>
		<view class="roundcenter">
			<view class="formcontent">
				<u-form :model="form" ref="uForm">
					<u-form-item label="姓名" prop="userName" required label-width="140" border-bottom>
						<u-input v-model="form.userName" placeholder="请输入姓名" />
					</u-form-item>
					<u-form-item label="性别" prop="sex" required label-width="140" border-bottom>
						<u-radio-group v-model="form.sex">
							<u-radio active-color="#387100" v-for="(item, index) in sexList" :key="item.code"
								:name="item.code" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="年龄" prop="age" required label-width="140" border-bottom>
						<u-input v-model="form.age" placeholder="请输入年龄" />
					</u-form-item>
					<u-form-item label="手机号" prop="mobilePhone" len="11" required label-width="140" border-bottom>
						<view style="display: flex; justify-content: space-around; flex-flow: wrap row; width: 100%;">
							<u-input v-model="form.mobilePhone" placeholder="请输入手机号" style="width: 60%;"/>
							<button  :disabled="isLock" class="msgbutton" @click="sendMsg()" style="width: 38%;">{{msgVerCode}}</button>
						</view>
					</u-form-item>
					<u-form-item label="验证码" prop="msgCode" label-width="140" border-bottom>
						<u-input v-model="form.msgCode" placeholder="请输入短信验证码" type="number" max-length="4"/>
					</u-form-item>
					<view style="display: flex;">
						 <label>
							 <checkbox-group @change="secrecyCheck">
								<checkbox value="0" :checked="secrecy" style="transform: scale(0.6);"/>
							 </checkbox-group>
						</label>
						<label @click="toDetail()" style="font-size: 10px; color: #4f9f00;line-height: 25px;">用户服务协议及隐私条款</label>
					</view>
				</u-form>
				<view class="savebutton" @click="submit">提交修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	export default {
		onLoad(option) {
			let that = this
			uni.showLoading({
				title: '数据加载中'
			})
			userCheck.checkLogin(function(userData){
				uni.hideLoading()
				//1.保存用户信息
				that.form.userName = userData.userName
				that.form.age = userData.age
				that.form.mobilePhone = userData.mobilePhone
				that.form.sex = userData.sex
				that.form.openid = userData.openid
				that.form.userId = userData.userId
				that.orgMobilePhone = userData.mobilePhone
			}).catch(err => {
				uni.hideLoading()
				console.log(err)
			});
		},
		data() {
			return {
				showCode: false,
				code: '',
				orgMobilePhone: '',
				form: {
					userName: '',
					age: '',
					mobilePhone: '',
					sex: '',
					openid: '',
					extraObj: {},
					userId: '',
					msgCode: ''
				},
				sexList: [{
						name: '男',
						code: '1',
						disabled: false
					},
					{
						name: '女',
						code: '2',
						disabled: false
					}
				],
				yesOrNo: [{
						name: '是',
						code: '1',
						disabled: false,
						checked: false
					},
					{
						name: '否',
						code: '2',
						disabled: false,
						checked: true
					}
				],
				rules: {
					userName: [{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur']
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: ['change', 'blur']
					}],
					mobilePhone: [{
							required: true,
							message: '请输入联系方式',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]
				},
				countDown: 60,
				timer: {},
				msgVerCode: '获取验证码',
				isLock: false,
				codeBtnColor: "#ede3cb"
			}
		},
		onUnload: function() {
			this.timer && this.clearTimer();
		},
		methods: {
			secrecyCheck(e){
				if(e.detail.value=='0'){
					this.secrecy = true
				} else {
					this.secrecy = false
				}
			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/user/privacyProto'
				})
			},
			sendMsg(){
				if (!this.form.mobilePhone || !this.$u.test.mobile(this.form.mobilePhone)) {
					uni.showToast({
						icon: 'fail',
						title: '手机号为空或格式不正确'
					})
					return
				}
				this.isLock = true
				let that = this
				this.$apis.postSendMsgCode({"mobilePhone": this.form.mobilePhone}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: '验证码发送成功'
						})
						this.timer = setInterval(() => {
								if (this.countDown == 0) {
									this.reset();
									this.timer && this.clearTimer();
								} else {
									this.loading();
								}
						}, 1000);
					} else {
						that.reset()
						uni.showToast({
							icon: 'fail',
							title: res.msg
						})
					}
				}).catch(err => {
					that.reset()
					console.log(err)
				})
			},
			loading(){
				this.isLock = true
				this.countDown -= 1;
				this.msgVerCode = this.countDown + '秒后重发';
			},
			reset(){
				this.countDown = 60;
				this.isLock = false;
				this.msgVerCode = '获取验证码';
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			updateUser() {
				let that = this
				this.$apis.postUpdateUserInfo(this.form).then(res => {
					uni.hideLoading()
					if (res.code == 200) { //注册成功
						that.form.msgCode = ''
						that.form.userId = res.result.userId //用户id赋值
						uni.setStorageSync('userData', that.form)
						uni.switchTab({
							url: "/pages/user/index"
						})
					} else { //注册失败
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			submit() {
				if(!this.secrecy) {
					uni.showToast({
						title: "请选择同意用户隐私协议",
						icon:"none"
					})
					return 
				}
				let that = this
				uni.showLoading({
					title: '信息提交中'
				})
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if(that.orgMobilePhone != that.form.mobilePhone && !that.form.msgCode) {
							uni.hideLoading()
							uni.showToast({
								title: "修改手机号需要验证码",
								icon:'none'
							})
							return;
						}
						that.updateUser()
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style scoped>
	page {
		background-color: #EFE4C8;
	}

	.roundcenter {
		width: 686rpx;
		margin: 20rpx auto 0 auto;
		background: #ffffff;
		border-radius: 50rpx;
	}

	.round {
		width: 100%;
		height: 124rpx;
	}

	.avatar {
		width: 125rpx;
		height: 135rpx;
		border-radius: 50%;
		box-shadow: 0 -9rpx 0 0 rgb(105 100 87 / 14%) inset;
		margin: auto;
	}

	.avatar image {
		width: 125rpx;
		height: 125rpx;
	}

	.formcontent {
		padding: 40rpx;
	}

	.formcontent .label-text span {
		font-size: 26rpx;
	}

	.organization .organizationtitle image {
		width: 32rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.organization .organizationtitle text {
		font-size: 28rpx;
		vertical-align: middle;
		color: #857f77;
	}

	.savebutton {
		width: 622rpx;
		line-height: 90rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: 700;
		margin: 40rpx auto;
		text-align: center;
		background-color: #51a300;
		border-radius: 30rpx;
	}
	.msgbutton {
		line-height: 70rpx;
		color: #fff;
		font-size: 22rpx;
		font-weight: 700;
		text-align: center;
		background-color: #56ac00;
		float: right;
	}
</style>
