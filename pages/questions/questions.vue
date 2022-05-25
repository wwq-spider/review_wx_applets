<template>
	<view>
		<camera device-position="front" @error="error" style="width: 0px; height: 0px" v-if="showCamera"></camera>
		<view class="questionprogress combg">
			<view v-if="classCount > 0" style="text-align: center; color: #d89c4f; margin-bottom: 10px;">量表: {{firstfloorindex}}/{{classCount}}</view>
			<view class="conttop">
				<view class="conttopl">
					<u-icon name="clock" color="#EFE4C8" size="20" class="uicon"></u-icon>
					<text>题目进度: ({{questionIndex+1}}/{{questionList.length}})</text>
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
			<text v-if="questionList.length > 0">{{questionIndex+1}}、{{questionList[questionIndex].content}}</text>
			<text v-else>题目加载中1</text>
			</view>
			<!--单选题-->
			<view v-if="questionList[questionIndex].questionType=='1'">
				<view class="listitem" :class="{'active':item.answerchecked}"
					@click="answerclick(item)"
					v-for="(item,index) in items" 
					:key="item.selectContent">
					{{ item.selCode }}. {{ item.selectContent }}
				</view>
			</view>
			<!--问答题-->
			<view v-if="questionList[questionIndex].questionType=='2'">
				<textarea placeholder-style="color:#969592" style="border: 1rpx solid #EFE4C8; width: 100%; border-radius: 10px;" 
				placeholder="请输入答案" v-model="questionList[questionIndex].rightAnswer"/>
			</view>
			<!--多选题-->
			<checkbox-group @change="mulSelChange"  v-if="questionList[questionIndex].questionType=='3'">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.selCode">
					<view>
						<checkbox :value="item.selCode" :checked="item.answerchecked" color="#D0B074"/>
					</view>
					<view style="font-size: 15px; color: #D0B074;">{{item.selCode}}.{{item.selectContent}}</view>
				</label>
			</checkbox-group>
			
			<!-- <view class="texttip">{{questionIndex+1}}/{{questionList.length}}</view> -->
		</view>
		<view style="display: flex; width: 60%; margin-left: 25%;">
			<view class="back" v-on:click="back" v-show="questionIndex">
				<u-icon name="play-left-fill" color="#ffe18a" size="28" class="uicon"></u-icon><text>返回上一题</text>
			</view>
			<view class="back" style="margin-left: 20px;" v-on:click="nextQuestion" 
				v-show="(questionList[questionIndex].questionType=='2' || questionList[questionIndex].questionType=='3') && questionIndex < questionList.length - 1">
				<text>下一题</text><u-icon name="play-right-fill" color="#ffe18a" size="28" class="uicon"></u-icon>
			</view>
			<view class="back" style="margin-left: 10px;" v-show="questionIndex == questionList.length - 1">
				<button class="savebutton" @click="submit" :disabled="lock">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstfloorindex: 0,
				questionIndex: 0,
				capitalindex: ["一", "二", "三", "四", "五", "六"],
				questionList: [],
				lock: false,
				title: '',
				source: '',
				curTimeStamp: 0,
				classCount: 0,
				classId: '',
				videoAnalysis: false,
				monitorTimer: {},
				healthAnalysisResult: {},
				showCamera: false,
				cameraContext: {},
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
			//清理定时器
			if (this.videoAnalysis) {
				this.closeCamera()
				clearTimeout(this.monitorTimer)
			}
		},
		onLoad(e) {
			this.classId = e.classId
			this.firstfloorindex = this.getNextIndex(e.classId, true)
			this.questionIndex = 0
			this.cursor = 0
			const that = this
			if(e.source) {
				this.source = e.source
			}
			if (e.title){
				this.title = decodeURIComponent(e.title)
			}
			this.loadData(e.classId)
			this.videoAnalysis = e.videoAnalysis && e.videoAnalysis == 1
			if (this.videoAnalysis) { //要进性视频监控分析
				let that = this
				uni.showModal({
					title: '提示',
					content: '测评过程中将通过视频监测您的心率变化，请认真做答',
					icon: 'none',
					mask: true,
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							that.showCamera = true
							that.cameraContext = uni.createCameraContext()
							setTimeout(function() {
								that.startRecord()
							}, 1000)
							
						}
					}
				})
			}
		},
		methods: {
			startRecord() {
				let that = this
				this.cameraContext.startRecord({
					success: function(res) {
						console.log("question startRecord success:" + JSON.stringify(res))
						that.videoMonitor()
					},
					fail: function(err) {
						console.log("question startRecord fail，", err)
						uni.showToast({
							title: '摄像头开启失败',
							icon: 'none'
						})
						
					}
				})
			},
			//视频监控
			videoMonitor() {
				console.log("videoMonitor begin....")
				let that = this
				this.monitorTimer = setTimeout(function(){
					that.executeAnalysis()
				}, 16000)
			},
			//视频分析
			executeAnalysis() {
				console.log("executeAnalysis begin ----")
				let userData = uni.getStorageSync('userData')
				let projectId = uni.getStorageSync("projectId")
				let that = this
				this.cameraContext.stopRecord({
					success: function(res) {
						console.log("question stopRecord success: ", res)
						//上传视频文件
						uni.uploadFile({
							url: that.$apis.analysisVideoUrl,
							filePath: res.tempVideoPath,
							fileType: 'video',
							name: 'file',
							formData: {'classId': that.classId, 'projectId': projectId},
							header:{"Content-Type": "multipart/form-data", "userId": userData.userId},
							success: (res) => {
								console.log('question videoAnalysis success, res is:', res)
								if(res.statusCode == 200) {
									let data = JSON.parse(res.data)
									if(data.code == 200) {
										let resultObj = data.result
										if(resultObj.healthStatus == 1) {
											let oldResult = uni.getStorageSync("healthAnalysisResult")
											let newResult = resultObj.healthAnalysisResult.result
											//计算变化率
											let oldHr = oldResult.hr
											let newHr = newResult.hr
											let diffRate = Math.abs(newHr - oldHr) / oldHr
											console.log("oldHr: " + oldHr + ", newHr: " + newHr + ", diffRate=" + diffRate)
											if (diffRate >= 0.15) {
												uni.showModal({
													title: '提示',
													content: '您测评过程中的心率变化超过15%，请认真做答',
													showCancel: false,
													success: function (res) {
														if (res.confirm) {
															that.startRecord()
														}
													}
												})
												return
											}
											that.startRecord()
											return
										}
									}
								}
								uni.showModal({
									title: '提示',
									content: '请确保测评过程中摄像头对准脸部',
									showCancel: false,
									success: function (res) {
										if (res.confirm) {
											that.startRecord()
										}
									}
								})
							},
							fail: (err) => {
								console.log('videoAnalysis fail', err)
								that.startRecord()
							}
						})
					},
					fail: function(err) {
						that.startRecord()
						console.log("stopRecord fail:", err)
					}
				})
			},
			error(e) {
				console.log(e.detail)
			},
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
					that.questionList = res.rows
				})
			},
			//下一题
			nextQuestion() {
				let curQuestion = this.questionList[this.questionIndex]
				if(curQuestion.questionType=='2' && (!curQuestion.rightAnswer || curQuestion.rightAnswer == '')) {
					uni.showToast({
						title: "请输入答案",
						icon: "none"
					})
					return
				}
				//多选题
				if(curQuestion.questionType=='3') {
					let checked = false
					for (let i=0; i < this.items.length; i++) {
						if(this.items[i].answerchecked) {
							checked = true
							break
						}
					}
					if(!checked) {
						uni.showToast({
							title: "请选择答案",
							icon: "none"
						})
						return
					}
				}
				this.questionIndex++;
			},
			closeCamera() {
				this.cameraContext.stopRecord({})
				this.showCamera = false
				uni.removeStorageSync("healthAnalysisResult")
			},
			//提交问题
			submit() {
				//清理定时器
				if (this.videoAnalysis) {
					this.closeCamera()
					clearTimeout(this.monitorTimer)
				}
				let curQuestion = this.questionList[this.questionIndex]
				if(curQuestion.questionType == '1') {
					var havechecked = false
					let curItem = {}
					for (let i=0; i<curQuestion.selectList.length; i++) {
						curItem = curQuestion.selectList[i]
						if(curItem.answerchecked) {
							havechecked = curItem.answerchecked
							break;
						}
					}
					if(!havechecked) {
						uni.showToast({
							title: "请选择答案",
							icon: "none"
						})
						return;
					} else {
						this.answerclick(curItem)
					}
				} else if(curQuestion.questionType == '2') {
					if(!curQuestion.rightAnswer || curQuestion.rightAnswer == '') {
						uni.showToast({
							title: "请填写答案",
							icon: "none"
						})
						return;
					} else {
						//提交数据
						this.answerclick({"selCode": ""})
					}
				}
			},
			//多选框
			mulSelChange: function(option) {
				let curQuestion = this.questionList[this.questionIndex]
				var selCodes = option.detail.value
				let selGrades = 0
				for (var i = 0, lenI = this.items.length; i < lenI; ++i) {
					const item = this.items[i]
					if(selCodes.includes(item.selCode)){
						this.$set(item,'answerchecked',true)
						selGrades += parseFloat(item.selectGrade)
					} else {
						this.$set(item,'answerchecked',false)
					}
				}
 				curQuestion["selCode"] = selCodes.join(",")
				curQuestion["selectGrade"] = selGrades
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
				let curQuestion = this.questionList[this.questionIndex]
				if(curQuestion.questionType == '1') {
					try {
						//console.log("num=" + this.questionIndex + "&selCode=" + option.selCode + "&selectGrade=" + option.selectGrade)
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
				}
				let that = this
				setTimeout(() => {
					if (this.questionIndex < this.questionList.length - 1) {
						this.questionIndex++
						that.lock = false
					} else {
						uni.showLoading({
							title: '测评完成，提交中',
						})
						var resultList = []
						let projectId = uni.getStorageSync("projectId")
						if(!projectId) {
							projectId = 0
						}
						for (var i = 0; i < this.questionList.length; i++) {
							var q = this.questionList[i]
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
							if(q.rightAnswer) {
								obj["rightAnswer"] = q.rightAnswer
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
								that.finished(res.result.classId, res.result.resultId, that.title)
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
				}, 300)
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
			finished: function(classId, resultId, title) { //完成测评处理
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
					this.questionList = []
					this.questionIndex = 0
					//跳到完成页面
					uni.redirectTo({
						url: '/pages/report/guide?classId=' + nextInfo.classId
					})
					//this.loadData(reviewClass.classId, reviewClass.title)
				} else {
					//跳到完成页面
					uni.redirectTo({
						url: '/pages/report/finished?classId=' + classId + "&resultId=" + resultId + "&title=" + title
					})
				}
			},
			back: function() {
				this.questionIndex--;
			}
		},
		computed: {
			secondfloorper: function() {
				return parseInt((((this.questionIndex + 1) / (this.questionList.length))
					.toFixed(2) * 100));
			},
			items: function() {
				if (this.questionList.length > 0) {
					return this.questionList[this.questionIndex].selectList;
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
		width: 40%;
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
		/* float: left; */
	}
	
	.savebutton {
		width: 150rpx;
		/* line-height: 90rpx; */
		color: #594e3f;
		font-size: 32rpx;
		/* font-weight: 700; */
		/* margin: 40rpx auto; */
		text-align: center;
		/* background: url(../../static/background.png) no-repeat 50%/100%; */
		background-color: #ffe18a;
	}
	
	.uni-list-cell {
	    justify-content: flex-start
	}
</style>
