<template>
  <uni-nav-bar
      :leftIcon=leftIcon
      :title=title
      :fixed=fixed
      :statusBar=statusBar
      :shadow=shadow
      :height=height
      @clickLeft="clickLeftEvent"
      :showSlot="showSlot"
  >
    <view slot="left" v-if="showSlot === 'left'" class="nav-bar-custom-left">
      <slot name="left"></slot>
    </view>
    <view slot="default" v-if="showSlot === 'center'" class="nav-bar-custom-center">
       <slot name="center"></slot>
    </view>
    <view slot="right" v-if="showSlot === 'right'" class="nav-bar-custom-right">
      <slot name="right"></slot>
    </view>
  </uni-nav-bar>
</template>
<script>
import {onMounted, reactive, toRefs,watch} from "vue";
export default {
  props:{
    showSlot: {
      type: String,
      default: ''
    }
  },
  setup(props,{emit}){
    const navBar = reactive({
      leftIcon: 'left',
      fixed: true,
      statusBar: true,
      shadow: true,
      dark: true,
      title: '标题',
      height: '55px',
      showSlot: props.showSlot,
    })
    const clickLeftEvent = () => {
      uni.reLaunch({url:'/pages/home/index'})
    }
    return {
      ...toRefs(navBar),
      clickLeftEvent
    }
  }
}
</script>
<style lang="scss" scoped>

.nav-bar-custom-center {
  width: 100%;
}

</style>
