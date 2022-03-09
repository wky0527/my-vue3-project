<template>
  <uni-custom-nav-bar title="设置管理"/>
  <uni-list-item
      title="列表左侧带略缩图"
      note="列表描述信息"
      thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
      thumb-size="lg"
      link/>
   <button type="primary" class="setting-logout" @click="logout">退出登录</button>
</template>
<script>
import {useStore} from 'vuex';
export default {
  setup() {
    const {dispatch} = useStore()
    const logout = async () => {
      try {
        await dispatch('user/logout')
        location.reload();
      }catch (e){
        uni.showToast({
          title: '退出登录失败',
          icon: 'error'
        })
      }
    }
    return {
      logout
    }
  }
}
</script>
<style scoped lang="scss">
.setting-logout {
  width: 100%;
  position: fixed;
  bottom: var(--window-bottom,0);
  left: 0;
}
</style>
