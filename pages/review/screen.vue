<template>
	<view class="sortContent">
		<view class="sortCondition">
			<view class="conditionList" v-for="(item,index) in topicArr" :key="index">
				<view class="listParent" :data-tabtopic="sortlist[index]" :data-index="index" :data-name="item" @click="topicClick">
					<text :class="item.length>4?'isovertext':''">{{item}}</text>
					<u-icon :name="topicIndex==index && topicStatu ?'arrow-down':'arrow-up'" color="#000" size="12"></u-icon>
				</view>
			</view>
		</view>
		<!-- 筛选面板数据 -->
		<view class="panelMask" v-if="topicStatu" @touchmove.stop.prevent="moveHandle"></view>
		<view class="condition-panel" v-for="(item,index) in panelData" :key="index" v-if="topicIndex==index && topicStatu">
			<view class="ranking" v-if="currentTap=='美食'">
				<view class="panelList" v-for="(childitem,childindex) in item.children" :key="childindex"
					:data-index="childindex" :data-name="childitem.name" @click="screenClick">
					<text :class="deliciousindex==childindex?'delicious':''">{{childitem.name}}</text>
					<text class="stopNumber" v-if="childitem.stopnum>0">{{childitem.stopnum}}</text>
				</view>
			</view>
			<view class="ranking" v-else-if="currentTap=='智能排序'">
				<view class="panelList" v-for="(recommendationitem,recommenindex) in item.children"
					:key="recommenindex">
					<view :data-index="recommenindex" :data-name="recommendationitem.name" @click="screenClick">
						<text
							:class="recommendationindex==recommenindex?'recommendation':''">{{recommendationitem.name}}</text>
					</view>
				</view>
			</view>
			<view class="nearby" v-else-if="currentTap=='附近'">
				<view class="childTab" v-for="(childtabitem,childtanindex) in item.children" :key="childtanindex">
					<view class="tabList">
						<view :class=" tapindex==childtanindex?'tabtopic tabtopicActive':'tabtopic '"
							:data-index="childtanindex" @click="tabClick">{{childtabitem.name}}
						</view>
						<view class="childContent" v-if="tapindex==childtanindex">
							<scroll-view scroll-y="true">
								<view class="contentList"
									v-for="(childcontentitem,chilcontentindex) in childtabitem.children"
									:key="chilcontentindex">
									<view :class="contentindex==chilcontentindex &&tabName==childtabitem.name ?childcontentitem.children&&childcontentitem.children.length>0?
									'contentopic contentopicActive':'contentopic contentActive':'contentopicdefault'"
										:data-index="chilcontentindex" :data-name="childcontentitem.name"
										:data-parentname="childtabitem.name"
										:data-item="childtabitem"
										@click.stop="contentClick">
										{{childcontentitem.name}}
									</view>
									<view class="specific" v-if="contentindex==chilcontentindex && 
										childcontentitem.children && 
										childcontentitem.children.length>0">
										<view class="specificList"
											v-for="(specificitem,index) in childcontentitem.children"
											:key="index" :data-index="index" :data-name="specificitem.name"
											:data-parentname="childcontentitem.name"
											@click.stop="specificClick">
											<view :class="specificindex==index && specificName==childcontentitem.name?'specificActive':'specificcontent'">
												{{specificitem.name}}
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</view>
			<view class="screen" v-else-if="currentTap=='筛选'">
				<view class="screenList" v-for="(screenitem,screenindex) in item.children" :key="screenindex">
					<view class="screenTopic">{{screenitem.name}}</view>
					<view class="screenContent">
						<view v-for="(screenchilditem,screenchildindex) in screenitem.children" :key="screenchildindex">
							<view :class="screenchildindex==currentscreenindex?'screentext colorChange':'screentext'">
								<view :data-index="screenchildindex" :data-name="screenchilditem.name"
									@click="screenClick">{{screenchilditem.name}}</view>
							</view>
						</view>
 
					</view>
				</view>
				<view class="operateBtn">
					<button class="reset" @click="reset">重置</button>
					<button class="sure" @click="sure">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: 'sort',
		props: {
			sortlist: {
				type: Array,
				default: () => []
			},
			panelData: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				topicArr: [],
				panelArr: [],
				currentTap: null,
				topicIndex: 0,
				tapindex: 0,
				deliciousindex: 0,
				recommendationindex: 0,
				contentindex: 0,
				specificindex: -1,
				currentscreenindex: -1,
				topicStatu: false,
				currentspecific:null,
				tabName:null,
				specificName:null
			}
		},
		mounted() {
			this.topicArr = JSON.parse(JSON.stringify(this.sortlist))
		},
		methods: {
			topicClick(e) {
				const index = e.currentTarget.dataset.index;
				const name = e.currentTarget.dataset.name;
				const tabtopic = e.currentTarget.dataset.tabtopic;
				this.currentTap = tabtopic;
				if (this.topicIndex == index) {
					this.topicStatu = !this.topicStatu
					return
				}
				this.topicStatu = true;
				this.topicIndex = index;
				this.panelArr = this.panelData;
			},
			tabClick(e) {
				console.log('tabClick',e);
				const index = e.currentTarget.dataset.index;
				this.tapindex = index;
				// this.contentindex = -1;
			},
			contentClick(e) {
				const index = e.currentTarget.dataset.index;
				const name = e.currentTarget.dataset.name;
				const parentname = e.currentTarget.dataset.parentname;
				const item = e.currentTarget.dataset.item
				this.tabName=parentname;
				this.contentindex = index;
				item.children.forEach((v,i)=>{
					if(v.name == name){
						if(v.children){
							if(v.children.length){
								this.topicStatu = true;
							}else{
								this.topicStatu = false;
							}
						}else{
							this.topicStatu = false;
						}
						this.updatetopic(name)
					}
				})
			},
			specificClick(e) {
				const index = e.currentTarget.dataset.index;
				const name = e.currentTarget.dataset.name;
				const parentname = e.currentTarget.dataset.parentname;
				this.specificName=parentname;
				this.specificindex = index;
				this.topicStatu = false;
				this.updatetopic(name)
			},
			screenClick(e) {
				const index = e.currentTarget.dataset.index;
				const name = e.currentTarget.dataset.name;
				switch (this.currentTap) {
					case "美食":
						this.updatetopic(name)
						this.deliciousindex = index;
						this.topicStatu = false;
						return;
					case "智能排序":
						this.updatetopic(name)
						this.recommendationindex = index;
						this.topicStatu = false;
						return;
					case "筛选":
						this.currentspecific=name;
						if (this.currentscreenindex == index) {
							this.currentscreenindex = -1;
							return
						}
						this.currentscreenindex = index;
						return;
				}
			},
			updatetopic(name){
				let index=this.sortlist.indexOf(this.currentTap);
				this.topicArr[index]=name
				this.$emit("conditionName", name)
			},
			reset() {
				this.currentscreenindex = -1;
			},
			sure(){
				this.topicStatu = false;
				this.$emit("conditionName", this.currentspecific)
			}
		}
	}
