<template>
  <uni-nav-bar
      title="优秀作品"
      rightIcon="more"
      leftIcon="back"
      statusBar="true"
      @clickLeft="clickLeft"
  />
  <uni-empty/>
  <view class="parent-world-wrap">
    <h3>孩子沉迷游戏怎么办？我做了这四点拯救了儿子</h3>
    <view class="parent-world-main">
      <uni-card title="基础卡片" sub-title="副标题" extra="额外信息"
                thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
        <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
      </uni-card>
      <uni-card cover="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg">
        <img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg" alt="">
        <text>
          大家好，今天给大家讲一下，我家孩子沉迷手机、网络游戏、厌学、成绩差、三天俩头说不想上学了，我是怎么解决的。
          我孩子特别喜欢玩手机，打游戏，考试成绩一次比一次差，本来他学习成绩还可以的，后面因为玩游戏厌学成绩一路下降。
          甚至撒谎跟我说不玩游戏了，让我给他买个手机，用手机方便查资料，听了后我很感动，想着孩子终于懂事了。
          <img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg" alt="">
          到后面我才知道是骗我的，买手机是为了玩游戏，当时我真的很失望，就告诉了他爸，他爸一生气就打了他，结果就离家出走了，大晚上的叫了身边一大帮亲戚朋友出去找。
          说实话，我很后悔给他买手机，现在想想，做游戏的人也是害人，真的是把孩子研究的透，孩子喜欢什么样的画面，什么声音，就是这些，让孩子对游戏不能自拔。
          最后就对游戏产生依赖上瘾，网瘾就是这样一步一步发展的，加上平时考试测试，看着自己成绩越来越差，再加上家长、老师、同学看不上，恶性循环，就更加不愿意再学习了。
        </text>
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
const onPullDownRefresh = () =>{
  console.log('refresh');
  setTimeout(function () {
    uni.stopPullDownRefresh();
  }, 1000);
}
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
const {useShare,useBack} = useNavBar()
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
