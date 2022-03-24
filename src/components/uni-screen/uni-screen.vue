<template>
  <view id="uni-screen" v-show="showTree" @click="hideDrawer"></view>
  <view class="uni-screen-position flex" v-if="controlType === 'picker'" v-show="showTree">
    <view class="uni-screen-position-left">
      <p @click="handlePosition(item)" v-for="item in positionName" :key="item.value"
         :class="{'active':current === item.value}">{{ item.label }}</p>
    </view>
    <view class="uni-screen-position-right" v-if="current === 0">
      <view class="position" v-for="(item,index) in positionData" :key="index">
            <span @click="changeTree(item,index)">{{item.name}}</span>
<!--        <tree :tree-data="positionData" ref="childTree" :tree-name="positionName" @treeVal="getTree"/>-->
            <view>
               <tree :treeItem="item.children" />
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
import {reactive, toRefs,ref,provide} from "vue";
import Tree from './uni-tree.vue';
export default {
  components: {Tree},
  props: {
    positionName: {
      type: Array
    },
    controlType: {
      type: String
    },
    positionData: {
      type: Array
    },
    showTree:{
      type: Boolean
    }
  },
  setup(props, {emit}) {
    const isOpen = ref(false);
   // document.addEventListener('click', e => {
   //  if (document.getElementById('uni-screen').contains(e.target)) {
   //  positionConfig.isScreen = false
   //     } else {
   //     positionConfig.isScreen = true
   //   }
   //   })

    const childTree = ref()
    const positionData = reactive(props.positionData)
    const positionConfig = reactive({
      current: 0
    })
    const clickItem = reactive({
      clickItem:{}
    })
    const getTreeVal = reactive({
       treeVal: {}
    })
    const changeTree = (item,index)=>{
      // isOpen.value = !isOpen.value

    }
    const handlePosition = (params) => {
      positionConfig.current = params.value;
    }
    const handleReset = () => {
      childTree.value.resetData()
    }
    const handleSure = () => {
      emit('receiveTreeParams',{...getTreeVal.treeVal,showTree:false})
      uni.showToast({
        title: `提交数据成功+${getTreeVal.treeVal}`
      })

    }
    const getTree = (value) =>{
      getTreeVal.treeVal = value;
    }
    const hideDrawer = () =>{
      emit('receiveTreeParams',{...getTreeVal.treeVal,showTree:false})
    }
    return {
      childTree,
      handleReset,
      handleSure,
      handlePosition,
      getTree,
      getTreeVal,
      hideDrawer,
      changeTree,
      clickItem,
      isOpen,
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
    .position {
      padding-left: 20px;
      align-items: inherit;
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
