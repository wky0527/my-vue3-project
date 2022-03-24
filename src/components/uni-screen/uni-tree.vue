<template>
  <view class="position-tree" v-for="(item,index) in treeItem">
    <span>{{item.name}}</span>
    <view v-if="item.children">
      <tree :tree-item="item.children "/>
    </view>
  </view>
</template>
<script>
import {computed, onMounted, reactive, toRefs, watch,ref,inject} from "vue";

export default {
  name: 'Tree',
  props: {
    treeItem: {
      type: [Object,Array]
    },
    clickItem: {
      type: [Object,Array]
    }
  },
  setup(props,{emit}) {
    const treeItem = reactive(props.treeItem)

    const hasChild = computed(()=>{
       return treeItem.children && treeItem.children.length > 0
    })
    // const changeStatus = (item, index) => {
    //   childConfig.index = index;
    //   treeData[index].status = !treeData[index].status//点击的这个为true
    //   childConfig.openStatus[index] = !childConfig.openStatus[index]
    //   const {name,code} = item;
    //   const treeObj = {
    //     name: name,
    //     code: code
    //   }
    //   emit('treeVal',treeObj)
    // }
    const toggle = (data) => {
      console.log(data)
      if(hasChild){
        // isOpen.value = !isOpen.value
      }
    }
    // const resetData = () =>{
    //   treeData.forEach(item=>{
    //     if(item.children){
    //       resetData(item.children)
    //     }
    //   })
    //   console.log(treeData)
    // }
    return {
      treeItem,
      toggle,
      hasChild,
      // resetData,
    }
  }
}
</script>
<style lang="scss" scoped>
.position-tree {
   border-right: 1px solid #EDEDED;
   padding: 10px 20px;
   position: relative;
  .active {
    color: #16C4AF;
  }
  //.position-parent {
  //  width: max-content;
  //  position: relative;
  //  border-right: 1px solid #EDEDED;
  //  p {
  //    width: 60px;
  //    text-align: left;
  //    padding: 10px 0;
  //  }
  //  .text-active {
  //    color: #16C4AF;
  //    //border-bottom: 2px solid #16C4AF;
  //  }
  //  .text-border, .text, .text-active {
  //    //border-right: 1px solid #EDEDED;
  //  }
  //
  //}
}
.position-children {
  position: absolute;
  right: 65px;
  top: 0;
}

</style>
