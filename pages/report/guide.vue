<template>
	<view>
		<view class="report combg">
			<view class="title">{{reviewClass.title}}</view>
			<view class="_subtitle">{{reviewClass.guide}}</view>
			<view class="savebutton" @click="startTest">进入测试</view>
		</view>
		</view>
	</view>
</template>
<script>
	export default {
		// onUnload(options) {
		// 	console.log("onUnload===========")
		// 	this.toIndex()
		// 	return true;
		// },
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
		},
		data() {
			return {
				reviewClass: {},
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
				uni.redirectTo({
					url: '/pages/questions/questions?classId=' + this.reviewClass.classId + "&title=" + this.reviewClass.title + "&source=1",
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
	
	.savebutton {
		width: 622rpx;
		line-height: 80rpx;
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 100rpx auto;
		text-align: center;
		/* background: url(@/static/savebtn.png) no-repeat 50%/100%; */
		background-color: #EFE4C8;
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
