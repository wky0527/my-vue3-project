<template>
  <uni-nav-bar
      title="了解编程到家"
      rightIcon="more"
      @clickRight="handleShare"
      leftIcon="back"
      @clickLeft="clickLeft"
  />
  <view class="programming-video">
    <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
  </view>
  <view class="programming-img">
    <h3>如何挑选好老师</h3>
    <img src="https://t11.baidu.com/it/u=1865801558,158785949&fm=30&app=106&f=JPEG?w=640&h=2543&s=F362BB579BB5701310E1C97F0300C067" alt="">
  </view>
</template>
<script setup>
import {useNavBar} from "@/composables/useNavBar.js";
const {useShare,useBack} = useNavBar()
const handleShare = () => {
  useShare()
}
const clickLeft = () => {
  useBack()
}
</script>
<style lang="scss" scoped>
.programming-video {
  margin-top: 5px;
  uni-video {
    width: 100%;
  }
}
.programming-img {
  h3 {
    font-size: 20px;
    margin: 10px 0;
    text-align: center;
    color: #3a3a3a;
  }
  img {
    width: 100%;
    margin: auto;
  }
}
</style>
