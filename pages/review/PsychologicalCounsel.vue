<template>
	<view class="Index">
		<view style="width: 100%;">
			<!-- 心理咨询 -->
			<view class="search">
				<u-search style="width: 100%;" :clearabled="true" @clear="clear()" @search="search" :show-action="false" placeholder="咨询师"></u-search>
			</view>
			<view class="screen-list">
				<view @click="screenList" class="screen-list-item"><span>按人气</span><image class="img-title" src="../../static/Polygon1.png"></image></view>
				<view @click="screenList" class="screen-list-item"><span>时间</span><image class="img-title" src="../../static/Polygon1.png"></image></view>
				<view @click="screenList" class="screen-list-item"><span>筛选</span><image class="img-title" src="../../static/icons8-funnel-50 1.png"></image></view>
			</view>
			<view>
				<view class="question">
					<view>
						<view class="questionr" v-for="(expertInfo, index) in expertList" :key="index">
							<view class="questionl">
								<image class="questionlimg" mode="scaleToFill" :src="expertInfo.avatar || defaultCover" @error="imageError()"></image>
							</view>
							<view class="counsel-concent">
								<view class="counsel-title">
									<span class="counsel-name">{{expertInfo.expertName}}</span>
									<span class="counsel-charge">{{'$'+expertInfo.realPrice+'/小时'}}</span>
								</view>
								<view class="counsel-intro">{{expertInfo.label}}</view>
								<view>
									<view class="reservation" @click='reservationClick(expertInfo.id)'>立即预约</view>
								</view>
							</view>
							<view class="counsel-footer">
								<view class="counsel-footer-Left" v-for="(beGoodAt, index) in expertInfo.beGoodAtList" :key="index">
									<span class="counsel-button">{{beGoodAt.dictName}}</span>					
								</view>
								<view class="counsel-footer-right" style="float: right;color: #999999;font-size: 22rpx;padding: 10rpx 0px;">
									<span>最快可约今日18:00</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				/* reviewClassList:[
					{
						classId:'111',
						title:'3434',
						bannerImg:'hdjshdjs',
						jobTitle:'jjjj',
						label:'7878'
					}
				], */
				expertList: [],// 咨询师列表
				defaultCover: '../../static/default_cover.jpeg',
				searchValue: "",
			}
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData(pullRefresh) {
				let that = this
				//查询咨询师列表
				this.$apis.postExpertList({"page": 1, rows: 20}).then(res => {
					if (res.code == 200) {
						res.result.records.forEach((row) => {
							that.expertList.push(row)
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
				//查询分类
				/* this.$apis.postReviewClass().then(res => {
					if (res.code == 200) {
						res.result.forEach((row) => {
							that.reviewClassList.push(row)
						})
					}
				}).catch(err => {
					console.log(err)
				}) */
			},
			imageError() {
				this.expertInfo.avatar = this.defaultCover 
			},
			screenList(){},
			// 亲子关系
			//relationshipClick(){},
			// 人际关系
			//interpersonalClick(){},
			// 评测解读
			//interpretationClick(){},
			search(res) {
				this.$apis.postExpertListByLike({"expertName": res}).then(res => {
					if (res.code == 200) {
						this.expertList.splice(0,this.expertList.length)
						res.result.forEach((row) => {
							this.expertList.push(row)
						})
					}
				})
			},
			clear() {
				this.searchValue = "";
			},
			// 立即预约
			reservationClick(id){
				uni.navigateTo({
					url: '/pages/review/counselDetail?id=' + id
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import '@/common/uni-ui.scss';
	.Index {
	    /* display: flex;
	    flex-direction: column;
	    justify-content: center; */
	    width: 100%;
	    height: 100%;
	}
	.image-1 {
	        flex-shrink: 0;
	        margin-right: 10px;
	        width: 90px;
	        height: 100px;
	        border-radius: 6px;
	        overflow: hidden;
	        border: 1px #f5f5f5 solid;
	    }
	.search {
		margin-bottom: 1rpx;
		padding: 20rpx;
		background: #ffffff;
		display: flex;
	}
	.question {
		width: 100%;
		background: #fff;
		padding: 20rpx;
		margin: 20rpx;
		border-bottom: 1px solid #DDDEDF;
	}
	.questionr {
		border-bottom: 1px solid #DDDEDF;
		padding: 20rpx 0rpx 20rpx 0rpx;
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 90%;
	}
	.questionl {
		width: 30%;
		padding-right: 27px;
	}
	.questionl .questionlimg {
		width: 250rpx;
		height: 250rpx;
	}
	.counsel-concent{
		width: 58%;
		color: #333333;
		position: relative;
	}
	.reservation {
		width: 150rpx;
		line-height: 60rpx;
		background: #628D3D;
		text-align: center;
		font-size: 30rpx;
		font-weight: 700;
		margin-top: 60rpx;
		border-radius: 22rpx;
		color: #ffffff;
		float:right;
		position: absolute;
		top: 137rpx;
		right: 10rpx;
		padding: 2rpx 0 2rpx 0;
	}
	/* .evaluation{
		width: 150rpx;
		line-height: 60rpx;
		background: #628D3D;
		text-align: center;
		font-size: 30rpx;
		font-weight: 700;
		margin-bottom: 15rpx;
		border-radius: 22rpx;
		color: #ffffff;
		float:right;
		position: absolute;
		top: 55rpx;
		left: 26%;
		padding: 2rpx 0 2rpx 0;
	} */
	.counsel-charge{
		color: #416F5D;
		float: right;
	}
	.counsel-title{
		font-size: 34rpx;
		margin-bottom: 20rpx;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	}
	.counsel-intro{
		float: left;
		font-size:28rpx;
		height: 120rpx;
		overflow: scroll;
		line-height: 1.6;
		padding: 0 10rpx;
	}
	.counsel-footer{
		width: 100%;
		margin-top: 10rpx;
	}
	.counsel-button{
		width: 120rpx;
		line-height: 40rpx;
		background: #ffffff;
		text-align: center;
		font-size: 28rpx;
		font-weight: 700;
		margin-right: 17rpx;
		border-radius: 10rpx;
		color: #999999;
		float:left;
		border:1px solid #DDDEDF;
	}
	.screen-list{
		width: 100%;
		height: 66rpx;
		background-color: rgba(237,237,237,0.4);
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		line-height: 66rpx;
	}
	.screen-list-item{
		color: #2D2D2D;
		margin: 0 40rpx 0 40rpx;
	}
	.img-title{
		width:24rpx;
		height: 18rpx;
		margin-left: 10rpx;
	}
	.counsel-footer-right{
		float: right;
		color: #999999;
		font-size: 22rpx;
	}
	.list-border{
		// position: absolute;
		// top: 0;
		// right: 0;
		// left: 0;
		// height: 1px;
		// -webkit-transform: scaleY(0.5);
		// transform: scaleY(0.5);
		// background-color: #c8c7cc;
		// z-index: 1;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top-color: #c8c7cc;
		border-top-style: solid;
		border-top-width: 0.5px;
	}
</style>
