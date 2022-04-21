<template>
  <uni-nav-bar
      title="家长天地"
      rightIcon="more"
      leftIcon="back"
      @clickLeft="clickLeft"
  />
  <view class="parent-world-wrap">
    <h3>孩子沉迷游戏怎么办？我做了这四点拯救了儿子</h3>
    <view class="parent-world-main">
      <uni-card title="基础卡片" sub-title="副标题" extra="额外信息"
                thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
        <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
      </uni-card>
      <uni-card cover="https://yan.zxx1359.top/chenmi/assets/img/banner.786d0e93.jpg">
        <img src="https://yan.zxx1359.top/chenmi/assets/img/banner.786d0e93.jpg" alt="">
      </uni-card>
      <h3>评论列表：</h3>
      <view v-if="listData.length>0">
        <uni-list-item v-for="(item,index) in listData" :key="index" :title="item['name']" :note="item['description']" :thumb="item['img']"
                       thumb-size="lg" :rightText="item['time']"/>
      </view>
      <view v-else>
        这里没有评论哦～
      </view>
    </view>
  </view>
  <view class="comment-btn flex" v-if="comment">
    <uni-easyinput v-model="commentText" placeholder="请输入内容" />
    <button type="default" @click="handleComment">评论</button>
  </view>
  <view slot="actions" class="card-actions flex justify-content-center" v-else>
    <view class="card-actions-item" @click="actionsClick('分享')">
      <uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
      <text class="card-actions-item-text">分享</text>
    </view>
    <view class="card-actions-item" @click="actionsClick('点赞')">
      <uni-icons type="heart" size="18" color="#999" :class="giveThumbsUp ? 'thumbs-active':'uni-icon-heart'"></uni-icons>
      <text class='card-actions-item-text'>点赞</text>
    </view>
    <view class="card-actions-item" @click="actionsClick('评论')">
      <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
      <text class="card-actions-item-text">评论</text>
    </view>
  </view>
</template>
<script setup>
import {reactive, ref, toRefs,shallowReactive} from "vue";
import {transformTime} from '@/utils/time.js';
import {useNavBar} from "@/composables/useNavBar.js";
const commentList = reactive({
  listData: [],
  commentText: '',//评论内容
  listText: '',//
  giveThumbsUp: false, //是否点赞
  comment: false //是否评论
})
const {listData,commentText,listText,giveThumbsUp,comment} = toRefs(commentList)
// const onPullDownRefresh = () =>{
//   console.log('refresh');
//   setTimeout(function () {
//     uni.stopPullDownRefresh();
//   }, 1000);
// }
const actionsClick = (params) => {
  switch (params){
    case '分享':
      handleShare();
      break;
    case '点赞':
      commentList.giveThumbsUp = !commentList.giveThumbsUp;
      break;
    case '评论':
      commentList.commentText = '';
      commentList.comment = !commentList.comment
      break;
    default:
      break;
  }
}
const handleComment = () => {
  commentList.listText = commentList.commentText
  commentList.comment = !commentList.comment
  commentList.listData.push({
    name: 'wky',
    description: commentList.listText,
    time: transformTime(new Date()),
    img: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png'
  })
}
const  {useShare,useBack} = useNavBar()
const  handleShare = () =>{
  useShare()
}
const clickLeft = () => {
  useBack()
}
</script>
<style lang="scss" scoped>
.parent-world-wrap {
  padding-bottom: 40px;
  h3 {
    margin: 15px 0;
    text-align: center;
  }

  .parent-world-main {
    width: 95%;
    margin: auto;
    color: #6a6a6a;
    h3 {
      text-align: left;
    }
    ::v-deep.uni-card__content {
      margin-bottom: 30px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.comment-btn {
  background-color: rgba(0,0,0,0.2);
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  .uni-easyinput {
    padding: 0 20px;
    ::v-deep.is-input-border {
      border: 2px solid #fff;
    }
    .uni-easyinput__placeholder-class {
      color: #fff;
    }
  }
}
.card-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0,0,0,.2);
  color: #fff;
  padding: 10px 0;
  z-index: 99;
  .card-actions-item {
    padding: 0 15px;
    .thumbs-active {
      color: red!important;
    }
    .uni-icon-heart {
      color: rgb(153, 153, 153);
    }
  }
}
</style>
