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
</template>
<script setup>
import Children from './children.vue'
import {ref} from 'vue'
const name = ref('parent')
</script>
