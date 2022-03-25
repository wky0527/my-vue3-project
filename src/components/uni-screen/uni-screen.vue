<template>
  <view id="uni-screen" v-show="showTree" @click="hideDrawer"></view>
  <view class="uni-screen-position flex" v-if="controlType === 'picker'" v-show="showTree">
    <view class="uni-screen-position-left">
      <p @click="handlePosition(item)" v-for="item in positionName" :key="item.value"
         :class="{'active':current === item.value}">{{ item.label }}</p>
    </view>
    <view class="uni-screen-position-right" v-if="current === 0">
      <view class="position-parent" v-for="(options,columnIndex) in optionsList" :key="columnIndex">
           <view v-for="(item,index) in options" :key="index" @tap="handleSelect(item,columnIndex)" :class="{'active': selectedValue[columnIndex] === item.value}" class="position-children">
              <text>{{item.label}}</text>
           </view>
      </view>
      <view class="uni-screen-btn flex">
        <button class="btn" size="mini" @click="handleReset">重置</button>
        <button class="btn sure" size="mini" @click="handleSure">确定</button>
      </view>
    </view>
  </view>
  <!--     <view class="uni-screen-position" v-else-if="controlType === 'tabs'">-->
  <!--         tabs-->
  <!--     </view>-->
  <!--     <view v-else-if="controlType === 'select'">-->
  <!--        select-->
  <!--     </view>-->
</template>
<script>
import {reactive, toRefs, onMounted} from "vue";
export default {
  props: {
    positionName: {
      type: Array
    },
    controlType: {
      type: String
    },
    value: {
      type: Array,
      default(){
        return []
      }
    },
    //选项数据
    options: {
      type: Array,
      default(){
        return []
      }
    },
    showTree:{
      type: Boolean
    }
  },
  setup(props, {emit}) {
    // document.addEventListener('click', e => {
    // if (document.getElementById('uni-screen').contains(e.target)) {
    // positionConfig.isScreen = false
    //    } else {
    //    positionConfig.isScreen = true
    //  }
    //  })
    const options = reactive({
      optionsList:[],//数据
      selectedValue:[],//选中的数据
    })
    const propOptions = reactive(props.options)
    const value = reactive(props.value)
    const positionConfig = reactive({
      current: 0
    })
    const handlePosition = (params) => {
      positionConfig.current = params.value;
    }
    //重置事件
    const handleReset = () => {
      options.selectedValue = []
      options.optionsList.splice(1,2)
    }
    //确认事件
    const handleSure = () => {
      emit('optionsValue',{...options.selectedValue,showTree:false})
      uni.showToast({
        title: `提交数据成功`
      })
    }
    //遮罩点击事件（兼容app）
    const hideDrawer = () =>{
      emit('optionsValue',{...options.selectedValue,showTree:false})
    }
    //级联一级菜单渲染
    const handleValue = (val) =>{
       options.selectedValue = []
       options.optionsList = getOptionsList(val,propOptions)
       options.selectedValue = val
    }
    //级联多级菜单递归
    const getOptionsList = (values,options,currentList = []) =>{
      currentList.push(options)
      if(!options || options.length === 0) return currentList;
      if (values.length === 0) return currentList
      return getOptionsList(...currentList)
    }
    //级联选中事件
    const handleSelect = (item,columnIndex) =>{
      const selectedValue = options.selectedValue.slice(0,columnIndex)
      const optionsList = options.optionsList.slice(0,columnIndex+1)//[[]]
      selectedValue.splice(columnIndex,1,item.value)
      options.selectedValue = selectedValue;
      if(item.children) optionsList.splice(columnIndex+1,1,item.children)
      options.optionsList = optionsList;
    }
    onMounted(()=>{
      handleValue(value)
    })
    return {
      handleReset,
      handleSure,
      handlePosition,
      hideDrawer,
      handleValue,
      getOptionsList,
      propOptions,
      value,
      handleSelect,
      ...toRefs(options),
      ...toRefs(positionConfig)
    }
  }
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
  height: 500px;
  position: absolute;
  left: 0;
  z-index: 99;
  overflow: hidden;

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
      .position-parent {
        float: left;
        border-right: 1px solid #EDEDED;
        .position-children {
          padding: 10px 20px;
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
  }
}

</style>
