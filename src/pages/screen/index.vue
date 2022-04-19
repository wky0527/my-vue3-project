<template>
  <view class="screen-wrap">
    <view class="screen-name flex justify-content-spacebetween">
        <span v-for="item in allConfig.screenName" :key="item.value" @click="handleNameClick(item)"
              :class="{'active':current === item.value}">
            {{ item.label }}
          <icon class="iconfont icon-xiangxia"/>
        </span>
    </view>
    <uni-screen :positionName="allConfig.positionName" :controlType="type" :showTree="allConfig.showTree" @choosePosition="handleChoose" :currentName="allConfig.current"/>
    <uni-list-item v-for="(item,index) in allConfig.list" :title="item.title" :note="item.description" :thumb="item.img" thumb-size="lg" :key=index
                   :rightText="item.rightText"/>
  </view>
</template>
<script setup>
import {reactive, ref, onMounted, provide} from "vue";
import {transformTime} from '@/utils/time';

const type = ref('')
const allConfig = reactive({
  screenName: [
    {
      value: 0,
      label: '位置'
    },
    {
      value: 1,
      label: '性别'
    },
    {
      value: 2,
      label: '价格'
    },
    {
      value: 3,
      label: '筛选'
    },
  ],
  current: 0,
  showTree: false,
  positionName: [{label: '商圈', value: 0}, {label: '地铁', value: 1}],
  positionData: [],
  list: [
    {
      title: 'wky',
      description: '越努力越幸运',
      img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
      rightText: transformTime(new Date())
    },
    {
      title: 'wky',
      description: '越努力越幸运',
      img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
      rightText: transformTime(new Date())
    },
    {
      title: 'wky',
      description: '越努力越幸运',
      img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
      rightText: transformTime(new Date())
    },
    {
      title: 'wky',
      description: '越努力越幸运',
      img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
      rightText: transformTime(new Date())
    }
  ]
})
const handleNameClick = (params) => {
  allConfig.current = params.value
  allConfig.showTree = true;
  switch (params.value) {
    case 0:
      type.value = 'picker'
      break;
    case 1:
      type.value = 'tag'
      break;
    case 2:
      type.value = 'select'
      break;
    default:
      type.value = 'tag'
      break;
  }
}
const getData = () => {
  uni.request({
    url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json',
    success: (res) => {
      allConfig.positionData = res.data
    }
  })
}
const handleChoose = (params) => {
  const {name, code, showTree} = params
  allConfig.showTree = showTree;
  console.log(params)
}
provide('cascaderData', allConfig)
onMounted(() => {
  getData()
})
</script>
<style lang="scss" scoped>
.screen-wrap {
  .screen-name {
    width: 100%;
    margin: auto;
    background-color: #EDEDED;
    padding: 10px 15px;
    box-sizing: border-box;
    //position: fixed;
    //left: 0;
    //top: 50px;
    .active {
      color: #16C4AF;
    }
  }
}
</style>
