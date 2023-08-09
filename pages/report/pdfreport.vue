<template>
	<view>
		<view class="report combg">
			<view><uni-icons type="checkbox" size="100" style="margin-left: 30%;" color="#66f06f"></uni-icons></view>
			<view style="text-align: center;"><text>该测试已完成，点击确定开始加载报告</text></view>
			<view style="display: flex;">
				<button class="savebutton" @click="viewReport">确定</button>
				<button class="savebutton" @click="toIndex">返回首页</button>
			</view>
		</view>
		</view>
	</view>
</template>
<script>
	export default {
		onUnload(options) {
			this.toIndex()
			return true;
		},
		created: function() {
			var aDate = new Date();
			this.date = aDate.getFullYear() + "年" + (aDate.getMonth() + 1) + "月" + aDate.getDate() + "日";
		},
		onLoad: function(option) {
			if (option.pdfUrl) {
				this.pdfUrl = decodeURIComponent(decodeURIComponent(option.pdfUrl))
			}
		},
		data() {
			return {
				pdfUrl: '',
			}
		},
		methods: {
			toIndex(){
				uni.switchTab({
					url:  '/pages/index/indexNew',
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				});
			},
			viewReport(){
				console.log('pdfUrl',this.pdfUrl)
				uni.showLoading({
					title: '报告加载中...',
				})
				wx.downloadFile({	
					url:this.pdfUrl,
					success:function(resinfo){
						uni.hideLoading()
						let path = resinfo.tempFilePath;
						wx.openDocument({
							filePath:path,
							fileType:'pdf',
							showMenu:true,
							success:function(rest){
								console.log('打开文件成功')
								console.log(rest);
							},
							fail:function(error){
								wx.showToast({
									icon:'none',
									title:'打开文件失败'
								})
							}
						})
					},
					fail:function(err){
						console.log('fail')
						console.log(err)
						wx.showToast({
							icon: 'none',
							title: '下载文件失败'
						})
					}
				})
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
		width: 222rpx;
		line-height: 80rpx;
		color: #594e3f;
		font-size: 32rpx;
		font-weight: 700;
		margin: 100rpx auto;
		text-align: center;
		/* background: url(@/static/savebtn.png) no-repeat 50%/100%; */
		background-color: #77beff;
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
