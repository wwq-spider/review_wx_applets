<template>
	<view>
		<view class="article-content">
			<view class="banner">
				<!-- 文章开头，缩略图 -->
				<image class="banner-img" :src="reviewClass.bannerImg || defaultCover" @error="imageError()" mode="aspectFit"></image>
				<!-- 文章摘要 -->
				<view class="banner-title">
					<view class="uni-ellipsis">{{reviewClass.title}}</view>
					<view style="display: flex; font-size: 13px;" v-if="charge">
						<span class="iconfont" style="color: #dc7a54;font-size: 13px;">活动价:&#xe606;{{reviewClass.realPrice}}</span>
						<span class="iconfont" style="margin-left: 20px; color: #857f77; font-size: 13px; text-decoration:line-through;">原价:&#xe606;{{reviewClass.orgPrice}}</span>
					</view>
				</view>
			</view>
			<view class="article-content" style="white-space:pre-wrap">
				<rich-text :nodes="reviewClass.classDesc" style="font-size: 12px;line-height: 1.8;color:#333"></rich-text>
			</view>
		</view>
		<view class="organization">
			<button class="savebutton" style="margin-left: 120px;" @click="buy" :disabled="reviewClass.buy" v-if="charge">{{buyBtnText}}</button>
			<button class="savebutton" @click="beginTest">开始评测</button>
		</view>
		
		<uni-popup ref="showPayConfirm" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">购买确认</text>
				<text class="uni-tip-content">量表名称：{{ reviewClass.title }}</text>
				<text class="uni-tip-content iconfont" style="color: #dc7a54;">量表价格：&#xe606;{{ reviewClass.realPrice }}</text>
				<view class="uni-tip-group-button">
					<button class="uni-tip-button" style="margin-right: 30px; background-color: #b7b5b2;" @click="cancel()">取消</button>
					<button class="uni-tip-button" @click="confirmBuy()" :loading="loading">确定</button>
				</view>
			</view>
		</uni-popup>
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
				loading: false,
				buyBtnText: "立即购买",
			}
		},
		computed:{
			//拼接where条件
			//查询条件 ,更多详见 ：https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery
			where(){
				console.log(this.id);
				return `_id =="${this.id}"`
			},
			charge() {
				return this.reviewClass.charge == 1
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
			//this.$refs.showshowPayConfirm.close()
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
						//that.reviewClass.bannerImg = that.$config.aliYunEndpoint + res.result.bannerImg
						that.reviewClass.bannerImg = res.result.bannerImg
						if(that.title == '' && that.reviewClass.title){
							that.title = that.reviewClass.title
							uni.setNavigationBarTitle({
								title: that.title
							})
						}
						if(that.reviewClass.buy) {
							that.buyBtnText = "已购买"
						}
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
			imageError() {
				this.reviewClass.bannerImg = this.defaultCover 
			},
			buy() {
				this.$nextTick(() => {
					this.$refs.showPayConfirm.open("center")
				})
				//this.$refs.showPayConfirm.open()
			},
			confirmBuy() {
				uni.showLoading({
					title: "数据加载中"
				})
				let that = this
				let pid = uni.getStorageSync("projectId")
				this.loading = true
				this.$apis.postCreatePrePayOrder({"classId": this.reviewClass.classId, "projectId": pid}).then(res => {
					uni.hideLoading()
					if(res.code == 200) {
						let preOrder = res.data
						if(preOrder && preOrder.prePayID) {
							if(preOrder.prePayID == "000") {
								that.buyBtnText = "已购买"
								that.reviewClass.buy = true
								uni.showToast({
								    title: "购买成功",
									icon: "success"
								})
								that.cancel()
								that.loading = false;
							} else {
								uni.requestPayment({
								    timeStamp: preOrder.timeStamp,
								    nonceStr: preOrder.nonceStr,
								    package: preOrder.packageStr,
								    signType: 'MD5',
								    paySign: preOrder.paySign,
								    success: (res) => {
										if(res && res.errMsg == "requestPayment:ok") {
											that.buyBtnText = "已购买"
											that.reviewClass.buy = true
											//更新订单状态
											that.$apis.postUpdOrderStatus({"payId": preOrder.prePayID, "status": 2, "orderAmount": that.reviewClass.realPrice}).then(res => {
												console.log(JSON.stringify(res))
											})
											uni.showToast({
											    title: "支付成功",
												icon: "success"
											})
										} else {
											uni.showToast({
											    title: "支付发起失败"
											})
										}
								    },
								    fail: (res) => {
								        uni.showModal({
								            content: "支付失败,原因为: " + res.errMsg,
								            showCancel: false,
								        })
								    },
								    complete: () => {
										that.cancel()
								        that.loading = false;
								    }
								})
							}
						} else {
							that.loading = false;
							that.cancel()
							uni.showToast({
								title: res.msg
							})
						}
					} else {
						that.loading = false;
						that.cancel()
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					that.loading = false;
					that.cancel()
					uni.hideLoading()
					console.log(JSON.stringify(err))
				})
			},
			cancel() {
				this.$refs.showPayConfirm.close()
			},
			beginTest() {
				if (!this.reviewClass) {
					uni.showToast({
					    title: "量表信息为空"
					})
				}
				//量表是否收费
				if(this.reviewClass.charge == 0 || (this.reviewClass.charge == 1 && this.reviewClass.buy)) {
					//如果是栋梁测试，先跳转测评码输入页面
					let dongliangClassId = '402880f082eecb960182eee3b1ef0001';
					let dongliangClassProId = '2c9cff928408eab3018413a00d8a006a';
					if(this.reviewClass.classId == dongliangClassId || this.reviewClass.classId == dongliangClassProId){
						//跳转到测评码输入页面
						uni.navigateTo({
							url: '/pages/review/testCode?classId=' + this.reviewClass.classId
						})
					}else{
						//跳转到当前量表
						uni.navigateTo({
							url: '/pages/report/guide?classId=' + this.reviewClass.classId
						})
					}
				} else {
					uni.showToast({
					    title: "用户未购买"
					})
				}
			},
			change(e) {
				console.log('是否打开:' + e.show)
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
		background-color: #55aaff;
		border-radius: 6px !important;
	}
	
	/* 提示窗口 */
	.uni-tip {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
		padding: 15px;
		width: 110%;
		background-color: #e6e3e3;
		border-radius: 10px;
		buttom: 100px;
		left: 50%;
		top: 50%;
	}
	
	.popup-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px;
		width: 300px;
		background-color: #fff;
	}

	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		/* padding: 15px;*/
		font-size: 14px;
		color: #353434;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background-color: #e6a23c;;
	}
</style>