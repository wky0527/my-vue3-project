<template>
  <uni-custom-nav-bar
      title="更多赛事"
  />
  <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftuddimgs.oss-cn-hangzhou.aliyuncs.com%2F202002%2FDesign006_nmShC8JhBJ.jpg%3Fx-oss-process%3Dstyle%2Fprev_w_750_h_auto&refer=http%3A%2F%2Ftuddimgs.oss-cn-hangzhou.aliyuncs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649990087&t=864128af84aba43cc5d446698972f134" alt="">
  <view class="match-sign-up flex justify-content-spacebetween">
    <view class="left-num">
        <span>11029</span>人已报名
    </view>
    <view class="right-btn">
        <button type="default" class="uni-button" @click="handleSignUp">立即报名</button>
    </view>
  </view>
</template>
<script>
export default {
  setup(){
    const handleSignUp = () =>{
      //跳转课程详情页
    }
    return {
      handleSignUp
    }
  }
}
</script>
<style scoped lang="scss">
.match-sign-up {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #eeeeee;
  padding: 10px 15px;
  box-sizing: border-box;
  .left-num {
    span {
      color: #6a6a6a;
      font-size: 16px;
    }
  }
  .right-btn {
   .uni-button {
     background-color: #16C4AF;
     border-radius: 25px;
     color: #fff;
   }
  }
}
</style>
