<template>
  <view>parent</view>
<!--  <Children>-->
<!--    <p>插槽的name是{{name}}</p>-->
<!--  </Children>-->
  <Demo></Demo>
 <Children>
   <template v-slot:pro>
     <p>插槽的name {{ pro }}</p>
   </template>
 </Children>
  <view class="container">
    <text>{{appear ? '小球出现' : '小球消失'}}</text>
    <view class="page-section">
      <scroll-view class="scroll-view" scroll-y>
        <view class="scroll-area">
          <text class="notice">向下滚动让小球出现</text>
          <view class="ball"></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script setup>
import Children from './children.vue'
import {ref,getCurrentInstance} from 'vue'
import {onReady,onUnload} from "@dcloudio/uni-app";
let observer = null;
const name = ref('parent')
const appear = ref(false)
const _this = getCurrentInstance();
// uni.createIntersectionObserver(_this).relativeTo('.scroll-view').observe('.ball',(res)=>{
//   console.log(res)
// })
</script>
<style>
view,page {
  display: flex;
  flex-direction: column;
}

.scroll-view {
  height: 400px;
  background: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.scroll-area {
  height: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: .5s;
}

.notice {
  margin-top: 150px;
  margin: 150px 0 400px 0;
}

.ball {
  width: 200px;
  height: 200px;
  background: #1AAD19;
  border-radius: 50%;
}
</style>
