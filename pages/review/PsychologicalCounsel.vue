<template>
	<view>
		<screen :sortlist="topicArr" :panelData="panelArr" @conditionName="conditionName"></screen>
	</view>
</template>
 
<script>
	import screen from '@/pages/review/screen'
	export default {
		components: {
			screen
		},
		data() {
			return {
				"topicArr": ["附近", "美食", "智能排序", "筛选"],
				"panelArr": [{
						"name": "附近",
						"children": [{
								"name": "附近",
								"children": [
									{
										"name": "附近（智能范围）"
									},
									{
										"name": "500米以内"
									},
									{
										"name": "1000米以内"
									},
									{
										"name": "1500米以内"
									},
									{
										"name": "2000米以内"
									}
								]
							},
							{
								"name": "行政区/商区",
								"children": [{
										"name": "热门商区",
										"children": [{
												"name": "体育中心"
											},
											{
												"name": "新城区"
											}
										]
									},
									{
										"name": "全城",
										"children": []
									},
									{
										"name": "高新区",
										"children": [{
											"name": "全部高新区"
										}, {
											"name": "北郊"
										}, {
											"name": "南郊"
										},
										{
											"name": "东郊"
										},
										{
											"name": "西郊"
										}]
									}
								]
							},
							{
								"name": "地铁",
								"children": [{
										"name": "2号线",
										"children": [{
												"name": "北站"
											},
											{
												"name": "未央站"
											},
											{
												"name": "龙首站"
											},
											{
												"name": "咸宁站"
											}
										]
									},
									{
										"name": "3号线",
										"children": [{
											"name": "太白站"
										}, {
											"name": "玉华站"
										},
										]
									},
									{
										"name": "12号线",
										"children": [{
											"name": "玉祥门站"
										}, {
											"name": "鱼化寨站"
										},
										]
									},
									{
										"name": "6号线",
										"children": [{
											"name": "南站"
										}, {
											"name": "北站"
										},
										{
											"name": "东站"
										},
										]
									}
								]
							}
						]
					}, {
						"name": "美食",
						"children": [{
								"name": "全部美食",
								"stopnum": 0
							},
							{
								"name": "湘菜",
								"stopnum": 1
							},
							{
								"name": "川菜",
								"stopnum": 2
							},
							{
								"name": "徽菜",
								"stopnum": 3
							}
						]
					},
					{
						"name": "综合排序",
						"children": [{
								"name": "综合排序"
							},
							{
								"name": "距离最近"
							},
							{
								"name": "人气优先"
							},
							{
								"name": "好评优先"
							},
							{
								"name": "起送价最低"
							},
							{
								"name": "配送最快"
							}
						]
 
					},
					{
						"name": "筛选",
						"children": [{
							"name": "价格",
							"children": [{
									"name": "50以下"
								}, {
									"name": "50-100"
								},
								{
									"name": "100-300"
								},
								{
									"name": "300以上"
								}
							]
						}]
					}
				]
			}
		},
		methods:{
			conditionName(name){
				console.log('name',name);
			}
		}
	}
</script>
<style lang="less">
</style>