<template>
  <view class="screen-wrap">
    <view class="screen-name flex justify-content-spacebetween">
        <span v-for="item in screenName" :key="item.value" @click="handleNameClick(item)" :class="{'active':current === item.value}">
            {{item.label}}
          <icon class="iconfont icon-xiangxia"/>
        </span>
    </view>
    <uni-screen :positionName="positionName" :controlType="type" :positionData="positionData"/>
    <uni-list-item :title="item.title" :note="item.description" :thumb="item.img" thumb-size="lg" :rightText="item.rightText" v-for="item in list"/>
  </view>
</template>
<script>
import {reactive, shallowReactive, toRefs,ref} from "vue";
import {transformTime} from '@/utils/time';
export default {
  setup(){
    const screenData = shallowReactive({
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
    })
    const type = ref('');
    const positionData = shallowReactive({
      positionName: [{label:'商圈',value:0},{label:'地铁',value:1}],
      positionData:[
        {
          code: 1000,
          name: '东城',
          children: [
            {
              parentCode: 1000,
              code: 1100,
              name: '灯市口'
            },
            {
              parentCode: 1000,
              code: 1101,
              name: '东单'
            }
          ]
        },
        {
          code: 1001,
          name: '西城'
        },
        {
          code: 1002,
          name: '朝阳',
          children: [
            {
              parentCode: 1002,
              code: 1102,
              name: '来广营'
            }
          ]
        },
        {
          code: 1003,
          name: '昌平'
        },
        {
          code: 1004,
          name: '东城'
        },
        {
          code: 1005,
          name: '西城'
        },
        {
          code: 1006,
          name: '朝阳'
        },
        {
          code: 1007,
          name: '昌平'
        }
      ]
    })
    const listData = shallowReactive({
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
    const handleNameClick  = (params)=>{
      screenData.current = params.value
       switch (params.value){
         case 0:
               type.value = 'picker'
               break;
         case 1:
               type.value = 'tabs'
               break;
         case 2:
               type.value = 'select'
               break;
         default:
           break;
       }
    }
    return {
      ...toRefs(screenData),
      ...toRefs(positionData),
      ...toRefs(listData),
      handleNameClick,
      type
    }
  }
}
</script>
<style lang="scss" scoped>
.screen-wrap {
  .screen-name {
    width: 100%;
    margin: auto;
    background-color: #EDEDED;
    padding: 10px 15px;
    box-sizing: border-box;
    .active {
      color: #16C4AF;
    }
  }
}
</style>
