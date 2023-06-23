<template>
	<view>
		<view class="report combg">
			<!-- <view class="listtitle">
				<image class="titlea" src="@/static/titlec.png"></image><text>测评报告</text>
			</view>
			<view class="subtitle">您的报告已生成，有问题可以咨询老师哟</view> -->
			<!-- <view class="reportItem">
				<view class="title">测评名称：</view>
				<view class="_subtitle">{{classTitle}}</view>
			</view>
			<view class="reportItem">
				<view class="title">测评得分：</view>
				<view class="_subtitle">{{reviewResult.gradeTotal}}</view>
			</view> -->
			<uni-card :is-shadow="false" is-full>
				<text class="uni-h6">{{reportTips}}</text>
			</uni-card>
			<uni-card v-for="template in reportTemplateList" :title="template.title" :is-shadow="false" is-full >
				<text class="uni-body">{{template.explanation}}</text>
			</uni-card>
			
			<view class="subtitle" style="margin-top: 20px;">您本次测评的量表呈现结果</view>
			
			<!-- <view v-for="result1 in resArr1">
				<view><text class="uni-body">量表名称: {{result1.title}}</text></view>
				<uni-card v-for="result in resArr" :title="result.varName" :is-shadow="false" is-full>
					<view><text class="uni-body">测评结果: {{result.grade}}</text></view>
					<view><text class="uni-body">测评分数解读: {{result.explain}}</text></view>
				</uni-card>
			</view> -->
			<uni-card v-for="result in resArr" :title="result.varName" :is-shadow="false" is-full>
				<view><text class="uni-body">测评结果: {{result.grade}}</text></view>
				<view><text class="uni-body">测评分数解读: {{result.explain}}</text></view>
			</uni-card>
			

			<view v-if="projectId != 31" class="savebutton" @click="restart">重新评测</view>
		</view>
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
			if(option.projectId) {
				this.projectId = option.projectId
			}
			if(option.pCount) {
				this.pCount = option.pCount
			}
			if(option.limitId) {
				this.limitId = option.limitId
			}
			let resultId = option.resultId
			let classId = option.classId
			let that = this
			
			//查询报告模板
			this.$apis.postReportTemplateList({"classId": classId}).then(res => {
				if(res.code == 200) {
					that.reportTips = res.result.reportTips
					that.reportTemplateList = res.result.reportTemplateList
				} else {
					uni.showToast({
						title: res.msg
					})
				}
			})
			let zongfen = {}
			if(that.projectId != 0){
				let userData = uni.getStorageSync('userData')
				this.$apis.postReportDetail({"resultId": resultId,"userId": userData.userId,"projectId": that.projectId,"pCount":that.pCount,"limitId":that.limitId}).then(res => {
					if(res.code == 200) {
						res.result.forEach((item1) =>{
							if(item1.reviewResult){
								let arr = item1.reviewResult.split("<br>")
								arr.forEach((item, index) => {
									let row = {}
									let a = item.indexOf("得分:")
									row["varName"] = item.substring(0, a)
									row["grade"] = item.substring(a + 3, item.indexOf(";"))
									row["explain"] = item.substring(item.indexOf("结果:")+3)
									if(item.substring(0, a) == '总分'){
										zongfen["varName"] = item.substring(0, a)
										zongfen["grade"] = item.substring(a + 3, item.indexOf(";"))
										zongfen["explain"] = item.substring(item.indexOf("结果:")+3)
									}else{
										that.resArr.push(row)
									}
								})
								that.resArr.push(zongfen)
							}
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				})
			}else {
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
								if(item.substring(0, a) == '总分'){
									zongfen["varName"] = item.substring(0, a)
									zongfen["grade"] = item.substring(a + 3, item.indexOf(";"))
									zongfen["explain"] = item.substring(item.indexOf("结果:")+3)
								}else{
									that.resArr.push(row)
								}
							})
							if(JSON.stringify(zongfen) != '{}'){
								that.resArr.push(zongfen)
							}
						}
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				})
			}
			
		},
		data() {
			return {
				resArr: [],
				resArr1: [],
				source: '',
				reviewResult: {},
				classTitle: '',
				projectId: 0,
				pCount:'',
				user: {
					name: '',
					sex: '',
					age: '',
					tel: ''
				},
				reportTips: '',
				reportTemplateList: [],
				limitId:0
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
					url:  '/pages/index/indexNew',
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
		font-size: 30rpx;
		color: #1a89ff;
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
		background-color: #6cc4ff;
		margin-bottom: 10rpx;
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
	/* .report_combg {
		width: 93%;
		padding: 10rpx;
		margin: 10rpx auto;
		background: #fff;
		box-shadow: 0 40rpx 0 -22rpx rgb(105 100 87 / 14%), 0 -9rpx 0 0 rgb(105 100 87 / 14%) inset;
		border-radius: 50rpx;
		
	} */
</style>
