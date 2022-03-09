<template>
  <uni-custom-nav-bar title="订单管理"/>
  <view>
    {{orderData.data}}
  </view>
</template>
<script>
import {index} from "@/api/order.js";
import {onMounted, reactive} from "vue";
export default {
  setup() {
    const orderData = reactive({
      data: []
    });
    const getOrder = async () => {
      const {data: data} = await index()
      orderData.data = data;
    }
    onMounted(()=>{
      getOrder()
    })
    return {
      getOrder,
      orderData
    }
  }
}
</script>
