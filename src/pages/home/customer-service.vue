<template>
  <view class="customer-wrap" ref="box">
    <view v-for="item in list.data" :class="[item.type,'msg-item']">
      <p v-show="item.type === 'mine'" class="flex">
        <span class="customer-mine multipleLine">{{ item.content }}</span>
        <img style="width: 40px; height: 40px;border-radius: 50%;vertical-align: middle;margin-right: 5px"
             :src="list.mineImg"/>
      </p>
      <p v-show="item.type === 'robot'" class="flex">
        <img style="width: 40px; height: 40px;border-radius: 50%;vertical-align: middle;margin-right: 5px"
             :src="list.robotImg"/>
        <span class="customer-robot multipleLine">{{ item.content }}</span>
      </p>
    </view>
  </view>
  <view class="customer-input flex">
    <uni-search-bar :radius="100" v-model="list.contentText" class="customer-search" placeholder="请在这里输入你的问题"/>
    <button type="default" @click="sendText" class="customer-button">发送</button>
  </view>

</template>
<script setup>
import {onMounted,reactive,ref} from "vue";
import {onUnload} from '@dcloudio/uni-app';
const list = reactive({
  data: [],
  contentText: '',
  mineImg: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png',
  robotImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.qqkou.com%2Fi%2F1a470857894x3776062555b26.jpg&refer=http%3A%2F%2Fi.qqkou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649569611&t=22e4bcf8e022ed3944648bab5719e2b7'
})
const socketOpen = ref(false)
const socketMsgQueue = ref([]);
const sendText = () => {
 // list.data = [...list.data, {type: 'mine', content: list.contentText}]
  sendSocketMessage(list.data)
  list.contentText = ''
}
uni.connectSocket({
  url: 'ws://127.0.0.1:8002',
})
uni.onSocketOpen(function (res){
  console.log('websocket连接已打开！')
  socketOpen.value = true;
  for(const i=0;i<socketMsgQueue.value.length;i++){
    sendSocketMessage(socketMsgQueue.value[i])
  }
  socketMsgQueue.value = []
})
const sendSocketMessage = (msg) =>{
  if(socketOpen.value){
    uni.sendSocketMessage({
      data: list.contentText
    })
    list.data = [...list.data,{type: 'mine',content: list.contentText}]
  }else{
    socketMsgQueue.value.push(msg)
  }
}
uni.onSocketError(function (res){
  console.log('websocket连接打开失败，请检查！')
})
uni.onSocketMessage(function (res){
  list.data = [...list.data,{type: 'robot',content: res.data}]
  console.log('收到服务器内容'+res.data)
})

</script>
<style lang="scss" scoped>

.customer-wrap {
  width: 95%;
  height: 100%;
  margin: 20px auto;

  .msg-item {
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;

    .customer-mine, .customer-robot {
      padding: 12px 15px;
      box-sizing: border-box;
      background-color: #4cd964;
      margin-right: 5px;
      border-radius: 10px;
      display: inline-block;
      width: auto;
    }

    .customer-robot {
      background-color: #eeeeee;
    }
  }

  .mine {
    p {
      float: right;
    }
  }
}

.customer-input {
  position: fixed;
  bottom: 3px;
  left: 0;
  width: 100%;
  background-color: #eeeeee;
  height: 60px;
  line-height: 60px;

  .customer-search {
    width: 75%;

    ::v-deep.uniui-search {
      display: none;
    }
  }

  .customer-button {
    background-color: #16C4AF;
    color: #fff;
  }
}
</style>
