<template>
  <view class="custom-header">
    <view class="status_bar"><!-- 这里是状态栏 --></view>
	<view class="search" :style="{'width':width+'px',height:height+'px','margin-left':left+'px','border-radius': height/2 + 'px'}">
		<icon type="search" size="18" class="icon"/>
		<input class="search" prefixIcon="search" placeholder="搜索商品" />
	</view>
    
  </view>
</template>

<script>
const app = getApp();
export default {
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
  },
  mounted() {
    //#ifdef MP-WEIXIN
    let windowWidth = 0;
    uni.getSystemInfo({
      success: (res) => {
        windowWidth = res.windowWidth;
      },
    });
    const { width, height, right, top } = uni.getMenuButtonBoundingClientRect();
    const gap = windowWidth - right;
    const inputWidth = windowWidth - width - gap * 5;
    this.width = inputWidth;
    this.height = height;
    this.top = top;
    this.left = gap * 2;
    console.log(this.width, this.height, this.top, this.left);
    //#endif
  },
};
</script>

<style lang="scss" scoped>
.search {
  box-sizing: border-box;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  font-size: 28rpx;
  position: relative;
  input{
	  width: 100%;
	  height: 100%;
	  padding-left: 50rpx;
	  
  } 
  icon {
	  position: absolute;
	  top: 50%;
	  left: 20rpx;
	  transform: translateY(-50%);
	  z-index: 999;
  }
}
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
