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
							<u-radio active-color="#55aaff" v-for="(item, index) in sexList" :key="item.code"
								:name="item.code" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="年龄" prop="age" required label-width="140" border-bottom>
						<u-input v-model="form.age" placeholder="请输入年龄" />
					</u-form-item>
					<u-form-item label="手机号" prop="mobilePhone" len="11" required label-width="140" border-bottom>
						<u-input v-model="form.mobilePhone" placeholder="请输入手机号"/>
					</u-form-item>
					
					<u-form-item label="地区" prop="select" len="11" required label-width="140" border-bottom>
						<picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" :value="multiIndex" @change="pickerChange" @columnchange="pickerColumnchange">
							<view class="">{{select}}</view>
						</picker>
					</u-form-item>
					<u-form-item label="学校" prop="school" len="11" required label-width="140" border-bottom>
						<u-input v-model="form.school" placeholder="请输入学校名称"/>
					</u-form-item>
				</u-form>
				<view class="savebutton" @click="submit">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userCheck from '@/utils/userAction.js';
	import provinceData from '@/utils/provinceData.js';
	export default {
		onLoad(option) {
			let that = this
			uni.showLoading({
				title: '数据加载中'
			})
			if(option.evalCode){
				that.evalCode = decodeURIComponent(decodeURIComponent(option.evalCode))
			}
			for(let i=0; i<this.oldpProvinceDataList.length; i++){
				this.newProvinceDataList[0].push(this.oldpProvinceDataList[i].name);
			}
			for(let i=0; i<this.oldpProvinceDataList[0].city.length; i++){
				this.newProvinceDataList[1].push(this.oldpProvinceDataList[0].city[i].name);
			}
			for(let i=0; i<this.oldpProvinceDataList[0].city[0].area.length; i++){
				this.newProvinceDataList[2].push(this.oldpProvinceDataList[0].city[0].area[i]);
			}
			that.classid = option.classId
			userCheck.checkLogin(function(userData){
				uni.hideLoading()
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
				evalCode:'',
				showCode: false,
				code: '',
				orgMobilePhone: '',
				classid: '',
				form: {
					userName: '',
					age: '',
					mobilePhone: '',
					sex: '',
					openid: '',
					extraObj: {},
					userId: '',
					msgCode: '',
					select:'',
					school:''
					
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
					],
					select: [{
						required: true,
						message: '请选择地区',
						trigger: ['change', 'blur']
					}],
					school: [{
						required: true,
						message: '请选择地区',
						trigger: ['change', 'blur']
					}]
				},
				countDown: 60,
				timer: {},
				isLock: false,
				codeBtnColor: "#ede3cb",
				
				oldpProvinceDataList: provinceData.data,
				newProvinceDataList:[
					[],[],[]
				],
				multiIndex: [0, 0, 0],
				select:'选择省市区',
				
				addressData:{
					name:'',
					phone:'',
					address:''
				},
				binhao:'1'
			}
		},
		methods: {
			//确认个人信息后跳转到当前量表
			submit() {
				if(this.select == '选择省市区') {
					uni.showToast({
						title: "请选择地区",
						icon:"none"
					})
					return 
				}
				if(!this.form.school) {
					uni.showToast({
						title: "请填写学校",
						icon:"none"
					})
					return 
				}
				
				let that = this
				uni.navigateTo({
					url: '/pages/report/guide?classId='+ that.classid + '&userId=' + that.form.userId + '&name=' + encodeURIComponent(that.form.userName) + '&sex=' + that.form.sex + '&age=' + that.form.age + '&select=' + encodeURIComponent(that.select) + '&school=' + encodeURIComponent(that.form.school) + '&evalCode=' + encodeURIComponent(that.evalCode)
				})
			},
			
			// 省市区确认事件
			pickerChange(e){
				this.multiIndex = e.detail.value;
				// 数组内的下标
				// console.log(this.multiIndex);
				// 获取省
				// console.log(this.newProvinceDataList[0][this.multiIndex[0]])
				// 获取市
				// console.log(this.newProvinceDataList[1][this.multiIndex[1]])
				// 获取区
				// console.log(this.newProvinceDataList[2][this.multiIndex[2]])
				this.select = `${this.newProvinceDataList[0][this.multiIndex[0]]}--${this.newProvinceDataList[1][this.multiIndex[1]]}--${this.newProvinceDataList[2][this.multiIndex[2]]}`
			},
			pickerColumnchange(e){
				// 第几列滑动
				// console.log(e.detail.column);
				// 第几列滑动的下标
				// console.log(e.detail.value)
				// 第一列滑动
				if(e.detail.column === 0){
					this.multiIndex[0] =  e.detail.value
					// console.log('第一列滑动');
					// this.newProvinceDataList[1] = [];
					this.newProvinceDataList[1] = this.oldpProvinceDataList[this.multiIndex[0]].city.map((item,index)=>{
						// console.log(item)
						return item.name
					})
					// console.log(this.multiIndex)
					if(this.oldpProvinceDataList[this.multiIndex[0]].city.length === 1){
						this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[0].area.map((item,index)=>{
							// console.log(item)
							return item
						})
					}else{
						this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[this.multiIndex[1]].area.map((item,index)=>{
							// console.log(item)
							return item
						})
					}
					// 第一列滑动  第二列 和第三列 都变为第一个
					this.multiIndex.splice(1, 1, 0)
					this.multiIndex.splice(2, 1, 0)
				}
				// 第二列滑动
				if(e.detail.column === 1){
					this.multiIndex[1] =  e.detail.value
					// console.log('第二列滑动');
					// console.log(this.multiIndex)
					this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[this.multiIndex[1]].area.map((item,index)=>{
						// console.log(item)
						return item
					})
					// 第二列 滑动 第三列 变成第一个
					this.multiIndex.splice(2, 1, 0)
				}
				// 第三列滑动
				if(e.detail.column === 2){
					this.multiIndex[2] =  e.detail.value
					// console.log('第三列滑动')
					// console.log(this.multiIndex)
				}
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #EFE4C8;
	}

	.roundcenter {
		/* width: 686rpx;
		margin: 60rpx auto 0 auto;
		background: #f8f7f1;
		border: 2px solid #EFE4C8;
		border-radius: 50rpx; */
		
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
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 40rpx auto;
		text-align: center;
		background-color: #97cdff;
	}
	.msgbutton {
		width: 200rpx;
		line-height: 70rpx;
		color: #474747;
		font-size: 21rpx;
		font-weight: 700;
		text-align: center;
		background-color: #97cdff;
		float: right;
	}
</style>

