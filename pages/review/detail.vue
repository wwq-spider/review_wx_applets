<template>
	<view>
	<view class="article">
		<!-- <view class="article-title">{{title}}</view>
		<uni-list :border="false">
			<uni-list-item thumbSize="lg" :thumb="data.author_avatar">
				通过body插槽定义作者信息内容
				<template v-slot:body>
					<view class="header-content">
						<view class="uni-title">{{data.author_name}}</view>
						<view class="uni-note">更新于 {{data.last_modify_date}} </view>
					</view>
				</template>
				<template v-slot:footer>
					<view class="footer">
						<button class="footer-button">关注</button>
					</view>
				</template>
			</uni-list-item>
		</uni-list> -->
		<view class="banner">
			<!-- 文章开头，缩略图 -->
			<image class="banner-img" :src="reviewClass.bannerImg || defaultCover" @error="imageError()" mode="widthFix"></image>
			<!-- 文章摘要 -->
			<view class="banner-title">
				<view class="uni-ellipsis">{{reviewClass.title}}</view>
				<view style="display: flex; font-size: 13px;">
					<span class="iconfont" style="color: #dc7a54;font-size: 13px;">&#xe606;活动价:{{reviewClass.orgPrice}}</span>
					<text style="margin-left: 10px;">原价：10.00</text>
				</view>
			</view>
		</view>
		<view class="article-content">
			<rich-text :nodes="reviewClass.guide" style="font-size: 14px;line-height: 1.8;color:#333"></rich-text>
		</view>
	</view>
	<view class="organization">
		<view class="savebutton" style="margin-left: 120px;" @click="buy">立即购买</view>
		<view class="savebutton" @click="beginTest">开始评测</view>
	</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				// 当前显示 _id == "60fa38e79c77390001e2b3a7" ,只做演示使用，可通过详情页传递id过来
				id: "",
				title:'',
				// 查询字段，多个字段用 , 分割
				field: 'title,author_avatar,author_name,author_name,last_modify_date,cover,excerpt,content',
				formData: {
					noData: '<p style="text-align:center;color:#666">详情加载中...</p>'
				}, 
				reviewClass: {},
				defaultCover: '../../static/default_cover.jpeg',
			}
		},
		computed:{
			//拼接where条件
			//查询条件 ,更多详见 ：https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery
			where(){
				console.log(this.id);
				return `_id =="${this.id}"`
			}
		},
		onLoad(event) {
			//获取真实id，通常 id 来自上一个页面
			if(event.classId){
				this.id = event.classId
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
			// 开始加载数据，修改 where 条件后才开始去加载 clinetDB 的数据 ，需要等组件渲染完毕后才开始执行 loadData，所以不能再 onLoad 中执行
			if(this.id){// ID 不为空，则发起查询
				//加载详情数据
				this.loadData()
			}else{
				uni.showToast({
					icon:'none',
					title:'出错了，测评量表ID为空'
				})
			}
		},
		methods: {
			loadData() {
				let that = this
				if(!this.id || this.id == "") {
					uni.showToast({
						title: "测评量表ID为空"
					})
					return
				}
				uni.showLoading({
					title: "数据加载中"
				})
				this.$apis.postReviewClassDetail({'classId': this.id}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						that.reviewClass = res.result
						if(that.title == '' && that.reviewClass.title){
							that.title = that.reviewClass.title
							uni.setNavigationBarTitle({
								title: that.title
							})
						}
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				
				})
			},
			imageError() {
				this.reviewClass.bannerImg = this.defaultCover 
			},
			buy() {
				
			},
			beginTest() {
				
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

	.banner {
		position: relative;
		margin: 0 15px;
		height: 180px;
		overflow: hidden;
	}

	.banner-img {
		position: absolute;
		width: 100%;
	}

	.banner-title {
		/* display: flex; */
		align-items: center;
		position: absolute;
		padding: 5px 10px;
		width: 100%;
		bottom: 0;
		/* height: 30px; */
		font-size: 14px;
		color: #fff;
		/* background: rgba(0, 0, 0, 0.4); */
		background: rgb(111 108 108 / 40%);
		/* overflow: hidden; */
		box-sizing: border-box;
	}

	.uni-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
	}

	.article-content {
		padding: 15px;
		font-size: 15px;
		overflow: hidden;
	}
	
	.organization {
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #dcd6d6;
		padding: 15rpx;
		/* margin: 30rpx auto; */
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
		width: 25%;
		line-height: 80rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: 700;
		/* margin: 100rpx auto; */
		text-align: center;
		/* background: url(@/static/savebtn.png) no-repeat 50%/100%; */
		background-color: #d0b074;
		border-radius: 6px !important;
	}
</style>
