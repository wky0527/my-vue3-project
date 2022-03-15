<template>
  <uni-nav-bar
      :leftIcon=leftIcon
      :title=title
      :fixed=fixed
      :statusBar=statusBar
      :shadow=shadow
      :height=height
      :rightIcon=rightIcon
      @clickLeft="clickLeftEvent"
      @clickRight="clickRightEvent"
  />
</template>
<script>
import {reactive, toRefs} from "vue";
export default {
  setup(props,{emit}){
    const navBar = reactive({
      leftIcon: 'left',
      fixed: true,
      statusBar: true,
      shadow: true,
      dark: true,
      title: '标题',
      height: '55px',
      rightIcon:'',
    })
    const clickLeftEvent = () => {
      uni.switchTab({url:'/pages/home/index'})
    }
    const clickRightEvent = () => {
      console.log('点击了')
    }
    return {
      ...toRefs(navBar),
      clickLeftEvent,
      clickRightEvent
    }
  }
}
</script>
<style lang="scss" scoped>

.nav-bar-custom-center {
  width: 100%;
}

</style>
