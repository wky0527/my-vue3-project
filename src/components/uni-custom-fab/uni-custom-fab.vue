<template>
  <uni-fab
      :content="content"
      :direction="direction"
      @trigger="trigger"
      @fabClick="fabClick"
  />
</template>
<script>
import {reactive, toRefs,onMounted} from "vue";
export default {
  setup() {
    const fabConfig = reactive({
      content: [
        {
          text: '首页',
          iconPath: '/static/images/home.png',
          selectedIconPath: '/static/images/selectHome.png',
          active: true,
          tabName: 'home',
          path: 'pages/home/index'
        },
        {
          text: '订单管理',
          iconPath: '/static/images/order.png',
          selectedIconPath: '/static/images/selectOrder.png',
          active: false,
          tabName: 'order',
          path: 'pages/order/index'
        },
        {
          text: '商户管理',
          iconPath: '/static/images/business.png',
          selectedIconPath: '/static/images/selectBusiness.png',
          active: false,
          tabName: 'business',
          path: 'pages/business/index'
        },
        {
          text: '设置管理',
          iconPath: '/static/images/setting.png',
          selectedIconPath: '/static/images/selectSetting.png',
          active: false,
          tabName: 'setting',
          path: 'pages/setting/index'
        }
      ],
      direction: 'vertical'
    })
    const trigger = (e) => {
      fabSkipNav(e)
    }
    const fabSkipNav = (e) => {
      let tabName = '';
      switch (e.index) {
        case 0:
        case 1:
        case 2:
        default:
          tabName = e.item.tabName
          break;
      }
      uni.switchTab({url:`/pages/${tabName}/index`})
    }
    const fabClick = () => {
      const router = getCurrentPages()
      fabConfig.content.filter(value => value.active = (router[0].route == value.path ))
    }
    onMounted(()=>{
      // uni.hideTabBar();
    })
    return {
      ...toRefs(fabConfig),
      trigger,
      fabSkipNav,
      fabClick
    }
  }
}
</script>
