<template>
  <view class="home-wrap">
    <uni-status-bar>
      <view class="home-main">
        <text>hello, {{userName}}</text>
        <view class="home-address" @click="getAddress">
          <button type="primary" plain="true">点我获取地理位置哦</button>
          <p class="home-address-current">当前位置为：{{ addressVal }}</p>
        </view>
        <canvas canvas-id="canvas" id="canvas" style="width:500px; height:300px" @longpress="longPress"/>
        <text class="home-text flex justify-content-center">请扫码授权哦～😄</text>
      </view>
    </uni-status-bar>
  </view>
</template>
<script>
import {reactive, toRefs, ref, onMounted} from 'vue';
import {useLocation, useDrawQrCode, useScanCode} from "@/composables/useUniAPi.js";
import {useStore} from 'vuex';

export default {
  setup() {
    const addressVal = ref('');
    const userName = ref('');
    const {getDrawQrCode} = useDrawQrCode();
    const {getLocation} = useLocation();
    const {allScanCode} = useScanCode()
    const {dispatch} = useStore();
    onMounted(() => {
      getDrawQrCode()
      getUserInfo()
    })
    const getAddress = () => {
      getLocation().then(res => {
        const {longitude, name, latitude, address} = res;
        addressVal.value = address;
      }).catch(err => {
        console.log(err)
      })
    }
    const longPress = () => {
      console.log('长按事件')
      allScanCode().then(res => {
        const {scanType, result} = res;
        const urlStr = encodeURI(result)
        plus.runtime.openURL(urlStr)
      }).catch(err => {
        console.log(err)
      })
    }
    const getUserInfo = async() => {
      try{
        const {data:data} = await dispatch('user/userInfo')
        return data.map(item=>{
          userName.value = item.data['real_name']
         })
      }catch (e){
        console.log(e)
      }
    }
    return {
      addressVal,
      getAddress,
      longPress,
      getUserInfo,
      userName
    }
  }
}
</script>
<style lang="scss" scoped>
.home-main {
  width: 80%;
  margin: 30px auto;
  .home-address {
    margin: 30px 0;
    .home-address-current {
      line-height: 50px;
    }
  }
}
</style>
