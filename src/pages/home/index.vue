<template>
  <uni-nav-bar
      :title="navBar.title"
      :leftText="navBar.leftText"
      :leftIcon="navBar.leftIcon"
      @clickLeft="chooseCity"
  />
  <view class="home-banner">
    <swiper class="swiper"
            :indicator-dots="bannerConfig.indicatorDots"
            :autoplay="bannerConfig.autoplay"
            :interval="bannerConfig.interval"
            :duration="bannerConfig.duration"
    >
      <swiper-item v-for="(item,index) in homeBanner" :key="index">
        <img class="swiper-item uni-bg-red" :src="item"/>
      </swiper-item>
    </swiper>
  </view>
  <view class="home-know">
    <h3>
      <icon class="iconfont icon-lejiewomen"/>
      了解我们
    </h3>
    <view class="home-know-main flex">
      <dl class="flex">
        <dt>
          <icon class="iconfont icon-lejiexiangqing"/>
        </dt>
        <dd>
          <navigator :url="'./programming-home'">
            了解编程到家
          </navigator>
        </dd>
      </dl>
      <dl class="flex">
        <dt>
          <icon class="iconfont icon-kefuzixun"/>
        </dt>
        <dd>
          <navigator :url="'./customer-service'">
            客服咨询
          </navigator>
        </dd>
      </dl>
    </view>
  </view>
  <view class="home-introduce-teacher">
    <h3>
      <icon class="iconfont icon-tuijianlaoshiqingkuangbiao"/>
      推荐老师
    </h3>
    <uni-segmented-control
        :current="teacherList.current"
        :values="teacherList.items"
        @clickItem="selectTeacher"
        styleType="button"
        activeColor="#16C4AF"
    />
    <view class="content">
      <view v-show="teacherList.current === 0" v-for="item in teacherData.primarySchool" :key="item.id">
        <navigator :url="'./introduce-teacher?id='+item.id">
          <uni-card :title="item.title" :sub-title="item['cource']" :extra="'好评率'+item['feedback_rate']"
                    :thumbnail="item.img">
            <text>{{ item.tag }}</text>
          </uni-card>
        </navigator>
      </view>
      <view v-show="teacherList.current === 1" v-for="item in teacherData.juniorSchool" :key="item.id">
        <navigator :url="'./introduce-teacher?id='+item.id">
          <uni-card :title="item.title" :sub-title="item['cource']" :extra="'好评率'+item['feedback_rate']"
                    :thumbnail="item.img">
            <text>{{ item.tag }}</text>
          </uni-card>
        </navigator>
      </view>
      <view v-show="teacherList.current === 2" v-for="item in teacherData.highSchool">
        <navigator :url="'./introduce-teacher?id='+item.id">
          <uni-card :title="item.title" :sub-title="item['cource']" :extra="'好评率'+item['feedback_rate']"
                    :thumbnail="item.img">
            <text>{{ item.tag }}</text>
          </uni-card>
        </navigator>
      </view>
    </view>
  </view>
  <view class="home-parent-world">
    <h3>
      <icon class="iconfont icon-youxiuzuopin"/>
      家长天地
    </h3>
    <view class="flex justify-content-center" v-for="item in teacherData.primarySchool" :key="item.id">
      <navigator :url="'./parents-world?id='+item.id">
        <uni-card :cover="item.img">
          <text class="flex justify-content-center">{{ item.title }}</text>
        </uni-card>
      </navigator>
    </view>
  </view>
  <view class="home-works">
    <h3>
      <icon class="iconfont icon-youxiuzuopin"/>
      优秀作品
    </h3>
    <view class="flex justify-content-center" v-for="item in teacherData.primarySchool" :key="item.id">
      <navigator :url="'./works?id='+item.id">
        <uni-card :cover="item.img">
          <text class="flex justify-content-center">{{ item.title }}</text>
        </uni-card>
      </navigator>
    </view>
  </view>
  <view class="home-match">
    <h3>
      <icon class="iconfont icon-gengduosaishi"/>
      更多赛事
    </h3>
    <navigator :url="'./match'">
      <swiper class="swiper"
              :indicator-dots="bannerConfig.indicatorDots"
              :autoplay="bannerConfig.autoplay"
              :interval="bannerConfig.interval"
              :duration="bannerConfig.duration"
      >
        <swiper-item v-for="(item,index) in homeBanner" :key="index">
          <img class="swiper-item uni-bg-red" v-lazyLoad="item"/>
        </swiper-item>
      </swiper>
    </navigator>
  </view>
</template>
<script setup>
import {onMounted, reactive, computed, ref} from 'vue';
import store from "@/store";
import {introduceTeacher} from "@/api/home.js";
import {useAddressParams} from "@/composables/useAddressParams.js";
const {curRouteH, curRouteApp} = useAddressParams();
// const cityParams = reactive({
//   code: '',
//   name: ''
// })
const cityCode = ref('')
const navBar = reactive({
  title: '编程到家',
  leftText: '',
  leftIcon: 'location',
})
const teacherData = reactive({
  highSchool: [],
  juniorSchool: [],
  primarySchool: []
})
const teacherList = reactive({
  items: ['小学', '初中', '高中'],
  current: 0
})
const bannerConfig = reactive({
  indicatorDots: true,
  autoplay: true,
  interval: 2000,
  duration: 500
})
onMounted(() => {
  getTeacher();
  //#ifdef APP-PLUS
  const {code,name} = curRouteApp
  navBar.leftText = name || '北京'
  cityCode.value = code
  //#endif
  //#ifdef H5
  const {code:curRouteHCode,name:curRouteHName} = curRouteH
  navBar.leftText = curRouteHName || '北京'
  cityCode.value = curRouteHCode
  //#endif
})
const homeBanner = computed(() => store.getters.config['home_banner']);
const chooseCity = () => {
  uni.reLaunch({
    url: `/pages/city/index?code=${cityCode.value}&name=${navBar.leftText}`
  })
}
const getTeacher = async () => {
  uni.showLoading({
    title: '加载中'
  })
  const {data: data} = await introduceTeacher();
  uni.hideLoading();
  const {high_school, junior_school, primary_school} = data[0]
  teacherData.primarySchool = primary_school
  teacherData.juniorSchool = junior_school
  teacherData.highSchool = high_school
}
const selectTeacher = (e) => {
  if (teacherList.current != e.currentIndex) {
    teacherList.current = e.currentIndex;
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

.uni-navbar__header-btns-left {
  width: auto !important;
}

.home-banner, .home-match {
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

.home-know, .home-introduce-teacher, .home-parent-world, .home-parent-world-main, .home-works, .home-match, .segmented-control {
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
        margin-top: 17px;
      }

      span {
        font-size: 14px;

        b {
          margin-left: 5px;
        }
      }
    }
  }
}

.home-match {
  margin-bottom: 10px;
}

.home-banner, .home-match {
  img {
    width: 100%;
  }
}
</style>
