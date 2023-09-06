<template>
	<view>
		<view class="report combg">
			<view class="title">{{reviewClass.title}}</view>
			<view class="_subtitle">{{reviewClass.guide}}</view>
			<view class="savebutton" @click="startTest">进入测试</view>
		</view>
	</view>
</template>
<script>
	export default {
		created: function() {
			var aDate = new Date();
			this.date = aDate.getFullYear() + "年" + (aDate.getMonth() + 1) + "月" + aDate.getDate() + "日";
		},
		onLoad: function(option) {
			let that = this
			if(option.classId) { //分类id
				uni.showLoading({
					title: "数据加载中"
				})
				this.$apis.postReviewClassDetail({'classId': option.classId}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						that.reviewClass = res.result
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				
				})
			}
			if(option.userId){
				that.userId = option.userId
			}
			if(option.name){
				that.name = decodeURIComponent(decodeURIComponent(option.name))
			}
			if(option.sex){
				that.sex = option.sex
			}
			if(option.age){
				that.age = option.age
			}
			if(option.evalCode){
				that.evalCode = decodeURIComponent(decodeURIComponent(option.evalCode))
			}
			if(option.select){
				that.select = decodeURIComponent(decodeURIComponent(option.select))
			}
			if(option.school){
				that.school = decodeURIComponent(decodeURIComponent(option.school))
			}
			
		},
		data() {
			return {
				reviewClass: {},
				evalCode:'',
				select:'',
				school:'',
				userId:'',
				name:'',
				sex:'',
				age:''
			}
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url:  '/pages/index/index',
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				});
			},
			startTest(){
				let videoAnalysis = this.reviewClass.videoAnalysis
				//视频分析
				if (videoAnalysis == 1) { 
					uni.redirectTo({
						url: '/pages/review/video?classId=' + this.reviewClass.classId + "&title=" + this.reviewClass.title + "&source=1",
						success(res) {
							console.log(res)
						},
						fail(err) {
							console.log(err)
						}
					});
				} else {
					uni.redirectTo({
						url: '/pages/questions/questions?classId=' + this.reviewClass.classId + "&title=" + 
							this.reviewClass.title + "&source=1&videoAnalysis=" + this.reviewClass.videoAnalysis + "&evalCode=" + encodeURIComponent(this.evalCode) + "&select=" + this.select + "&school=" + this.school + "&userId=" + this.userId + "&name=" + this.name + "&sex=" + this.sex + "&age=" + this.age,
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
	}
</script>

<style>
	.page {
		background-color: #83bc51;
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
	
	.savebutton {
		width: 622rpx;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: 700;
		margin: 100rpx auto;
		text-align: center;
		background: #83bc51;
		border-radius: 20rpx;
		margin-bottom: 10rpx;
	}
	
	.title {	
		color: #594e3f;
		font-size: 40rpx;
		font-weight: 700;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //可设置显示的行数
		line-clamp: 1;
		-webkit-box-orient: vertical;
		width: 100%;
		text-align: center;
		margin-bottom: 20px;
	}
	
	._subtitle {
		font-size: 30rpx;
		color: #5a554e;
		/* margin: 20rpx 0 20rpx 0;
		line-height: 1.6; */
		 -webkit-box-orient: vertical;
		 width: 100%;
		 text-align: left;
	}
	.reportItem {
		display: flex; 
		justify-content: flex-start; 
		flex-flow: wrap row; 
		width: 100%; 
		margin: 20rpx auto;
	}
</style>
