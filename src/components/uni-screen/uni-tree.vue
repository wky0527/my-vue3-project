<template>
  <view class="position-tree">
    <view v-for="(item,index) in treeData" :key="item.code" class="position-parent">
      <p @click="changeStatus(item,index)" :class="isOpen(item)" class="singleLine">
        {{ item.name }}
      </p>
      <view class="position-children">
        <Tree v-if="openStatus[index]" :treeData="item.children"/>
        <view v-if="item.empty">
          <p class="position-children-empty">暂无数据</p>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import {computed, onMounted, reactive, toRefs, watch,ref,inject} from "vue";

export default {
  name: 'Tree',
  props: {
    treeData: {
      type: Array
    },
  },
  setup(props,{emit}) {
    const treeData = reactive(props.treeData)
    const childConfig = reactive({
      index: 0,
      openStatus: [],
      empty: false
    })
    const changeStatus = (item, index) => {
      childConfig.index = index;
      treeData[index].status = !treeData[index].status//点击的这个为true
      childConfig.openStatus[index] = !childConfig.openStatus[index]
      const {name,code} = item;
      const treeObj = {
        name: name,
        code: code
      }
      emit('treeVal',treeObj)
    }
    const getStatus = () => {
      if (treeData) {
        treeData.map((item, index) => {
          if (childConfig.index === index) {
            if (item.children) {
              childConfig.openStatus[index] = true;
              item.status = true;
            } else {
              treeData[index].empty = true
            }
          } else {
            childConfig.openStatus[index] = false;
            item.status = false;
            item.empty = false
          }
        })
      }
    }
    watch(treeData, () => {
      getStatus();
    })
    const isOpen = computed(() => {
      return function (item) {
        if (item.status && item.children) {
          return 'text-active'
        }
        if (!item.children) {
          return 'text-border'
        }
        if (!item.status) {
          return 'text'
        }
      }
    })
    onMounted(() => {
      // getStatus()
    })
    return {
      treeData,
      changeStatus,
      getStatus,
      isOpen,
      ...toRefs(childConfig),
    }
  }
}
</script>
<style lang="scss" scoped>
.position-tree {
  //border-right: 1px solid #EDEDED;
  .position-parent {
    width: max-content;
    position: relative;

    p {
      width: 60px;
      text-align: center;
      padding: 10px 0;
    }

    .text-active {
      color: #16C4AF;
      border-bottom: 2px solid #16C4AF;
    }

    .text-border, .text, .text-active {
      border-right: 1px solid #EDEDED;
    }

    .position-children {
      position: absolute;
      left: 90px;
      top: 0;

      .position-children-empty {
        width: max-content;
      }
    }
  }
}

</style>
