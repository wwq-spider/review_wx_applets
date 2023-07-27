<template>
    <view class="Index">
		<view class="search">
			<text class="recommend">每日推荐</text>
			<u-search style="width: 70%;" :clearabled="true" @clear="clear()" @search="search" :show-action="false" placeholder="抑郁测评"></u-search>
		</view>
        <!-- 瀑布流布局列表 -->
        <view class="pubuBox">
            <view class="pubuItem">
                <view class="item-masonry" v-for="(item, index) in recommendClassList" :key="index">
					<u-image :src="item.bannerImg" mode="widthFix"></u-image>
                    <view class="listtitle">
                        <view class="listtitle1">{{ item.title }}</view>
                        <view class="listtitle2">
                            <text class="listtitle2son">{{'￥'+ item.realPrice }}</text>
							<p style="font-size: 22rpx;color:#979797">{{item.reviewCount + '人测过'}}</p>
                        </view>
						<view class="evaluation" @click="beginTest(item.classId,item.title)">立即测评</view>
                    </view>
                </view>
            </view>
        </view>
		
		<view>
			<view class="search">
				<text class="recommend">精品测评</text>
				<view class="popularity"><span>按人气</span><image class="img-title" src="../../static/Polygon1.png"></image></view>
			</view>
			<view class="question" v-for="(reviewClass, index) in reviewClassList">
				<view class="questionr">
					<view class="questionl">
						<image class="questionlimg" mode="scaleToFill" :src="reviewClass.bannerImg || defaultCover" @error="imageError(0, index, 2)"></image>
					</view>
					<view style="width: 48%;margin-top: 0rpx;">
						<view class="title">{{reviewClass.title}}</view>
						<view class="subtitle">{{reviewClass.classDesc}}</view>
						<!-- <view v-if="reviewClass.charge==1">
							<span class="iconfont" style="color: #df7a58;font-size: 9px;">&#xe606;{{reviewClass.realPrice}}</span>
							<span class="iconfont" style="padding-left: 5px; color: #857f77;font-size: 9px;text-decoration:line-through;" v-if="reviewClass.dicounPrice != '0' && reviewClass.dicounPrice != '0.00'">&#xe606;{{reviewClass.orgPrice}}</span>
							<span style="padding-left: 10px; color: #857f77; font-size: 9px;">{{reviewClass.buyCount}}人付款</span>
						</view> -->
						<view class="listtitle2">
						    <text class="listtitle2son">{{'￥'+ reviewClass.realPrice }}</text>
							<p style="font-size: 22rpx;color:#979797">{{reviewClass.reviewCount + '人测过'}}</p>
						</view>
						<view class="question-evaluation"  @click='beginTest(reviewClass.classId)'>立即测评</view>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>
 
<script>
	import userCheck from '@/utils/userAction.js';
    export default {
        data() {
            return {
				current: 0,
				searchValue: "",
				recommendClassList: [],
				reviewClassList: [],
				reviewClassNumber: 0,
            }
        },
        onShow() {},
		mounted() {
			this.loadData();
		},
        onLoad(option) {
        	//初始化数据
        	this.loadData();
        },
        methods: {
			toPage(path) {
				uni.navigateTo({
					url: path 
				})
			},
			loadData(pullRefresh) {
				let that = this
				//查询每日推荐量表
				this.$apis.postPsychoMetrics().then(res => {
					if (res.code == 200) {
						res.result.forEach((row) => {
							that.recommendClassList.push(row)
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
				this.$apis.postReviewClass().then(res => {
					if (res.code == 200) {
						res.result.forEach((row) => {
							that.reviewClassList.push(row)
						})
					}
				}).catch(err => {
					console.log(err)
				})
				this.$apis.postReviewClassNumber({'classId': this.id}).then(res => {
					that.reviewClassNumber = res.result
				})
			},
			search(res) {
				this.$apis.postReviewClassByLike({"title": res}).then(res => {
					if (res.code == 200) {
						this.reviewClassList.splice(0,this.reviewClassList.length)
						res.result.forEach((row) => {
							this.reviewClassList.push(row)
						})
					}
				})
			},
			clear() {
				this.searchValue = "";
			},
			beginTest(classid, title) {
				let projectClass = uni.getStorageSync("projectClass")
				if(projectClass && projectClass.length > 0) {
					return
				}
				//跳转到当前量表
				uni.navigateTo({
					url: '/pages/review/detailNew?classId=' + classid
				})
			},
			/* changeTab(index) {
			    this.current = index;
				console.log('打印：',this.current)
			}, */
		},
    };
</script>
 
<style scoped="scoped" lang="scss">
	.search {
		margin-bottom: 1rpx;
		padding:20rpx 40rpx 20rpx 40rpx;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
	}
	.recommend {
		margin-right: 5%;
		color: #383838;
		margin-top: 1%;
		font-size: 34rpx;
	}
    .pubuBox {
        padding: 10rpx;
    } 
    .pubuItem {
        column-count: 2;
        column-gap: 15rpx;
    }
    .item-masonry {
        box-sizing: border-box;
        border-radius: 15rpx;
        overflow: hidden;
        background-color: #fff;
        break-inside: avoid;
        margin-bottom: 10rpx;
        box-shadow: 0px 0px 15rpx 1rpx rgba(78, 101, 153, 0.14);
		
		.evaluation{
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
		}
    }
	.img-radio{
		border-radius: 30rpx;
		height:100%;
		width:233rpx;
	}
    .item-masonry image {
        width: 100%;
    }
	.question-evaluation{
		width: 150rpx;
		line-height: 60rpx;
		background: #628D3D;
		text-align: center;
		font-size: 30rpx;
		font-weight: 700;
		margin: -55rpx 10rpx 0 0;
		border-radius: 22rpx;
		color: #ffffff;
		float:right;
		padding: 2rpx 0 2rpx 0;
		/* width: 150rpx;
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
		padding: 2rpx 0 2rpx 0; */
	}
    .listtitle {
        padding-left: 15rpx;
        font-size: 30rpx;
		position: relative;
		padding-bottom: 15rpx;
        .listtitle1 {
			overflow: hidden;
			-webkit-line-clamp: 1;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
        }
        .listtitle2 {
            color: #3d7a00;
            font-size: 32rpx;
            line-height: 32rpx;
            font-weight: bold;
            padding-top: 22rpx;
            .listtitle2son {
                font-size: 32rpx;
            }
        }
    }
    .Index {
        width: 100%;
        height: 100%;
    }
	.question {
		width: 88%;
		padding: -1rpx;
		background: rgba(215,233,230,0.41);
		border-radius: 50rpx;
		margin: 20rpx auto;
	}
	.questionr {
		display: flex;
		justify-content: space-around; 
		flex-flow: wrap row;
		width: 100%;
	}
	.questionl {
		width: 40%;
		padding-right: 27px;
	}
	.questionl .questionlimg {
		width: 305rpx;
		height: 233rpx;
		border-radius: 20rpx;
	}
	.questionr .title {
		color: #594e3f;
		font-size: 34rpx;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //可设置显示的行数
		line-clamp: 1;
		-webkit-box-ori5ent: vertical;
	}
	.questionr .subtitle {
		font-size: 28rpx;
		color: #857f77;
		margin: 10rpx 0 20rpx 0;
		line-height: 1.3;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; //可设置显示的行数
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.popularity {
		margin-left: 50%;
		color: #383838;
		margin-top: 2%;
		font-size: 30rpx;
		.img-title{
			width:24rpx;
			height: 18rpx;
			margin-left: 10rpx;
		}
	}
</style>