</script>
 
<style lang="less">
	.sortContent {
		position: relative;
		height: 100vh;
	}
	
	.sortCondition {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		height: 100rpx;
		box-sizing: border-box;
	}
	.conditionList{
		flex: 1;
		display: flex;
		justify-content: center;
		.listParent{
		    view  {
				margin-left: 6rpx !important;
				margin-top: 6rpx !important;
			}
		}
	}
	.listParent {
		display: flex;
		align-items: center;
		/* margin-left: 28rpx; */
		justify-content: center;
		/* width: 180rpx; */
		position: relative;
	
	}
	.listParent .isovertext{
		width: 124rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
	}
	
	.conditionList .iconfont {
		width: 0;
		transform: scale3d(1.5, 1.5, 1.5);
	}
	
	.condition-panel {
		/* padding: 20rpx 60rpx; */
		/* height: 60%; */
		position: absolute;
		left: 0;
		right: 0;
		overflow: auto;
		background-color: #FFFFFF;
	}
	
	.panelMask {
		position: absolute;
		left: 0;
		right: 0;
		top: 100rpx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}
	
	.ranking {
		padding: 0 60rpx;
	}
	
	.panelList {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
	
	}
	
	.stopNumber {
		color: #999999;
	}
	
	.nearby {
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
		height: 100%;
	}
	
	.childTab,
	.tabList,
	.contentList {
		display: flex;
		align-items: flex-start;
		width: 100%;
	}
	.tabtopic {
		width: 300rpx;
		padding: 20rpx 60rpx;
		box-sizing: border-box;
		color: #101010;
		/* flex: 0.3; */
	}
	
	.tabtopicActive {
		color: #007AFF;
		background-color: rgba(0, 0, 0, 0.05);
	}
	
	.specific {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		left: 180rpx;
		background-color: rgba(0, 0, 0, 0.05);
		overflow: scroll;
	}
	
	.specificActive {
		color: #007AFF !important;
	}
	
	.contentopic {
		padding: 20rpx 0;
		color: #101010;
		padding-left: 40rpx;
		width: 180rpx;
		box-sizing: border-box;
	}
	
	.contentopicdefault {
		padding: 20rpx 0;
		color: #101010;
		padding-left: 40rpx;
		width: auto;
		box-sizing: border-box;
	}
	
	.contentActive {
		color: #007AFF;
		width: auto;
	
	}
	
	.contentopicActive {
		color: #007AFF;
		background-color: rgba(0, 0, 0, 0.05);
	}
	
	.contentopicActive,
	.tabtopicActive {
		position: relative;
	}
	
	.contentopicActive::before,
	.tabtopicActive::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 6rpx;
		background-color: #007AFF;
	}
	
	.childContent {
		flex: 1;
		position: absolute;
		right: 0;
		top: 0;
		left: 300rpx;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.05);
		overflow: scroll;
	}
	
	.specificList view {
		padding: 20rpx 0;
		color: #101010;
		padding-left: 40rpx;
		box-sizing: border-box;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.delicious,.recommendation{
		color: #007AFF;
	}
	.screen {
		padding: 20rpx 60rpx 140rpx;
	}
	
	.screenContent {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.screentext {
		width: 160rpx;
		height: 60rpx;
		border-radius: 8rpx;
		border: 1px solid #999999;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
		color: #101010;
	}
	
	.colorChange {
		color: #007AFF;
		background-color: #DEE7FF;
		position: relative;
		overflow: hidden;
		border: 1px solid #007AFF;
	}
	
	.colorChange::before {
		content: '';
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		bottom: -30rpx;
		right: -30rpx;
		transform: rotate(45deg);
		background: #007AFF;
	}
	
	.colorChange::after {
		content: '';
		position: absolute;
		width: 17rpx;
		height: 9rpx;
		border: 2rpx solid #fff;
		bottom: 14rpx;
		right: 5rpx;
		border-top: none;
		border-right: none;
		background: transparent;
		transform: rotate(-45deg);
	}
	.operateBtn{
		position: absolute;
		left: 0;
		bottom: 20rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.operateBtn button{
		width: 160rpx;
		font-size: 28rpx;
		background-color: #007AFF;
		color: #FFFFFF;
	}
	.operateBtn .reset{
		background-color: #FFFFFF;
		color: #808080;
	}
	
</style>