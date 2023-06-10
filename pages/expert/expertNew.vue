<template>
	<!-- <view>
		<view v-for="(calendarInfo, index) in calendarList">
			<view @click='viewCalendarDetail(calendarInfo.id, calendarInfo.title)' :key="index">
				<view>
					<image :src="calendarInfo.avatar || defaultCover" @error="imageError()" mode="scaleToFill"></image>
				</view>
				<view>
					<text class="title">{{calendarInfo.expertName}}</text>
					<text class="subtitle">{{calendarInfo.jobTitle}}|{{calendarInfo.label}}</text>
				</view>
			</view>
		</view>
	</view> -->
	<uni-list>
		<uni-list-item direction="row" v-for="item in calendarList" :key="item.id" :title="item.expertName + '  ' + item.dicountPrice + '/1小时'" :note="item.jobTitle + ' '+ item.label">
			<template v-slot:header>
				<image class="image-1" :src="item.avatar" mode="aspectFill"></image>
			</template>
		</uni-list-item>
	</uni-list>
</template>

<script>
	export default {
		data() {
			return {
				bodyShow: true, // 页面显示
				parentOpenid: '',
				openid: '',
				localtionPlatform: '',
				modelTel: '', // 专家手机号码
				calendarList: [],//专家列表
				defaultCover: '../../static/man.png',
			}
		},
		onLoad(option) {
			//初始化数据
			this.loadData();
		},
		methods: {
			loadData(pullRefresh) {
				uni.showLoading({
					title: '数据加载中'
				})
				let that = this
				//查询专家列表
				this.$apis.postCalendarList({"page": 1, rows: 20}).then(res => {
					this.tipShow  = false
					uni.hideLoading()
					that.calendarList = []
					if (res.code == 200) {
						if(pullRefresh) {
							uni.stopPullDownRefresh()
						}
						let queryParamList = []
						res.result.records.forEach((row) => {
							that.calendarList.push(row)
							queryParamList.push({"id": row.id, "title": row.title})
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					that.tipShow  = false
					console.log(err)
				})
			},
			imageError() {
				this.calendarInfo.avatar = this.defaultCover 
			},
			viewCalendarDetail(id, title){
				//跳转到专家详情页面
				uni.navigateTo({
					url: '/pages/expert/expertInfo?id=' + id
				})
				
			},
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				this.tipShow = true
				//初始化数据
				this.loadData(true)
			},
			//预约专家
			orderExpert(id){
				//跳转到专家详情页面
				uni.navigateTo({
					url: '/pages/expert/expertInfo?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.image-1 {
	        flex-shrink: 0;
	        margin-right: 10px;
	        width: 90px;
	        height: 100px;
	        border-radius: 6px;
	        overflow: hidden;
	        border: 1px #f5f5f5 solid;
	    }
</style>