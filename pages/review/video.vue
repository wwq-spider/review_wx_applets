<template>
	<view>
		<page-head :title="title"></page-head>
		<view>
			<camera device-position="front" @initdone="cameraInit" @error="error" :style="{width: cameraWidth, height: cameraHeight}" v-if="showCamera"></camera>
			<button  type="primary" @click="startRecord()" v-if="startShow" :disabled="!submitEnable">{{beginText}}</button>
			<view class="progress-box" v-if="showProgress">
				<progress :percent="secondfloorper" activeColor="#41a863" active stroke-width="20" active-mode="forwards"/>
				<!-- <u-line-progress active-color="#EFE4C8" :percent="secondfloorper"></u-line-progress> -->
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				startShow: false,
				cameraWidth: '100%',
				cameraHeight: '500px',
				endShow: false,
				submitEnable: true,
				endText: '提交',
				beginText: '开始录制',
				title: 'chooseVideo',
				classId: '',
				title: '',
				seconds: 0,
				stimer: {},
				showCamera: true,
				cameraContext: {},
				maxSeconds: 15,
				showProgress: false,
			}
		},
		computed: {
			secondfloorper: function() {
				let p = parseInt(((this.seconds / this.maxSeconds).toFixed(2) * 100))
				//console.log("secondfloorper: " + p)
				return p;
			}
		},
		onUnload() {
			this.closeCamera()
			clearTimeout(this.stimer)
		},
		onLoad(option) {
			this.cameraContext = wx.createCameraContext()
			uni.showLoading({
				title: '相机初始化中...'
			})
			this.classId = option.classId
			this.title = option.title
			let that = this
			
			uni.getSystemInfo({
				success: (res) => {
					console.log("getSystemInfo:", res)
					that.cameraHeight = (res.windowHeight - 50) + 'px'
				}
			})
		},
		methods: {
			closeCamera() {
				this.cameraContext.stopRecord({})
			},
			cameraInit(e) {
				let that = this
				uni.showModal({
					showCancel: false,
					title: '提示',
					content: '进入测评之前将录制一段基准视频，请保证脸部对准摄像头',
					success() {
						console.log('cameraInit......')
						uni.hideLoading()
						that.startShow = true
					}
				})
			},
			error(e) {
				console.log(e.detail)
			},
			//创建相机对象
			startRecord() {
				let that = this
				/**cameraContext.setZoom({
					zoom: 500,
					success: function(res) {
						console.log("setZoom success")
						console.log(res)
					},
					fail: function(err) {
						console.log("setZoom fail")
						console.log(err)
					}
				})*/
				this.cameraContext.startRecord({
					success: function(res) {
						console.log("startRecord success:", res)
						that.submitEnable = false
						that.startShow = false
						that.showProgress = true
						that.videoSecondInc()
						setTimeout(function() {
							that.stopRecord()
						}, 15000)
					},
					fail: function(err) {
						console.log("startRecord fail, ", err)
					}
				})
			},
			//创建相机对象
			stopRecord() {
				this.seconds = 0
				this.showProgress = false
				clearTimeout(this.stimer)
				
				//let cameraContext = uni.createCameraContext()
				let that = this
				let userData = uni.getStorageSync('userData')
				let projectId = uni.getStorageSync("projectId")
				console.log("begin stopRecord=====")
				try{
					this.cameraContext.stopRecord({
						compressed: true,
						success: function(res) {
							that.showCamera = false
							uni.showLoading({
								title: '视频分析中'
							})
							console.log("stopRecord success")
							wx.uploadFile({
								url: that.$apis.analysisVideoUrl,
								filePath: res.tempVideoPath,
								fileType: 'video',
								name: 'file',
								formData: {'classId': that.classId, 'projectId': projectId},
								header:{"Content-Type": "multipart/form-data", "userId": userData.userId},
								success: (res) => {
									uni.hideLoading()
									console.log('videoAnalysis success, res is:', res)
									if(res.statusCode == 200 ) {
										let data = JSON.parse(res.data)
										if(data.code == 200) {
											let resultObj = JSON.parse(res.data).result
											if(resultObj.healthStatus == 1) {
												//存储视频分析结果
												uni.setStorageSync("healthAnalysisResult", resultObj.healthAnalysisResult.result)
												uni.redirectTo({
													url: '/pages/questions/questions?classId=' + that.classId + "&title=" + that.title + "&source=1&videoAnalysis=1",
													success(res) {
														console.log(res)
													},
													fail(err) {
														console.log(err)
													}
												})
												return
											}
										} else {
											console.log("healthAnalysisResult error: " +  data.msg)
											uni.showToast({
												title: '服务器异常，请重试',
												icon: 'none'
											})
											that.showCamera = true
											that.submitEnable = true
											that.startShow = true
											return
										}
									}
									uni.showToast({
										title: '请确保摄像头对准脸部',
										icon: 'none'
									})
									that.showCamera = true
									that.submitEnable = true
									that.startShow = true
								},
								fail: (err) => {
									that.showCamera = true
									that.submitEnable = true
									that.startShow = true
									uni.hideLoading()
									console.log('videoAnalysis fail:'+ err);
									uni.showModal({
										content: err.errMsg,
										showCancel: false
									});
								}
							})
						},
						fail: function(err) {
							console.log("stopRecord fail, ", err)
							that.submitEnable = true
							that.startShow = true
							uni.hideLoading()
						},
						complete: function() {
							console.log("stopRecord complete......")
						}
					})
				}catch(e){
					console.log("stopRecord error, ", e)
				}
				console.log("end stopRecord=====")
			},
			//视频秒数增加
			videoSecondInc() {
				// if (this.seconds >= 15) {
				// 	this.stopRecord()
				// 	return
				// }
 				let that = this
				this.stimer = setTimeout(function() {
					that.seconds++
					return that.videoSecondInc()
				}, 1000)
			}
		}
	}
</script>

<style>
	.video {
		width: 100%;
	}

	.camera-tips {
		padding: 10rpx 30rpx;
	}
</style>