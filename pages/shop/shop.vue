<template>
	<view class="form">
		<view class="topNav">
			<view class="phone">
				<text>联系电话</text>
				<u--input type="number" v-model="phone" placeholder="请输入手机号码" border="none"></u--input>
			</view>
			<u-cell-group>
				<u-cell title="取餐时间" isLink><text slot="value" class="u-slot-value" @click="show = !show" style="color: yellowgreen;">立即取餐</text></u-cell>
			</u-cell-group>
			<u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm" @cancel="show = false" @change="changeHandler"></u-picker>
			<view class="tips">
				<u-radio-group v-model="radiovalue1">
					<u-radio v-for="(item, index) in radiolist1" :key="index" shape="circle" activeColor="yellowgreen" :label="item.name" :name="item.name"></u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="product">
			<view class="p-item" v-for="(item, i) of carts" :key="i">
				<text>{{ item.name }}</text>
				<view class="p-right">
					<text class="price">￥{{ item.price }}</text>
					<text class="num">X{{ item.num }}</text>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="title">支付方式</view>
			<view class="pay-item">
				<view class="pay-icon">
					<u-icon name="weixin-fill"></u-icon>
					<text>微信</text>
				</view>

				<u-radio-group v-model="payWX"><u-radio label="微信" name="微信支付" shape="circle" activeColor="yellowgreen"></u-radio></u-radio-group>
			</view>
		</view>
		<view class="remark">
			<u-cell-group :border="false">
				<u-cell title="备注" isLink :border="false" @click="onRemark"><text slot="value" class="u-slot-value">点击填写备注</text></u-cell>
			</u-cell-group>
		</view>
		<u-button @click="save" type="primary" shape="circle" text="提交"></u-button>
	</view>
</template>

<script>
import request from '@/utils/base.js';
export default {
	data() {
		return {
			phone: '', //绑定电话号码
			carts: [], //购物车
			radiovalue1: '店内堂食',
			show: false,
			columns: [['16:00-18:00', '18:00-20:00', '20:00-22:00'], ['立即取餐', '16:55', '17:10', '17:25', '17:40']],
			columnData: [['18:10', '18:25', '18:40', '18:50'], ['18:55', '18:10', '18:25', '18:40'], ['20:55', '20:10', '20:25', '20:40']],
			radiolist1: [
				{
					name: '店内堂食',
					disabled: true
				},
				{
					name: '打包带走',
					disabled: false
				}
			],
			payWX: '微信支付',
			
		};
	},
	onLoad() {},
	onShow() {
		const carts = uni.getStorageSync('carts');
		console.log(carts);
		this.carts = carts;
	},
	methods: {
		//信息提交请求接口
		async save() {
			// console.log(this.phone,this.carts.length);
			if (!this.phone || this.carts.length == 0) {
				uni.showToast({
					title: '请填写电话号码和购物'
				});
				return;
			}
			const object = this.carts.reduce((pre, item, i) => {
				let obj = {};
				obj.id = item.id
				obj.count = item.num;
				pre.push(obj);
				return pre
			}, []);
	
			const res = await request(
				'/order',
				{
					phone: this.phone,
					meal_time: '立即取餐',
					meal_type: this.radiovalue1,
					products: object,
					pay_type: this.payWX,
					desc:"小把菜"
				},
				'POST'
			);
			// console.log(this.phone,this.radiovalue1,object,this.payWX);
			console.log(res);
		},
		// 单选框radio按钮
		groupChange(val) {
			console.log(val);
		},
		// 跳转备注页
		onRemark() {
			uni.navigateTo({
				url: '/pages/remark/remark'
			});
		},
		changeHandler(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.uPicker
			} = e;
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// picker为选择器this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.columnData[index]);
			}
		},
		// 回调参数为包含columnIndex、value、values
		confirm(e) {
			console.log('confirm', e);
			this.show = false;
		}
	}
};
</script>

<style lang="scss">
.form {
	height: 100vh;
	padding: 0 20rpx;
	background: #f5f5f5;
	.topNav {
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		.phone {
			height: 82rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 30rpx;
			input {
				padding-left: 20rpx;
			}
		}
		.tips {
			height: 120rpx;
			.u-radio-group {
				height: 100%;
				display: flex;
				.u-radio {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
	.product {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		.p-item {
			height: 140rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.p-right {
				display: flex;
				flex-flow: column wrap;
				.price {
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				.num {
					text-align: right;
				}
			}
		}
	}
	.pay {
		height: 200rpx;
		border-radius: 20rpx;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		.pay-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 50rpx;
		}
		.pay-icon {
			display: flex;
			gap: 20rpx;
		}
		.u-radio-group {
			flex: none !important;
		}
	}
	.remark {
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		margin-top: 30rpx;
		height: 120rpx;
		background: #fff;
		.u-cell-group {
			background: #fff;
		}
	}
}
</style>
