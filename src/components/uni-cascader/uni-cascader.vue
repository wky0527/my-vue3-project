<template>
  <scroll-view scroll-y="true" class="scroll-y">
    <view class="position-parent" v-for="(optionItem,columnIndex) in allConfig.optionsList" :key="columnIndex">
      <view v-for="(item,index) in optionItem" :key="columnIndex" @tap="handleSelect(item,columnIndex)" :class="{'active': allConfig.selectedValue.code === item.code}"
            class="position-children">
        <text class="position-children-text">{{ item.name }}</text>
      </view>
    </view>
  </scroll-view>
  <view class="uni-screen-btn flex">
    <button class="btn" size="mini" @tap="handleReset">重置</button>
    <button class="btn sure" size="mini" @tap="handleSure">确定</button>
  </view>
</template>
<script setup>
import {onMounted, watch, defineProps, reactive, toRefs,defineEmits} from 'vue';
const props = defineProps({
  value: {
    type: Array,
    default() {
      return []
    }
  },
  //选项数据
  options: {
    type: Array,
    default() {
      return []
    }
  },
})
const allConfig = reactive({
  optionsList: [],//数据
  selectedValue: []//选中的数据
})
const {options, value} = toRefs(props)
const emit = defineEmits(['handleSure'])
//重置事件
const handleReset = () => {
  allConfig.selectedValue = []
  allConfig.optionsList.splice(1, 2)
}
//确认事件
const handleSure = () => {
  emit('optionsValue', {...allConfig.selectedValue, showTree: false})
  uni.showToast({
    title: `提交数据成功`
  })
  handleReset()
}
//级联一级菜单渲染
const handleValue = () => {
  //allConfig.selectedValue = []
  allConfig.optionsList = getOptionsList(props.options)
  // optionsData.selectedValue = val
}
//级联多级菜单递归
const getOptionsList = (data, currentList = []) => {
  if (!data || data.length === 0) return currentList;
  currentList.push(data)
  //if (values.length === 0) return currentList
  // const next = options.find(item => item.value === values[0])
  // const nextValue = values.slice(1)
  // const nextOptions = next.children
  return getOptionsList(null, currentList)
}
//级联选中事件
const handleSelect = (item, columnIndex) => {
  //const selectedValue = allConfig.selectedValue.slice(0,columnIndex)
  const optionsList = allConfig.optionsList.slice(0, columnIndex + 1)//[[]]
  // selectedValue.splice(columnIndex,1,item.value)
  allConfig.selectedValue = item;
  if (item.areaList) optionsList.splice(columnIndex + 1, 1, item.areaList)
  allConfig.optionsList = optionsList;
}
onMounted(() => {
  handleValue()
})
watch(() => options, (val, oldVal) => {
  handleValue()
}, {
  immediate: true,
  deep: true
})

</script>
<style lang="scss" scoped>
.position-parent {
  float: left;
  border-right: 1px solid #EDEDED;

  .position-children {
    padding: 10px 12px;
    width: 70px;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;

    .position-children-text {
      width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .active {
    color: #16C4AF;
  }
}

.uni-screen-btn {
  position: absolute;
  right: 0;
  bottom: 5px;
  float: right;

  .btn {
    margin: 0 10px;
  }

  .sure {
    background-color: #16C4AF;
    color: #fff;
  }
}
</style>
