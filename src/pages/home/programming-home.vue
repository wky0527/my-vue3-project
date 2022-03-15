<template>
  <uni-custom-nav-bar
      title="了解编程到家"
      rightIcon="more"
      @clickRight="handleShare"
  />
  <view class="programming-video">
    <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
  </view>
  <view class="programming-img">
    <h3>如何挑选好老师</h3>
    <img src="https://t11.baidu.com/it/u=1865801558,158785949&fm=30&app=106&f=JPEG?w=640&h=2543&s=F362BB579BB5701310E1C97F0300C067" alt="">
  </view>
</template>
<script>
export default {
  setup(){
    const handleShare = () => {
      uni.share({
        provider: "weixin",
        scene: "WXSceneTimeline",
        type: 0,
        href: "http://uniapp.dcloud.io/",
        title: "uni-app分享",
        summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
        imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
        success: function (res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function (err) {
          console.log("fail:" + JSON.stringify(err));
        }
      });
    }
    return {
      handleShare
    }
  }
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
