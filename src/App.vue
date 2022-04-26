<template>
  <web-view  :webview-styles="webviewStyles" src="http://10.1.129.232:50749/system/ping"></web-view>
</template>
<script>
import {getAccessToken} from "@/utils/auth";
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: '#FF3333'
        }
      }
    }
  },
  onLaunch: function () {
    if (!getAccessToken) {
      uni.reLaunch({url:'/pages/login/index'})
    } else {
      this.$store.dispatch('config/inits');
    }
  },
  onShow: function () {

  },
  onHide: function () {

  },
}
</script>

<style lang="scss">
//@import url("https://at.alicdn.com/t/font_3191869_kajrvxwfdne.css");
.uni-nav-bar-text {
  font-size: 16px!important;
}
.uni-navbar-btn-text {
  line-height: 50px!important;
  height: 50px;
  span {
    font-size: 16px!important;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100px;
    display: inline-block;
    font-weight: 600;
  }
}
/*每个页面公共css */
</style>
