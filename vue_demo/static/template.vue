<template>
	<view class="page-name">
		<u-navbar :is-back="true" title="页面名称" :border-bottom="false" title-width="500"></u-navbar>
	</view>
</template>

<script>
export default {
	components:{},
	data() {
		return { 
			options:{}
		}
	}, 
	onLoad(options) {
		this.options=options;
	},
	onShow(){},
	methods: {
		
	},
	onShareAppMessage(res){},
	onReachBottom(){},
}
</script>

<style lang="scss">
page{
	
}
.page-name{ 
	
}
</style>
