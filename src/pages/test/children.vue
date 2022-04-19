<template>
  children
  <slot :pro="name"></slot>
  <view>
    <input type="text" id="input">
    <span id="text"></span>
  </view>
</template>
<script>
import {ref} from 'vue'
const name = ref('children')
const obj = {}
Object.defineProperty(obj,'prop',{
  get: function (val){
    return val
  },
  set: function (newVal){
    val = newVal
    document.getElementById('text').innerHTML = val;
  }
})
// document.addEventListener('keyup',function (e){
//   obj.prop = e.target.value
// })
</script>
