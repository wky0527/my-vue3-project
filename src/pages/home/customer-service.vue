<template>
  <uni-custom-nav-bar
      title="客服咨询"
  />
  <view class="customer-wrap" ref="box">
    <view v-for="item in data" :class="[item.type,'msg-item']">
      <p v-show="item.type === 'mine'" class="flex">
        <span class="customer-mine multipleLine">{{ item.content }}</span>
        <img style="width: 40px; height: 40px;border-radius: 50%;vertical-align: middle;margin-right: 5px"
             :src="mineImg"/>
      </p>
      <p v-show="item.type === 'robot'" class="flex">
        <img style="width: 40px; height: 40px;border-radius: 50%;vertical-align: middle;margin-right: 5px" :src="robotImg"/>
        <span class="customer-robot multipleLine">{{ item.content }}</span>
      </p>
    </view>
  </view>
  <view class="customer-input flex">
    <uni-search-bar :radius="100" v-model="contentText" class="customer-search" placeholder="请在这里输入你的问题"/>
    <button type="default" @click="sendText" class="customer-button">发送</button>
  </view>

</template>
<script>
import {onMounted, reactive, toRefs} from "vue";
import {onUnload} from '@dcloudio/uni-app';
export default {
  setup() {
    const list = reactive({
      data: [],
      contentText: '',
      mineImg: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png',
      robotImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.qqkou.com%2Fi%2F1a470857894x3776062555b26.jpg&refer=http%3A%2F%2Fi.qqkou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649569611&t=22e4bcf8e022ed3944648bab5719e2b7'
    })
    const websocketConfig = reactive({
       socketTask: null,
       isOpenSocket: false, //避免重复链接
       url: 'ws://127.0.0.1:8002',
       followFlake: false,//心跳检测
       timeout: 3000,//多少秒执行检测
       connectNum: 1,//重连次数
       heartbeatInterval: null,//检测服务端是否还在
       reconnectTimeOut: null//重连之后多久再次重连
    })
    const sendText = () => {
       list.data = [...list.data, {type: 'mine', content: list.contentText}]
       connectSocketInit();
    }
    onMounted(()=>{
      //connectSocket()
      connectSocketInit()
    })
    const connectSocketInit = (data) => {
      websocketConfig.socketTask = uni.connectSocket({
        url: websocketConfig.url,
        success: ()=>{
          console.log('正准备建立websocket中...')
          uni.onSocketMessage(function (res){
            console.log('收到服务器内容：'+res.data)
            list.data = [...list.data, {type: 'robot', content: res.data}]
          })
          return websocketConfig.socketTask
        }
      })
      send()
      uni.onSocketError(function (err){
        console.log('websocket连接失败，请检查')
        websocketConfig.socketTask = null;
        websocketConfig.isOpenSocket = false;
        clearInterval(websocketConfig.heartbeatInterval)
        clearInterval(websocketConfig.reconnectTimeOut)
        uni.$off('getPositonsOrder')
        if(websocketConfig.connectNum < 6){
          uni.showToast({
            title: `websocket连接失败，正在尝试第${websocketConfig.connectNum}次连接`,
            icon: 'none'
          })
          reconnect();
          websocketConfig.connectNum+=1
        }else{
          uni.$emit('connectError')
          websocketConfig.connectNum = 1
        }
      })
    }
    const startHeart = () =>{
      websocketConfig.heartbeatInterval = setInterval(()=>{
        send();
      },websocketConfig.timeout)
    }
    const reconnect = () =>{
      clearInterval(websocketConfig.heartbeatInterval);
      if(!websocketConfig.isOpenSocket && websocketConfig.followFlake){
          websocketConfig.reconnectTimeOut = setInterval(()=>{
            connectSocketInit()
          },1000)
      }
    }
    const send = () => {
      if(websocketConfig.socketTask){
        websocketConfig.socketTask = uni.onSocketOpen(function (res){
          websocketConfig.connectNum = 1
          console.log(res,'websocket连接正常')
          uni.sendSocketMessage({
            data: '这里是发送给客户端的消息'
          })
          clearInterval(websocketConfig.reconnectTimeOut)
          clearInterval(websocketConfig.heartbeatInterval)
          websocketConfig.isOpenSocket = true;
          startHeart();
          uni.onSocketMessage(function (res){
            console.log('收到服务器内容：'+res.data)
            list.data = [...list.data, {type: 'robot', content: res.data}]
          })
        })
      }
    }
    onUnload(()=>{
      socketClose();
    })
    const socketClose = ()=>{
      websocketConfig.connectNum =1;
      uni.onSocketClose(function (res){
        if(!websocketConfig.isOpenSocket){
          return
        }
        uni.showToast({
          title: '关闭websocket成功'
        })
      })
    }
    const connectSocket = () =>{
      // uni.connectSocket({
      //   url: 'ws://127.0.0.1:8002',
      //   complete: function (res){
      //     console.log(res)
      //   },
      //   fail:function (err){
      //     console.log('websocket失败')
      //   },
      //   success: function (res){
      //     // getSucInfo()
      //
      //   }
      // })
      // uni.onSocketOpen(function (res) {
      //   console.log('WebSocket连接已打开！');
      //   uni.sendSocketMessage({
      //     data: '发送给客户端的消息'
      //   })
      //   // uni.closeSocket()
      // })
      // uni.onSocketError(function (res) {
      //   console.log('WebSocket连接打开失败，请检查！');
      // });
      // uni.onSocketMessage(function (res){
      //   console.log('收到服务器内容:'+res.data)
      //   list.data = [...list.data, {type: 'robot', content: res.data}]
      // })
      // uni.onSocketClose(function (res){
      //   console.log('WebSocket 已关闭')
      // })
    }
    // const getSucInfo = () =>{
    //   uni.onSocketOpen(function (res) {
    //     console.log('打开链接',res)
    //     uni.sendSocketMessage({
    //           data: '我是客户端发送的消息',
    //           success:function (res){
    //             console.log(res)
    //           }
    //         }
    //     )
    //     uni.onSocketMessage(function (res){
    //       console.log('收到服务器内容:'+res.data)
    //       list.data = [...list.data, {type: 'robot', content: res.data}]
    //     })
    //   });
    //   uni.onSocketError(function (err){
    //     console.log('websocket连接打开失败，请检查')
    //   })
    //   uni.onSocketClose(function (res){
    //     console.log('websocket连接关闭')
    //   })
    // }
    return {
      ...toRefs(list),
      sendText,
      ...toRefs(websocketConfig)
    }
  }
}
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
