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
							<u-radio active-color="#EFE4C8" v-for="(item, index) in sexList" :key="item.code"
								:name="item.code" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="年龄" prop="age" required label-width="140" border-bottom>
						<u-input v-model="form.age" placeholder="请输入年龄" />
					</u-form-item>
					<u-form-item label="手机号" prop="mobilePhone" len="11" required label-width="140" border-bottom>
						<u-input v-model="form.mobilePhone" placeholder="请输入联系方式" />
					</u-form-item>
					<!-- <u-form-item label="" prop="extra.isSick" label-width="140" border-bottom> -->
					<view style="margin-bottom: 30px;"  v-if="showExtra" >
						<text style="font-size: 12px; color: #565654;">自入学至今，你有生病或受伤吗？</text>
						<u-radio-group v-model="form.extraObj.isSick">
							<u-radio active-color="#EFE4C8" v-for="(item, index) in yesOrNo" :key="item.code"
								:name="item.code" :disabled="item.disabled" @change="sickChange" :checked="item.checked">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
						<textarea v-if="showExtra1" v-model="form.extraObj.sickDesc" maxlength="900" placeholder="请输入自评描述"
						 style="margin-top: 30px; border: solid 1px; width: 100%; border-color:#ede3cb;"/>
					</view>	 
					<!-- </u-form-item> -->
				</u-form>
				<view class="savebutton" @click="submit">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	export default {
		onLoad(option) {
			if (option.toPath) {
				this.toPath = decodeURIComponent(option.toPath)
			}
			this.projectId = option.projectId
			let userData = uni.getStorageSync('userData')
			if (userData && userData.mobilePhone) {
				this.toIndex(this.projectId)
				return
			}
			/* let pid = uni.getStorageSync('projectId')
			if(pid && pid > 0) {
				this.showExtra = true
			} */
			let that = this
			userCheck.checkLogin(function(userData){
				//1.保存用户信息
				uni.setStorageSync('userData', userData)
				//2.跳转页面
				if(that.toPath && that.toPath != "") {
					that.toOrgPath(that.toPath)
				} else {
					that.toIndex(that.projectId)
				}
			});
		},
		data() {
			return {
				showExtra: false,
				showExtra1: false,
				projectId: 0,
				toPath: '',
				code: '',
				form: {
					userName: '',
					age: '',
					mobilePhone: '',
					sex: '',
					openid: '',
					extraObj: {}
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
					age: [{
						required: true,
						message: '请输入年龄',
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
				}
			}
		},
		methods: {
			sickChange(val) {
				if (val == '1') {
					this.showExtra1 = true
				} else {
					this.showExtra1 = false
				}
			},
			toOrgPath(toPath) {
				uni.redirectTo({
					url: decodeURIComponent(toPath)
				})
			},
			toIndex(projectId) {
				uni.navigateTo({
					url: '/pages/project/index?projectId=' + projectId,
					success(res) {
						console.log(res);
					},
					fail(err) {
						// errMsg: "navigateTo:fail page "pages/index/pages/test/test" is not found"
						console.log(err);
					}
				});
			},
			postLogin() {
				let that = this
				let projectId = uni.getStorageSync("projectId")
				if (!projectId) {
					projectId = 0
				}
				this.form["projectId"] = projectId
				this.$apis.postRegisterUserInfo(this.form).then(res => {
					uni.hideLoading()
					if (res.code == 200) { //注册成功
						that.form.userId = res.result //用户id赋值
						uni.setStorageSync('userData', that.form)
						if (that.toPath && that.toPath != "") {
							that.toOrgPath(that.toPath)
						} else {
							that.toIndex(that.projectId)
						}
					} else { //注册失败
						alert(res.msg)
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			submit() {
				if (this.showExtra) {
					if(!this.form.extraObj.isSick) {
						uni.showToast({
							title: '请选择是否生病',
							icon: 'error'
						})
						return
					} else if(this.form.extraObj.isSick == "1" && !this.form.extraObj.sickDesc) {
						uni.showToast({
							title: '请输入自评',
							icon: 'error'
						})
						return
					}
				}
				
				let that = this
				uni.showLoading({
					title: '信息提交中'
				})
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let openid = uni.getStorageSync("openid")
						if(openid && openid != "") {
							this.form.openid = openid
							that.postLogin()
						} else {
							uni.login({
								provider: 'weixin',
								success(login) {
									console.log(login);
									that.$apis.postGetOpenid({"code": login.code}).then(res => {
										if (res.code == 200) {
											that.form.openid = res.result
											uni.setStorageSync("openid", res.result)
											that.postLogin()
										} else {
											uni.showToast({
												title: res.msg,
												icon: "error",
												duration: 3000
											})
										}
									})
								}
							})
						}
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
		margin: 60rpx auto 0 auto;
		background: #f8f7f1;
		 /* background: url(../../static/background.png); */
		/* box-shadow: 0 40rpx 0 -22rpx rgb(221 138 0 / 23%), 0 -9px 0 0 rgb(105 100 87 / 14%) inset; */
		/* box-shadow: 0 0 30rpx 0 #e4d3b0; */
		border: 2px solid #EFE4C8;
		border-radius: 50rpx;
	}

	.round {
		width: 100%;
		height: 124rpx;
		/* background: url(../../static/roundbg.png) no-repeat 50%/100%; */
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
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 40rpx auto;
		text-align: center;
		/* background: url(../../static/background.png) no-repeat 50%/100%; */
		background-color: #EFE4C8;
	}
</style>
