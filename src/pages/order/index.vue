<template>
  <uni-nav-bar title="订单管理"/>
  <view>
    {{orderData}}
  </view>
</template>
<script setup>
import {index} from "@/api/order.js";
import {onMounted, ref} from "vue";;
const orderData = ref([])
const getOrder = async () => {
  const {data: data} = await index()
  orderData.data = data;
}
onMounted(()=>{
  getOrder()
})
</script>
