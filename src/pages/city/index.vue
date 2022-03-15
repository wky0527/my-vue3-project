<template>
  <uni-custom-nav-bar title="选择城市"/>
  <view class="city-position">
    <h3>当前位置</h3>
    <p class="city-position-current">{{ currentPosition }}</p>
  </view>
  <view class="city-hot">
    <h3>热门城市</h3>
    <view class="city-hot-list">
      <ul class="flex wrap">
          <li @click="selectHotCity(item.code,item.name)" v-for="item in data">{{item.name}}</li>
      </ul>
    </view>
  </view>
  <t-index-address @select="selectCity"/>
</template>
<script>
import {onMounted, reactive, ref, toRefs} from 'vue';
import {useAddressParams} from "@/composables/useAddressParams.js";

export default {
  setup() {
    const currentPosition = ref('');
    const hotCity = reactive({
      data: [
        {
          code: 1101,
          name: '北京'
        },
        {
          code: 4401,
          name: '广州'
        },
        {
          code: 3101,
          name: '上海'
        }
      ]
    })
    const {curRouteApp, curRouteH} = useAddressParams();
    const selectCity = (data) => {
      const {code, name, provinceCode, province} = data;
      uni.reLaunch({
        url: `/pages/home/index?code=${code}&name=${name}`
      })
    }
    const selectHotCity = (code,name) => {
      uni.reLaunch({
        url: `/pages/home/index?code=${code}&name=${name}`
      })
    }
    onMounted(() => {
      //#ifdef H5
      currentPosition.value = curRouteH.name
      //#endif
      //#ifdef APP-PLUS
      currentPosition.value = curRouteApp.name
      // #endif
    })
    return {
      selectCity,
      currentPosition,
      ...toRefs(hotCity),
      selectHotCity
    }
  }
}
</script>
<style lang="scss" scoped>
.city-position, .city-hot {
  .uni-grid-wrap {
    padding: 0 20px;
    box-sizing: border-box;
  }

  h3 {
    color: #3b4144;
    margin-bottom: 10px;
  }

  margin: 20px 0;
  text-indent: 20px;
}

.city-hot {
  .text {
    text-align: center;
    height: 35px;
    line-height: 35px;
  }

  .city-hot-list {
    text-indent: 0;

    ul {
      li {
        padding: 5px 18px;
        background-color: #EDEDED;
        margin: 10px 20px;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
}

.city-position-current {
  background-color: #EDEDED;
  padding: 5px 10px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  margin-left: 20px;
  text-indent: 0;
  border-radius: 5px;
}
</style>
