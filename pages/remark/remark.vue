<template>
	<view class="remark">
		<u--textarea v-model="remark" placeholder="请输入内容" ></u--textarea>
		<u-button  @click="save" type="success" shape="circle" text="保存"></u-button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				remark:""
			}
		},
		methods: {
			save(){
				uni.setStorageSync("remark",this.remark)
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.remark {
		height: 1000rpx;
		margin: 20rpx 50rpx;
		position: relative;
	}
	.u-button {
		position: absolute;
		bottom: 0;
	}
</style>