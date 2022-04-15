<template>
     <view class="uni-select">
         <ul>
           <li v-for="(item,index) in selectOptions" :class="{'active': index === current}" @tap="handleClick(index,item)">
             <span>{{item.label}}</span>
             <view class="uni-select-slot">
               <slot name="right" v-if="index === current"/>
             </view>
           </li>
         </ul>
     </view>
</template>
<script setup>
import {defineProps,ref,defineEmits} from 'vue'
defineProps({
  selectOptions: {
    type: Array,
    default() {
      return []
    }
  }
})
const current = ref(0)
const emits = defineEmits(['handleClick'])
const handleClick = (index,item) => {
   current.value = index
   emits('selectValue',item)
}
</script>
<style scoped lang="scss">
.uni-select {
  width: 96%;
  margin: 10px auto;
  ul {
    margin: 10px 20px;
    li {
      padding: 10px 0;
      color: #6a6a6a;
      .uni-select-slot {
        float: right;
      }
    }
    .active {
      color: #16C4AF;
      border-bottom: 1px solid #16C4AF;
    }
  }
}
</style>
