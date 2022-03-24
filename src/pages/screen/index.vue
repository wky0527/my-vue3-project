<template>
  <view class="screen-wrap">
    <view class="screen-name flex justify-content-spacebetween">
        <span v-for="item in screenName" :key="item.value" @click="handleNameClick(item)" :class="{'active':current === item.value}">
            {{item.label}}
          <icon class="iconfont icon-xiangxia"/>
        </span>
    </view>
    <Screen :positionName="positionName" :controlType="type" :positionData="positionData" @receiveTreeParams="receiveTreeParams" :showTree="showTree"/>
    <uni-list-item :title="item.title" :note="item.description" :thumb="item.img" thumb-size="lg" :rightText="item.rightText" v-for="item in list"/>
    <cascader-select :list="positionData"></cascader-select>
  </view>
</template>
<script>
import {reactive, shallowReactive, toRefs,ref,provide,watch} from "vue";
import {transformTime} from '@/utils/time';
import Screen from '@/components/uni-screen/uni-screen';
import cascaderSelect from '@/components/mayh-cascader/mayh-cascader.vue'
export default {
  components:{Screen,cascaderSelect},
  setup(){
    const screenData = shallowReactive({
       screenName:[
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
       showTree: false
    })
    const type = ref('');
    const positionData = shallowReactive({
      positionName: [{label:'商圈',value:0},{label:'地铁',value:1}],
      positionData:[
        {
          value: 1000,
          label: '东城',
          children: [
            {
              value: 1100,
              label: '灯市口',
              children:[
                {
                  value: 1110,
                  label: '测试',
                },
                {
                  value: 1111,
                  label: '测试1',
                }
              ]
            },
            {
              value: 1101,
              label: '东单'
            }
          ]
        },
        {
          value: 1002,
          label: '朝阳',
          children: [
            {
              value: 1102,
              label: '来广营'
            }
          ]
        },
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
      screenData.showTree = true;
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
    const positionVal = ref('')
    const receiveTreeParams = (params) =>{
     const {name,code,showTree} = params
     screenData.showTree = showTree;
     positionVal.value = name
   }
    return {
      ...toRefs(screenData),
      ...toRefs(positionData),
      ...toRefs(listData),
      positionVal,
      handleNameClick,
      receiveTreeParams,
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
