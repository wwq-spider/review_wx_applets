<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			}
		},
		onLoad(params){
			if(params.url){
				this.url = params.url
			}
			let links = decodeURIComponent(this.url);
			console.log(`/hybrid/html/pdf.html?url=${links}`)
			this.url = `/hybrid/html/pdf.html?url=${links}`;
		}
	}
</script>

<style>
</style>
