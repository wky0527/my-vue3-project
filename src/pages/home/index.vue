<template>
  <uni-custom-nav-bar
    title="编程到家"
    leftIcon='location'
    :leftText=leftText
    @clickLeft="chooseCity"
  />
  <view class="home-banner">
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <swiper-item>
        <view class="swiper-item uni-bg-red">A</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-green">B</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-blue">C</view>
      </swiper-item>
    </swiper>
  </view>
  <view class="home-know">
    <h3><icon class="iconfont icon-lejiewomen"/>了解我们</h3>
    <view class="home-know-main flex">
      <dl class="flex">
        <dt><icon class="iconfont icon-lejiexiangqing"/></dt>
        <dd>
          <navigator :url="'/pages/programming-home/index'">
              了解编程到家
          </navigator>
        </dd>
      </dl>
      <dl class="flex">
        <dt><icon class="iconfont icon-kefuzixun"/></dt>
        <dd>
          <navigator :url="'/pages/customer-service/index'">
            客服咨询
          </navigator>
        </dd>
      </dl>
    </view>
  </view>
  <view class="home-introduce-teacher">
    <h3><icon class="iconfont icon-tuijianlaoshiqingkuangbiao"/>推荐老师</h3>
    <uni-segmented-control :current="current" :values="items" @clickItem="selectTeacher" styleType="button" activeColor="#16C4AF"/>
    <view class="content">
      <view v-show="current === 0">
        <uni-card title="基础卡片" sub-title="副标题" extra="额外信息" thumbnail="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg">
          <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
        </uni-card>
        <uni-card title="基础卡片" sub-title="副标题" extra="额外信息" thumbnail="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg">
          <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
        </uni-card>
      </view>
      <view v-show="current === 1">
        选项卡2的内容
      </view>
      <view v-show="current === 2">
        选项卡3的内容
      </view>
    </view>
  </view>
  <view class="home-parent-world">
      <h3><icon class="iconfont icon-jiachangguanli"/>家长天地</h3>
       <view class="home-parent-world-main">
         <dl class="flex">
           <dt>
             <image :mode="mode" :src="src" style="width: 160px;height: 120px;border-radius: 5px"/>
           </dt>
           <dd>
             <span class="multipleLine">孩子沉迷游戏的解决方案</span>
             <p>
               <image style="width: 50px; height: 50px;border-radius: 50%;vertical-align: middle;margin-right: 5px" :mode="mode" :src="src"/>
               <span>coco</span><span>2333阅读</span>
             </p>
           </dd>
         </dl>
         <dl class="flex">
           <dt>
             <image :mode="mode" :src="src" style="width: 160px;height: 120px;border-radius: 5px"/>
           </dt>
           <dd>
             <span class="multipleLine">孩子沉迷游戏的解决方案</span>
             <p>
               <image style="width: 50px; height: 50px;border-radius: 50%;vertical-align: middle;margin-right: 5px" :mode="mode" :src="src"/>
               <span>coco</span><span>2333阅读</span>
             </p>
           </dd>
         </dl>
       </view>
  </view>
  <view class="home-works">
    <h3><icon class="iconfont icon-youxiuzuopin"/>优秀作品</h3>
    <view class="flex">
      <uni-card cover="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg">
        <text class="flex justify-content-center">飞机大战</text>
      </uni-card>
      <uni-card cover="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg">
        <text class="flex justify-content-center">小美人鱼</text>
      </uni-card>
    </view>
  </view>
  <view class="home-match">
    <h3><icon class="iconfont icon-gengduosaishi"/>更多赛事</h3>
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <swiper-item>
        <view class="swiper-item uni-bg-red">A</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-green">B</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-blue">C</view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import {onMounted, ref,reactive,toRefs} from 'vue';
export default {
  data(){
    return {
      name: '北京',
      code:'1101'
    }
  },
  onLoad(option){
    const {name,code} = option;
    [this.name,this.code] = [name,code]
  },
  setup(){
    const leftText = ref('');
    const curInstance = getCurrentPages();
    const {code,name} = curInstance[0]
    const teacherList = reactive({
      items: ['小学','初中','高中'],
      current: 0
    })
    const bannerConfig = reactive({
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500
    })
    const cityParams = reactive({
      code: code,
      name: name
    })
    const chooseCity =  () => {
      uni.reLaunch({
        url:`/pages/city/index?code=${cityParams.code}&name=${cityParams.name}`
      })
    }
    const avatar = reactive({
      mode:'scaleToFill',
      src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg'
    })
    onMounted(()=>{
      leftText.value = cityParams.name || '北京'
    })
    const selectTeacher = (e) => {
      if (teacherList.current != e.currentIndex) {
        teacherList.current = e.currentIndex;
      }
    }
    return {
      leftText,
      chooseCity,
      ...toRefs(cityParams),
      ...toRefs(bannerConfig),
      ...toRefs(teacherList),
      selectTeacher,
      ...toRefs(avatar)
    }
  }
}
</script>
<style scoped lang="scss">
.iconfont {
  color: #16C4AF;
  margin-right: 5px;
  font-size: 24px;
}
.uniui-location {
  color: #16C4AF;
  font-size: 24px;
}
.uni-navbar__header-btns-left  {
  width: auto!important;
}
.home-banner,.home-match {
  .swiper-item {
    height: 100%;
  }
  .uni-bg-red {
    background-color: red;
  }
  .uni-bg-green {
    background-color: green;
  }
  .uni-bg-blue {
    background-color: blue;
  }
}
.home-know,.home-introduce-teacher,.home-parent-world,.home-parent-world-main,.home-works,.home-match{
  width: 95%;
  margin: auto;
  h3 {
    margin: 10px 0;
  }
  .home-know-main {
    dl {
      padding: 14px 30px;
      background-color: #EDEDED;
      border-radius: 15px;
      margin-right: 10px;
    }
  }
}
.home-parent-world-main {
  dl {
    margin-bottom: 10px;
    dt {
      margin-right: 10px;
    }
    dd {
      margin-top: -20px;
      p {
        line-height: 65px;
      }
    }
  }
}
.home-works {
  .uni-card--border {
    width: 150px;
  }
}
</style>
