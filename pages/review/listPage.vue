<template>
    <view class="Index">
		<u-tabs :list="tabList" :current="current" @click="changeTab" @change="changeTab"></u-tabs>
		<psychometrics v-if="current == 0"></psychometrics>
		<PsychologicalCounsel v-if="current == 1"></PsychologicalCounsel>
		<careerPlan v-if="current == 2"></careerPlan>
		<view v-if="current == 3">
			<u-empty mode="page"></u-empty>
		</view>
		<view v-if="current == 4">
			<u-empty mode="page"></u-empty>
		</view>
		<view v-if="current == 5">
			<u-empty mode="page"></u-empty>
		</view>
		<view v-if="current == 6">
			<u-empty mode="page"></u-empty>
		</view>
    </view>
</template>
 
<script>
	import userCheck from '@/utils/userAction.js';
	import psychometrics from '@/pages/review/psychometrics';
	import PsychologicalCounsel from '@/pages/review/PsychologicalCounsel';
	import careerPlan from '@/pages/review/careerPlan';
    export default {
		components:{
			psychometrics,
			PsychologicalCounsel,
			careerPlan
		},
        data() {
            return {
				current: 0,
				tabList: [{
					name: '心理评测',
				}, {
					name: '心理咨询',
				}, {
					name: '心理课程'
				}, {
					name: '心理商城'
				}, {
					name: '专业支持'
				}, {
					name: '共享咨询室'
				}, {
					name: '生涯规划'
				}],
            }
        },
		onLoad(event) {
			if(event.current){
				this.current = event.current
			}
			console.log('打印onLoad：',this.current)
		},
		mounted() {
			
			if(event.current){
				this.current = event.current
			}
			console.log('打印mounted：',this.current)
		},
        methods: {
			changeTab(index) {
			    this.current = index;
			},
		},
    };
</script>
 
<style scoped="scoped" lang="scss">
    page {
        background-color: #eee;
        height: 100%;
    }
    .Index {
        width: 100%;
        height: 100%;
    }
</style>