<template>
	<view>
		<view class="top-img">
		</view>
		<view class="box">
			<view class="top">
				<view class="top-tou">
					<img src="../../static/images/1.jpg" alt="">
					<p>辛跃飞 <span v-click="">></span></p>
				</view> 
				<view class="top-nav">
					<span class="p1">LV1</span>
					<span class="p2">会员权益 ></span>
				</view>
				<view class="top-jin">
					<p class="pp1">61/100</p>
					<view class="div1"></view>
					<p class="pp2">库里下一个等级只差39成长值></p>
				</view>
				<view class="top-ma">
					<img src="../../static/images/杯 (1).png" alt="">
					<span>会员码</span>
				</view>
			</view>
			<view class="hunze">
					<span>积分变动可以第一时间得到通知</span>
					<p>去领取</p>
			</view>
			<view class="nav">
				<h3>{{title}}</h3>
				<li v-for="item in list" :key="item">
					<span>{{item.price}}</span>
					<p>{{item.title}}</p>
				</li>
			</view>
			<view class="button">
				<h3>{{title1}}</h3>
				<li v-for="item in list1" :key="item">
					<img :src="item.img" alt="">
					<p>{{item.title}}</p>
				</li>
			</view>
			<view class="bol">
				<span>会员卡适用于奈雪的茶和奈雪的酒是有指定规范</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的资产',
				title1:"我的服务",
				list:[
					{
						price:2,
						title:"奈雪卷"
					},
					{
						price:62,
						title:"积分商城"
					},
					{
						price:"0.00",
						title:"余额"
					},
					{
						price:0,
						title:"礼品卡"
					}
				],
				list1:[
					{
						img:"../../static/images/cent1.png",
						title:"村长有礼"
					},
					{
						img:"../../static/images/cent1.png",
						title:"积分签到"
					},
					{
						img:"../../static/images/cent1.png",
						title:"送她心意"
					},
					{
						img:"../../static/images/cent1.png",
						title:"联系客服"
					},
					{
						img:"../../static/images/cent1.png",
						title:"兑换中心"
					},
					{
						img:"../../static/images/cent1.png",
						title:"后货冻着"
					},
					{
						img:"../../static/images/cent1.png",
						title:"来发票额"
					},
					{
						img:"../../static/images/cent1.png",
						title:"更多服务"
					},
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.top-img{
		width:100vw;
		height: 300rpx;
		background:#b0d342;
	}
	.box{
		width: 100vw;
		height: 100vh;
		background: #f9faf9;
		position: relative;
		.top{
			position: absolute;
			width: 90%;
			height: 350rpx;
			background: #fff;
			left: 5%;
			top:-80rpx;
			border-radius: 2%;
			position: relative;
			.top-tou{
				position: absolute;
				left: 40%;
				top: -50rpx;
				img{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
				p{
					font-weight: 600;
				}
			}
			.top-nav{
				width: 80vw;
				height: 200rpx;
				background: #f6f8ec;
				position: absolute;
				left:5%;
				top: 120rpx;
				position: relative;
				.p1{
					font-size: 32rpx;
					font-weight: bold;
					position: absolute;
					left:20rpx ;
					top: 20rpx;
				}
				.p2{
					position: absolute;
					right: 20rpx;
					font-size:23rpx;
					top: 20rpx;
				}
			}
			.top-jin{
				position: absolute;
				left:50rpx;
				.pp1{
					font-size: 23rpx;
					color: #999;
				}
				.div1{
					width: 300rpx;
					height: 10rpx;
					background: #b0d342;
					margin: 15rpx 0;
					border-radius: 45px;
				}
				.pp2{
					font-size: 25rpx;
					color: #242524;
				}
			}
			.top-ma{
				position: absolute;
				right: 80rpx;
				bottom: 60rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				img{
					width: 50rpx;
					height: 50rpx;
				}
				span{
					font-size: 28rpx;
					padding-top: 10rpx;
				}
			}
		}
		.hunze{
			position: absolute;
			width: 83vw;
			height: 60rpx;
			background:#f6fbdd;
			left: 8%;
			top: 290rpx;
			display: flex;
			span{
				font-size: 25rpx;
				line-height: 60rpx;
				margin-left: 20rpx;
			}
			p{
				width: 100rpx;
				height: 50rpx;
				background: #b0d342;
				margin-left: 135rpx;
				line-height: 50rpx;
				font-size: 28rpx;
				margin-top: 5rpx;
				border-radius: 45rpx;
				text-align: center;
			}
		}
		.nav{
			position: absolute;
			width: 90%;
			height: 200rpx;
			background: #fff;
			left: 5%;
			top:20rpx;
			border-radius: 2%;
			position: relative;
			display: flex;
			h3{
				position: absolute;
				left: 50rpx;
				top: 20rpx;
				font-size: 30rpx;
				font-weight: 600;
			}
			li{
				list-style: none;
				margin-top: 80rpx;
				margin-left: 70rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				span{
					font-size: 28rpx;
					margin-bottom: 10rpx;
				}
				p{
					font-size: 25rpx;
				}
			}
		}
		.button{
			position: absolute;
			width: 90%;
			height: 400rpx;
			background: #fff;
			left: 5%;
			top:50rpx;
			border-radius: 2%;
			position: relative;
			display: flex;
			flex-wrap: wrap;
			h3{
				position: absolute;
				left: 20rpx;
				top: 20rpx;
				font-size: 30rpx;
				font-weight: 600;
			}
			li{
				margin-top: 80rpx;
				margin-left: 60rpx;
				img{
					width: 70rpx;
					height: 70rpx;
					margin-left: 10rpx;
				}
				p{
					font-size: 25rpx;
				}
			}
		}
		.bol{
			position: absolute;
			left:100rpx;
			bottom: 30rpx;
			span{
				color: #777;
				font-size: 26rpx;
			}
		}
	}
</style>