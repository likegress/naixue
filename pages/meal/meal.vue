<template>
	<view class="products">
		<NavMenu />
		<view class="main">
			<scroll-view class="product_list">
				<view @click="tabFn(index)" class="p-item" :class="current == index ? 'active' : ''" v-for="(item, index) in product" :key="item.id">
					{{ item.name }}
					<text v-if="item.tag">{{ item.tag }}</text>
				</view>
			</scroll-view>
			<scroll-view class="product_main" @scroll="onScroll" :scroll-into-view="'href' + hrefIndex" scroll-with-animation scroll-y>
				<view class="m-item" v-for="(item, index) in product" :key="item.id" :id="'href' + index">
					<h5>{{ item.name }}</h5>
					<view class="good" v-for="(subItem, subI) in item.products" :key="subItem.id">
						<image :src="subItem.pic" mode=""></image>
						<view class="good-right">
							<view class="g-title">{{ subItem.category_name }}</view>
							<view class="summary">{{ noneStr(subItem.detail, 10) }}</view>
							<view class="total">
								<text class="price">￥{{ subItem.price }}</text>
								<!-- 组件步进器 -->
								<numBox :carts="carts" :good="subItem" @getGood="getGood" @getCarts="getCarts" @getPrice="getPrice" @getTotalNum="getTotalNum" />
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="accounts">
			<button class="cart" @click="open">购物车</button>
			<view id="price">
				<text>￥{{ price }}</text>
				<text>共{{ totalNum }}个</text>
			</view>
			<view class="post" @click="onShop">选好了</view>
		</view>
		<!-- 弹出层 -->
		<u-popup class="u-popup" :round="10" mode="bottom" :show="isPopup" @close="close">
			<view class="popupClose" @click="popupClose">清空</view>
			<view class="card" v-for="(item, index) of carts" :key="item.id">
				<image :src="item.pic" mode=""></image>
				<view class="card-right">
					<view class="card-title">{{ item.category_name }}</view>
					<view class="card-total">
						<view class="card-price">{{ item.price }}</view>
						<!-- 组件步进器 -->
						<numBox :carts="carts" :good="item" @getGood="getGood" @getCarts="getCarts" @getPrice="getPrice" @getTotalNum="getTotalNum" />
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import NavMenu from '@/components/navMenu/navMenu.vue';
import request from '@/utils/base.js';
import noneStr from '@/utils/noneStr.js';

//引入步进器
import NumBox from '@/components/numBox/numBox.vue';
//#ifdef MP-WEIXIN
const scrollArr = [0];
//#endif
export default {
	components: {
		NavMenu,
		NumBox
	},
	data() {
		return {
			product: [], //商品列表
			current: 0, //当前项
			noneStr,
			hrefIndex: 0, //跳转的索引id
			isPopup: false, // 弹出层的控制选项
			navHeight: 0,
			carts: [], //购物车的数组
			price: 0, //总价格
			totalNum: 0 //总数量
		};
	},
	onLoad() {},
	onReady() {
		this.getProduct().then(_ => {
			//把高给变量navHeight
			let height = uni.getStorageSync('navHeight');
			this.navHeight = height;
			//获取所有item元素的高
			//#ifdef MP-WEIXIN
			const query = uni
				.createSelectorQuery()
				.in(this)
				.selectAll('.m-item');
			query
				.fields(
					{
						size: true
					},
					data => {
						let height = 0;
						data.forEach((item, i) => {
							height += Math.ceil(item.height);
							scrollArr.push(height);
						});
						console.log(scrollArr);
					}
				)
				.exec();

			//#endif
		});
	},
	methods: {
		//监听滚动
		//#ifdef MP-WEIXIN
		onScroll(e) {
			let sT = Math.ceil(e.detail.scrollTop);

			let i = scrollArr.findIndex((item, i, arr) => item >= sT && sT < arr[i + 1]);
			this.current = i;
		},
		//#endif
		//接收步进器的购物车
		getCarts(carts) {
			this.carts = carts;
			uni.setStorageSync("carts",this.carts);
		},
		getPrice(p) {
			this.price = p;
		},
		getTotalNum(n) {
			this.totalNum = n;
		},
		getGood(good) {
			this.product.forEach((item, i) => {
				item.products.forEach((sItem, sI) => {
					if (good.id == sItem.id) {
						item.products[sI] = good;
					}
				});
			});
		},
		//清空购物车
		popupClose() {
			this.carts = [];
			this.isPopup = false;
			this.totalNum = 0;
			this.price = 0;
			//数组的数量全部为1
			this.product.forEach((item, i) => {
				item.products.forEach((sItem, sI) => {
					this.$set(sItem, 'num', 1);
				});
			});
			uni.setStorageSync("carts",this.carts);
		},
		//跳转到取餐页
		onShop(){
			uni.switchTab({
				url:"/pages/shop/shop"
			})
		},
		//请求数据
		async getProduct() {
			const {
				data: { data }
			} = await request('/product/list', {}, 'get');

			data.forEach((item, i) => {
				item.products.forEach((sItem, sI) => {
					this.$set(sItem, 'num', 1);
				});
			});
			this.product = data;
			console.log(this.product);
		},
		//tab切换
		tabFn(i) {
			this.current = i;
			this.hrefIndex = i;
		},
		//关闭弹出弹出层
		close() {
			this.isPopup = false;
		},
		open() {
			this.isPopup = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	.product_list {
		height: 100vh;
		width: 200rpx;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		background: #ccc;
		.p-item {
			box-sizing: border-box;
			border-left: 8rpx solid #ccc;
			width: 100%;
			height: 120rpx;
			color: #999;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			text {
				color: #fff;
				font-size: 26rpx;
			}
			transition: all .4s;
		}
		.p-item.active {
			background: #fff;
			border-left: 8rpx solid yellowgreen;
		}
		.p-item.active text {
			color: #f00;
		}
	}
	.product_main {
		height: 100vh;
		flex: 1;
		background: #fff;
		color: #000;
		.m-item {
			box-sizing: border-box;
			padding: 20rpx;
			h5 {
				height: 80rpx;
				line-height: 80rpx;
				font-weight: bold;
			}
			.good {
				display: flex;
				width: 100%;
				margin: 40rpx 0;

				image {
					width: 200rpx;
					height: 200rpx;
				}
				.good-right {
					box-sizing: border-box;
					flex: 1;
					padding-left: 20rpx;
					padding-right: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.summary {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.total {
						display: flex;
						justify-content: space-between;
						// gap: 20rpx;
						.price {
							color: #ff0000;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
}

.accounts {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 120rpx;
	display: flex;
	align-items: center;
	border: 1px solid #999;
	background: #fff;
	box-sizing: border-box;
	.cart {
		background: orange;
		width: 200rpx !important;
		height: 120rpx !important;
		line-height: 120rpx;
		color: #fff;
		font-weight: bold;
		padding: 0;
		margin: 0;
		width: 240rpx;
	}
	#price {
		font-weight: bold;
		flex: 1;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.post {
		background: yellowgreen;
		text-align: center;
		line-height: 120rpx;
		width: 240rpx;
	}
}
//弹出层
.u-popup {
	padding-bottom: 120rpx;
	.popupClose {
		height: 100rpx;
		line-height: 100rpx;
		text-align: right;
		padding-right: 20rpx;
	}
	.card {
		display: flex;
		padding: 0 20rpx;
		align-items: center;
		height: 150rpx;
		margin-bottom: 30rpx;
		gap: 20rpx;
		image {
			width: 100rpx;
			height: 100rpx;
		}
		.card-right {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.card-total {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
}
</style>
