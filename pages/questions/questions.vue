<template>
	<view>
		<view class="questionprogress combg">
			<view v-if="classCount > 0" style="text-align: center; color: #d89c4f; margin-bottom: 10px;">量表: {{firstfloorindex}}/{{classCount}}</view>
			<view class="conttop">
				<view class="conttopl">
					<u-icon name="clock" color="#EFE4C8" size="20" class="uicon"></u-icon>
					<text>题目进度: ({{secondfloorindex+1}}/{{questiondata.length}})</text>
				</view>
			</view>
			<view class="progress-box">
				<u-line-progress active-color="#EFE4C8" :percent="secondfloorper"></u-line-progress>
			</view>
			<!-- <view class="btitle">{{capitalindex[firstfloorindex]}}、{{qdata[firstfloorindex].title}}</view>
			<view class="progress-box">
				<u-line-progress active-color="#febd00" :percent="firstfloorper"></u-line-progress>
			</view> -->
		</view>

		<view class="questest combg">
			<view class="title">
			<text v-if="questiondata.length > 0">{{secondfloorindex+1}}、{{questiondata[secondfloorindex].content}}</text>
			<text v-else>题目加载中</text>
			</view>
			<view class="listitem" :class="{'active':item.answerchecked}" 
				@click="answerclick(item)"
				v-for="(item,index) in items" 
				:key="item.selectContent">
				{{ item.selCode }}. {{ item.selectContent }}
			</view>
			<!-- <view class="texttip">{{secondfloorindex+1}}/{{questiondata.length}}</view> -->
		</view>

		<view class="back" v-on:click="back" v-show="secondfloorindex">
			<u-icon name="play-left-fill" color="#ffe18a" size="28" class="uicon"></u-icon><text>返回上一题</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstfloorindex: 0,
				secondfloorindex: 0,
				capitalindex: ["一", "二", "三", "四", "五", "六"],
				questiondata: [],
				lock: false,
				title: '',
				source: '',
				curTimeStamp: 0,
				classCount: 0
			}
		},
		onUnload() {
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
		},
		onLoad(e) {
			this.firstfloorindex = this.getNextIndex(e.classId, true)
			this.secondfloorindex = 0
			this.cursor = 0
			const that = this
			if(e.source) {
				this.source = e.source
			}
			if (e.title){
				this.title = decodeURIComponent(e.title)
			}
			
			this.loadData(e.classId)
		},
		methods: {
			//加载数据
			loadData(classId, classTitle) {
				uni.setNavigationBarTitle({
					title: classTitle
				})
				uni.showLoading({
					title: "数据加载中"
				})
				let that = this
				this.$apis.postQuestions({'classId': classId}).then(res => {
					uni.hideLoading()
					that.questiondata = res.rows
				})
			},
			//点击选项
			answerclick: function(option) {
				if (this.lock) {
					console.log("lock is true now return")
					return
				}
				if (!option) {
					return
				}
				this.lock = true
				let curQuestion = this.questiondata[this.secondfloorindex]
				try {
					//console.log("num=" + this.secondfloorindex + "&selCode=" + option.selCode + "&selectGrade=" + option.selectGrade)
					if(option.selCode) {
						curQuestion["selCode"] = option.selCode;
					}
					if(option.selectGrade) {
						curQuestion["selectGrade"] = option.selectGrade;
					}
					var eachanswers = curQuestion.selectList
					var havechecked = eachanswers.some(function(item) {
						return item.answerchecked == true
					});
					if (havechecked) {
						eachanswers.map(function(item) {
							item.answerchecked = false
							return item
						})
					}
					option.answerchecked = true
				} catch (e) {
				   console.log(e)
				}
				let that = this
				setTimeout(() => {
					if (this.secondfloorindex < this.questiondata.length - 1) {
						this.secondfloorindex++;
						that.lock = false
					} else {
						uni.showLoading({
							title: '测评完成，正在生成报告，请稍等'
						})
						var resultList = [];
						let projectId = uni.getStorageSync("projectId")
						if(!projectId) {
							projectId = 0
						}
						for (var i = 0; i < this.questiondata.length; i++) {
							var q = this.questiondata[i]
							var obj = {
								'selectGrade': q.selectGrade, 
								'content': q.content, 
								'questionId': q.questionId, 
								'questionNum': q.questionNum, 
								'selCode': q.selCode, 
								'variateId': q.variateId, 
								'variateName': q.variateName, 
								'classId': q.classId,
								'projectId': projectId
							}
							resultList.push(obj)
						}
						//提交测评数据 
						this.$apis.postCompleteReview(resultList).then(res => {
							that.lock = false
							uni.hideLoading()
							if (res.code == 200) {
								uni.showToast({
									title: '测评完成，报告已生成',
									icon: 'right'
								});
								that.finished(curQuestion.classId, that.title)
								// uni.navigateTo({
								// 	url: '/pages/report/report?resultId=' + res.result.resultId + "&title=" + that.title
								// });
							} else {
								uni.showToast({
									title: '测评报告生成失败',
									icon: 'wrong'
								});
							}
						}).catch(err => {
							uni.hideLoading()
							that.lock = false
							console.log(err)
						})
					}
				}, 300);
			},
			getNextIndex: function(classId, last) {
				let projectClass = uni.getStorageSync("projectClass")
				let a = -1
				if (projectClass) {
					this.classCount = projectClass.length
					//获取下一个测评量表
					for (let i=0; i < projectClass.length; i++) {
						let reviewClass = projectClass[i]
						if(reviewClass.classId == classId && i < projectClass.length -1){
							a = i + 1
							break
						}
						if (last && reviewClass.classId == classId && i == projectClass.length -1) {
							return i + 1
						}
					}
				}
				return a
			},
			finished: function(classId, title) { //完成测评处理
				let projectClass = uni.getStorageSync("projectClass")
				let a = this.getNextIndex(classId, false)
				//跳到下一个量表测试
				if (a > -1) {
					//提示
					uni.showToast({
						title: "测评完成，即将进入下一个量表测试",
						duration: 2000
					})
					let nextInfo = projectClass[a]
					this.questiondata = []
					this.secondfloorindex = 0
					//跳到完成页面
					uni.redirectTo({
						url: '/pages/report/guide?classId=' + nextInfo.classId
					})
					//this.loadData(reviewClass.classId, reviewClass.title)
				} else {
					//跳到完成页面
					uni.redirectTo({
						url: '/pages/report/finished?classId=' + classId + "&title=" + title
					})
				}
			},
			back: function() {
				this.secondfloorindex--;
			}
		},
		computed: {
			secondfloorper: function() {
				return parseInt((((this.secondfloorindex + 1) / (this.questiondata.length))
					.toFixed(2) * 100));
			},
			items: function() {
				if (this.questiondata.length > 0) {
					return this.questiondata[this.secondfloorindex].selectList;
				}
				return []
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #EFE4C8;
	}

	.conttop {
		display: flex;
		justify-content: space-between;
	}

	.conttopl text {
		vertical-align: middle;
		padding-left: 8rpx;
	}

	.progress-box {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.back {
		text-align: center;
	}

	.back text {
		vertical-align: middle;
		color: #7b5c00;
	}


	.questest .title {
		font-size: 32rpx;
		color: #594e3f;
		font-weight: 700;
		margin-bottom: 56rpx;
	}

	.questest .listitem {
		width: 622rpx;
		line-height: 88rpx;
		font-size: 28rpx;
		color: #706659;
		margin: 40rpx auto;
		background: #f5f5f7;
		border-radius: 20rpx;
		text-align: center;
	}

	.questest .listitem.active {
		background: #EFE4C8;
	}


	.questest .texttip {
		font-size: 28rpx;
		color: #594e3f;
		text-align: center;
	}

	.back {
		padding-top: 60rpx;
		padding-bottom: 120rpx;
	}
</style>
