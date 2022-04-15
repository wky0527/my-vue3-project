<template>
  <view id="uni-screen" v-show="showTree" @click="hideDrawer"></view>
  <view class="uni-screen-position picker flex" v-if="controlType === 'picker'" v-show="showTree">
    <view class="uni-screen-position-left">
      <p @click="handlePosition(item)" v-for="item in positionName" :key="item.value"
         :class="{'active':current === item.value}">{{ item.label }}</p>
    </view>
    <view class="uni-screen-position-right flex" v-if="current === 0">
      <uni-cascader :options="data.positionData" @optionsValue="receiveCascader"/>
    </view>
  </view>
  <view class="uni-screen-position sexTag flex" v-else-if="currentName === 1 && controlType === 'tag'" v-show="showTree">
    <view v-for="(item,index) in sexTag" :key="item.value" class="uni-screen-tag">
      <uni-tag :text="item.label" :inverted="inverted" @handleTagClick="handleTagClick(index)"
               :class="{'active': index === active}"/>
    </view>
  </view>
  <view class="uni-screen-position  flex" v-else-if="controlType === 'select'" v-show="showTree">
    <uni-select :selectOptions="formatPriceRange(priceRange)" @selectValue="receiveSelect">
      <template v-slot:right>
        <icon class="iconfont icon-duihao"/>
      </template>
    </uni-select>
  </view>
  <view class="uni-screen-position screenTag flex" v-else-if="currentName === 3 && controlType === 'tag'" v-show="showTree">
     <view v-for="(item,index) in screenTag" :key="item.id" class="uni-screenTag">
       <h3>{{ item.title }}</h3>
      <view class="flex">
        <uni-tag v-for="(items,ind) in item.tag" :key="item.value" :text="items.label" :inverted="inverted"
                 @handleTagClick="handleTagClick(items.value)" :class="{'active': items.value === active}"/>
      </view>
     </view>
  </view>
</template>
<script lang="ts" setup>
import {inject, defineProps, defineEmits, ref, computed} from "vue";
import store from "@/store";
// document.addEventListener('click', e => {
// if (document.getElementById('uni-screen').contains(e.target)) {
// positionConfig.isScreen = false
//    } else {
//    positionConfig.isScreen = true
//  }
//  })
const props = defineProps({
  positionName: {
    type: Array
  },
  controlType: {
    type: String
  },
  showTree: {
    type: Boolean
  },
  currentName: {
    type: Number
  }
})
const current = ref(0)
const inverted = ref(true)
const active = ref(0)
const sexTag = ref([
  {
    label: '不限',
    value: 0
  },
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  }
])
const data = inject('cascaderData')
const emits = defineEmits(['hideDrawer', 'receiveValue'])
const handlePosition = (params) => {
  current.value = params.value;
}
//遮罩点击事件（兼容app）
const hideDrawer = () => {
  emits('choosePosition', {showTree: false})
}
const handleTagClick = (items) => {
  active.value = items
  //请求后端搜索接口传递参数
}
const receiveCascader = (params) => {
  const {code, name, showTree} = params
  emits('choosePosition', params)
}
const screenTag = computed(() => store.getters.config['screen_type'])
const priceRange =  computed(() => store.getters.config['price_range'])
const formatPriceRange = () => {
  return priceRange.value.map(item=>{
     if(item.max_price){
       return {label: item.min_price+ '-' + item.max_price,value: item.id}
     }else{
       return {label: item.min_price, value: item.id}
     }
  })
}
const receiveSelect = (params) => {
   //请求后端搜索接口
}
</script>
<style lang="scss" scoped>
#uni-screen {
  position: absolute;
  top: 43px;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 99;
}

.uni-screen-position {
  background-color: #fff;
  align-items: inherit;
  width: 100%;
  //height: 500px;
  position: absolute;
  left: 0;
  z-index: 99;
  overflow: hidden;
  padding-bottom: 20px;
  .uni-screen-position-left {
    background-color: #ececec;
    padding: 10px 25px;

    p {
      margin: 20px auto;
      width: max-content;
    }

    .active {
      color: #16C4AF;
      border-bottom: 2px solid #16C4AF;
    }
  }

  .uni-screen-position-right {
    width: 100%;
    overflow: scroll;
    align-items: inherit;
  }
}

.sexTag,.screenTag {
  height: auto;

  .uni-screen-tag {
    width: 96%;
    margin: 10px auto;
    padding: 10px 0;
  }

  .active {
    background-color: #16C4AF;
    color: #fff;
  }
}
.screenTag {
  display: inline;
  h3 {
    margin: 10px 20px;
    font-weight: 400;
    font-size: 16px;
    color: #6a6a6a;
  }
  .uni-tag {
    color: #6a6a6a;
    font-size: 14px;
  }
}
</style>
