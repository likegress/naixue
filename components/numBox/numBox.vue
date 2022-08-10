<template>
	<view class="">
		<u-number-box class="numBox" v-model="good.num" @overlimit="min">
			<view slot="minus" class="minus" @click="prev"><u-icon name="minus" size="12"></u-icon></view>
			<text slot="input" class="input" style="width: 30px;text-align: center;">{{ good.num }}</text>
			<view slot="plus" class="plus" @click="add"><u-icon name="plus" color="#FFFFFF" size="12"></u-icon></view>
		</u-number-box>
	</view>
</template>

<script>
	export default {
		props:["carts","good"],
		data(){
			return {
				price:0,
				totalNum:0
			}
		},
		created() {
		},
		methods:{
			// 购物车的弹出层++
			add(){
				let index = this.carts.findIndex(i=>i.id == this.good.id)
				if(index == -1){ //没有
					this.carts.push(this.good)
				}else {
					this.$set(this.carts[index],"num",++this.carts[index].num)
				}
				//计算总价
				this.total()
				
			},
			prev(){
				let index = this.carts.findIndex(i=>i.id == this.good.id)
				if(this.carts[index].num == 1){
					return 
				}
				if(index == -1){ //没有
					this.carts.push(this.good)
				}else {
					this.$set(this.carts[index],"num",--this.carts[index].num)
				}
				//计算总价
				this.total()
			},
			//计算总价
			total(){
				let totalPrice = 0;
				let totalNum = 0;
				this.carts.forEach((item,i)=>{
					totalNum += item.num;
					totalPrice += item.price * item.num
				})
				this.price = totalPrice
				this.totalNum = totalNum
				//把购物车数据传过去
				this.$emit("getCarts",this.carts);
				this.$emit("getTotalNum",this.totalNum);
				this.$emit("getPrice",this.price);
				this.$emit("getGood",this.good);
			},
			min() {
				//#ifdef MP-WEIXIN
				uni.showToast({
					title: '数值不能再小了',
					icon: 'success',
					mask: true
				});
				//#endif
			},
		}
	}
</script>

<style lang="scss">
	.minus {
		width: 22px;
		height: 22px;
		border-width: 1px;
		border-color: #e6e6e6;
		border-top-left-radius: 100px;
		border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
		@include flex;
		justify-content: center;
		align-items: center;
	}
	
	.input {
		padding: 0 10px;
	}
	
	.plus {
		width: 22px;
		height: 22px;
		background-color: #ff0000;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
</style>