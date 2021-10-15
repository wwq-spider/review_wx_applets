<template>
	<view>
	 	<!-- <view class="usertop combg">
			<view class="userimg">
				<image class="avatar" src="@/static/user.png"></image>
				<view class="righttext">
					<view class="title">{{user.name}}</view>
					<view class="datetime">评估时间：{{date}}</view>
				</view>
			</view>
			<view class="detail">
				<view class="detaill">
					<view><text class="gray">性别：</text>{{user.sex}}</view>
				</view>
				<view class="detaill">
					<view><text class="gray">年龄阶段：</text>{{user.age}}</view>
				</view>
			</view>
			<view class="detail">
				<view class="detaill">
					<view><text class="gray">手机：</text>{{user.tel}}</view>
				</view>
			</view>
		</view> -->
		<view class="report combg">
			<view class="listtitle">
				<image class="titlea" src="@/static/titlec.png"></image><text>测评报告</text>
			</view>
			<view class="subtitle">您的报告已生成，有问题可以咨询老师哟</view>
			<view class="charts-box">
				<view class="reportItem">
					<view class="title">测评名称：</view>
					<view class="_subtitle">{{classTitle}}</view>
				</view>
				<view class="reportItem">
					<view class="title">测评得分：</view>
					<view class="_subtitle">{{reviewResult.gradeTotal}}</view>
				</view>
				<view class="varItem" v-if="resArr.length > 0" style="margin-top: 20px;">
					<view class="title" style="width: 32%; text-align: center;">测评因子</view>
					<view class="title" style="width: 32%; text-align: center;">得分</view>
					<view class="title" style="width: 32%; text-align: center;">结果</view>
					<!-- <view class="title" style="width: 100%;">详细结果：</view><view class="_subtitle"><u-parse :html="reviewResult.reviewResult"></u-parse></view> -->
				</view>
				<view class="varItem"  v-for="result in resArr">
					<view class="title" style="width: 38%; text-align: left;">{{result.varName}}</view>
					<view class="title" style="width: 20%; text-align: center;">{{result.grade}}</view>
					<view class="_subtitle" style="width: 38%; text-align: center;">{{result.explain}}</view>
				</view>
			</view>
			
			<view class="savebutton" @click="restart">重新评测</view>
		</view>
		<!-- <view class="organization combg">
			<view class="organizationtitle">
				<image src="@/static/organ.png"></image>
				<text>筑心康</text>
			</view>
			<view class="savebutton" @click="restart">重新评测</view>
		</view> -->
	</view>
</template>
<script>
	export default {
		onUnload(options) {
			if(this.source != "1") {
				uni.switchTab({
					url:  '/pages/index/index',
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				});
			}
			return true;
		},
		created: function() {
			var aDate = new Date();
			this.date = aDate.getFullYear() + "年" + (aDate.getMonth() + 1) + "月" + aDate.getDate() + "日";
		},
		onLoad: function(option) {
			if(option.source) {
				this.source = option.source
			}
			if(option.title) {
				this.classTitle = decodeURIComponent(option.title)
			}
			let resultId = option.resultId
			let that = this
			this.$apis.postReportDetail({"resultId": resultId}).then(res => {
				if(res.code == 200) {
					that.resArr = []
					that.reviewResult = res.result
					if(res.result && res.result.reviewResult) {
						let arr = res.result.reviewResult.split("<br>")
						arr.forEach((item, index) => {
							let row = {}
							let a = item.indexOf("得分:")
							row["varName"] = item.substring(0, a)
							row["grade"] = item.substring(a + 3, item.indexOf(";"))
							row["explain"] = item.substring(item.indexOf("结果:")+3)
							that.resArr.push(row)
						})
					}
				} else {
					uni.showToast({
						title: res.msg
					})
				}
			})
		},
		data() {
			return {
				resArr: [],
				source: '',
				reviewResult: {},
				classTitle: '',
				user: {
					name: '',
					sex: '',
					age: '',
					tel: ''
				},
			}
		},
		methods: {
			//methods方法
			toback(){
				uni.navigateTo({
					url:  '/pages/index/index'
				});
			},
			restart(){
				uni.switchTab({
					url:  '/pages/index/index',
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				});
			}
		}
	}
</script>

<style>
	.page {
		background-color: #EFE4C8;
	}

	.userimg {
		display: flex;
	}

	.userimg image {
		width: 110rpx;
		height: 110rpx;
	}

	.righttext {
		margin-left: 24rpx;
	}

	.righttext .title {
		font-size: 32rpx;
		color: #594e3f;
		margin-bottom: 28rpx;
	}

	.righttext .datetime {
		color: #857f77;
		font-size: 26rpx;
	}

	.detail {
		padding: 0 20rpx;
		color: #594e3f;
		font-size: 30rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		margin: 30rpx auto;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}

	.detail .gray {
		color: #857f77;
		margin-right: 10rpx;
	}

	.subtitle {
		font-size: 26rpx;
		color: #c4bfb8;
		margin: 20rpx auto;
	}

	.navtitle {
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		font-size: 15px;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		color: #594e3f;
	}

	.navtitle .verticalline {
		width: 3px;
		height: 14px;
		background: #ffc92a;
		border-radius: 2px;
		margin-right: 7px;
	}

	.navtitle .state {
		padding: 0 10px;
		line-height: 22px;
		border-radius: 4px;
		font-size: 13px;
		text-align: center;
		margin-left: 10px;
	}

	.navtitle .onstate0 {
		background: #00e315;
	}

	.navtitle .onstate1 {
		background: #ffe902;
	}

	.navtitle .onstate2 {
		background: #ffbc11;
	}

	.navtitle .onstate3 {
		background: #ff6928;
	}

	.rate {
		margin-bottom: 20rpx;
	}

	.reportc .fff {
		color: #FF6928;
		font-weight: bold;
	}

	.charts-box {
		width: 100%;
		/* height: 400rpx; */
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
		line-height: 80rpx;
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 40rpx auto;
		text-align: center;
		/* background: url(@/static/savebtn.png) no-repeat 50%/100%; */
		background-color: #EFE4C8;
	}
	
	.title {
		color: #594e3f;
		font-size: 30rpx;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 1; //可设置显示的行数
		 line-clamp: 1;
		 -webkit-box-orient: vertical;
		 width: 25%;
	}
	
	._subtitle {
		font-size: 30rpx;
		color: #857f77;
		/* margin: 20rpx 0 20rpx 0;
		line-height: 1.6; */
		text-overflow: -o-ellipsis-lastline;
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 5; //可设置显示的行数
		 line-clamp: 5;
		 -webkit-box-orient: vertical;
		 width: 70%;
	}
	.reportItem {
		display: flex; 
		justify-content: flex-start; 
		flex-flow: wrap row; 
		width: 100%; 
		margin: 20rpx auto;
	}
	.varItem {
		display: flex; 
		justify-content: flex-start; 
		flex-flow: wrap row; 
		width: 100%; 
		margin: 10rpx auto;
		border-bottom: 1px solid #d6b477;
		
	}
</style>
