<template>
	<view class="content">
		<image src="../../static/images/1.jpg" alt="" class="img_top"></image>
		<view class="cent">
			<view class="info">
				<view class="info_left">
					<view class="img_title">
						<image src="../../static/images/1.jpg" alt="" class="title_img"></image>
						<p>
							<span class="v">V</span>
							<span class="num">1</span>
						</p>
					</view>
					<view class="info_title">
						<p class="title">春日暖阳</p>
						<view class="title_b">
							<p class="title_dengji"></p>
							<span class="dengji">61/100</span>
						</view>
					</view>
				</view>
				<view class="info_right">
					<view>
						<p>22</p>
						<p>积分</p>
					</view>
					<view>
						<p>1</p>
						<p>奈雪券</p>
					</view>
					<view>
						<p><image src="../../static/images/1.jpg" alt="" class="info_img"></image></p>
						<p>会员码</p>
					</view>
				</view>
			</view>
			<view class="tuijian">
				<view v-for="(item,index) in list" :key="index">
					<p class="tj_title">{{item.title}}</p>
					<p class="subtitle">{{item.subtitle}}</p>
					<image :src="item.img" mode="" class="tj_img"></image>
				</view>
			</view>
			<view class="zuire">
				<view class="zr">
					<view class="zr_l">
						<image src="../../static/images/1.jpg" mode=""></image>
						<span>奈雪最热</span>
					</view>
					
					<view class="zr_r">
						<p>></p>
					</view>
				</view>
				<view class="zr_content">
					<view v-for="(item,index) in list2" :key="index">
						<image :src="item.img" mode="" class="zr_img"></image>
						<p class="zr_title">{{item.title}}</p>
						<p class="price">￥{{item.price}}</p>
					</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list:[{
					title:"奈雪的茶商城",
					subtitle:"好茶随行 美好常在",
					img:"../../static/images/cent1.png",
				},{
					title:"储值有礼",
					subtitle:"储值300立赠1杯",
					img:"../../static/images/cent1.png",
				},{
					title:"积分商城",
					subtitle:"兑限量周边",
					img:"../../static/images/cent1.png",
				}],
				list2:[{
					img:"../../static/images/cent2.png",
					title:"霸气芝士葡萄",
					price:"28.00",
				},{
					img:"../../static/images/cent2.png",
					title:"霸气芝士草莓",
					price:"32.00",
				},{
					img:"../../static/images/cent2.png",
					title:"厚厚芋泥宝藏茶",
					price:"27.00",
				}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content{
		height:100vh;
		background:#f9faf9;
		.img_top{
			width: 100%;
			height:450rpx;
		}
		.cent{
			margin-top:-8rpx;
			padding:30rpx 30rpx 0 30rpx;
			.info{
				display: flex;
				justify-content:space-between;
				.info_left{
					flex:1;
					display: flex;
					justify-content: flex-start;
					.img_title{
						position: relative;
						.title_img{
							width:90rpx;
							height:90rpx;
							border-radius:50%;
						}
						p{
							display:inline-block;
							background:#fff;
							position: absolute;
							bottom:10rpx;
							right:-25%;
							width:60rpx;
							text-align: center;
							line-height:30rpx;
							font-size:26rpx;
							border-radius:15rpx;
							color:#f6c84b;
							.v{
								font-weight:600;
								font-style: italic;
							}
							.num{
								font-size:15rpx;
								margin-left:5rpx;
							}
						}
					}
					
					.info_title{
						margin-left: 30rpx;
						.title{
							font-size:32rpx;
							line-height:50rpx;
						}
						.title_b{
							.title_dengji{
								display:inline-block
							}
							.dengji{
								color:#333;
								font-size:22rpx;
							}
						}
					}
				}
				.info_right{
					flex:1;
					display: flex;
					justify-content: space-around;
					view{
						flex: 1;
						p{
							display:block;
							.info_img{
								width:39rpx;
								height:39rpx;
							}
						}
						
						p{
							text-align: center;
							line-height:51rpx;
							color:#000;
							font-size:34rpx;
						}
						p+p{
							font-size:26rpx;
							color:#666;
						}
					}
					
				}
			}
			.tuijian{
				display: flex;
				justify-content: space-between;
				margin-top:10rpx;
				view{
					width:31%;
					background: #fff;
					text-align: center;
					padding-top:10rpx;
					padding-bottom:10rpx;
					.tj_title{
						width:100%;
						font-size:28rpx;
						font-weight: 600;
					}
					.subtitle{
						width:100%;
						color:#888;
						font-size:19rpx;
						line-height:30rpx;
						margin-bottom:5rpx;
						
					}
					.tj_img{
						width:80%;
						height:150rpx;
					}
				}
			}
			.zuire{
				padding-top:20rpx;
				margin-top:20rpx;
				background: #fff;
				.zr{
					display: flex;
					justify-content: space-between;
					padding-left:20rpx;
					.zr_l{
						display: flex;
						justify-content: space-between;
						image{
							width:45rpx;
							height:45rpx;
							margin-right:10rpx;
						}
						span{
							font-size:32rpx;
							font-weight: 600;
						}
					}
					.zr_r{
						padding-right:20rpx;
						p{
							font-size:40rpx;
							color:#999;
						}
						
						
					}
				}
				.zr_content{
					display: flex;
					justify-content: space-between;
					view{
						width:31%;
						padding-top:10rpx;
						padding-bottom:10rpx;
						.zr_img{
							width:80%;
							height:150rpx;
						}
						.zr_title{
							width:100%;
							font-size:25rpx;
						}
						.price{
							width:100%;
							color:#333;
							font-size:25rpx;
							
						}
					}
				}
			}
		}
			
	}
</style>
