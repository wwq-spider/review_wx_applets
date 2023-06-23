<template>
	<view>
		<view class="article">
			<text class="article-title">{{notice.noticeName}}</text>
			<u-divider style="width: 100%; margin-top: 5px;"><text style="font-weight: bold;">{{updateTime}}</text></u-divider>
			<view class="article-content">
				<rich-text :nodes="notice.noticeDesc" style="font-size: 14px;line-height: 1.8;color:#333"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				notice: {},
				id: "",
				title: "",
				updateTime: ""
			}
		},
		computed:{
			
		},
		onLoad(event) {
			//获取真实id，通常 id 来自上一个页面
			if(event.id){
				this.id = event.id
			}
			//若上一页传递了标题过来，则设置导航栏标题
			if(event.title){
				this.title = event.title
				uni.setNavigationBarTitle({
					title:event.title
				})
			}
		},
		onReady() {
			if(this.id){// ID 不为空，则发起查询
				//加载详情数据
				this.loadData()
			}else{
				uni.showToast({
					icon:'none',
					title:'出错了，公告ID为空'
				})
			}
		},
		methods: {
			loadData() {
				let that = this
				if(!this.id || this.id == "") {
					uni.showToast({
						title: "公告ID为空"
					})
					return
				}
				uni.showLoading({
					title: "数据加载中"
				})
				this.$apis.postNoticeDetail({'id': this.id}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						that.notice = res.result
						that.formatDate()
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			formatDate() {
				let date = new Date(this.notice.updateTime)
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				this.updateTime = y + '-' + MM + '-' + d;
			}
		}
	}
</script>

<style>
	
	.header-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	/* 标题 */
	.uni-title {
		display: flex;
		margin-bottom: 5px;
		font-size: 14px;
		font-weight: bold;
		color: #3b4144;
	}

	/* 描述 额外文本 */
	.uni-note {
		color: #999;
		font-size: 12px;
	}

	.footer {
		display: flex;
		align-items: center;
	}

	.footer-button {
		display: flex;
		align-items: center;
		font-size: 12px;
		height: 30px;
		color: #fff;
		background-color: #ff5a5f;
	}

	.article-title {
		padding: 20px 15px;
		font-size: 16px;
		padding-bottom: 0;
		text-align: center;
		display: block;
		font-weight: bold;
		color: #333;
	}

	.article-content {
		padding: 15px;
		font-size: 15px;
		overflow: hidden;
	}
</style>
