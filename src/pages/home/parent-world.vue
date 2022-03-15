<template>
  <uni-custom-nav-bar
      title="家长天地"
      rightIcon="more"
  />
  <view class="parent-world-wrap">
    <h3>孩子沉迷游戏怎么办？我做了这四点拯救了儿子</h3>
    <view class="parent-world-main">
      <uni-card title="基础卡片" sub-title="副标题" extra="额外信息"
                thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
        <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
      </uni-card>
        <img src="https://yan.zxx1359.top/chenmi/assets/img/banner.786d0e93.jpg" alt="">
        <text>
          大家好，今天给大家讲一下，我家孩子沉迷手机、网络游戏、厌学、成绩差、三天俩头说不想上学了，我是怎么解决的。
          我孩子特别喜欢玩手机，打游戏，考试成绩一次比一次差，本来他学习成绩还可以的，后面因为玩游戏厌学成绩一路下降。
          甚至撒谎跟我说不玩游戏了，让我给他买个手机，用手机方便查资料，听了后我很感动，想着孩子终于懂事了。
          <img src="https://yan.zxx1359.top/chenmi/assets/img/1531877090107015.b2aab5ed.jpg" alt="">
          到后面我才知道是骗我的，买手机是为了玩游戏，当时我真的很失望，就告诉了他爸，他爸一生气就打了他，结果就离家出走了，大晚上的叫了身边一大帮亲戚朋友出去找。
          说实话，我很后悔给他买手机，现在想想，做游戏的人也是害人，真的是把孩子研究的透，孩子喜欢什么样的画面，什么声音，就是这些，让孩子对游戏不能自拔。
          最后就对游戏产生依赖上瘾，网瘾就是这样一步一步发展的，加上平时考试测试，看着自己成绩越来越差，再加上家长、老师、同学看不上，恶性循环，就更加不愿意再学习了。
          <img src="https://yan.zxx1359.top/chenmi/assets/img/1531292790110109.a7227b6a.jpg" alt="">
          最后孩子他小姨知道了，给我介绍了一位老师，让我加微信看看。我看老师微信朋友圈里面有很多教育孩子的视频和方法。
          老师是做青少年教育的，主要是针对厌学、判逆、不上学，成绩差等各种青少年成长问题，我加了老师的微信runren10201 ，老师针对我孩子的情况进行了全面的分析，我觉得说到我心坎儿里了，特别有道理：
          青春期的孩子，精力非常的旺盛，在学业上精力分担的少，在其他地方精力就用的多，这是毋庸置疑的，其次学业上找不到成就感，他自然就开始在其他地方找成就感，比如游戏等。孩子越小越早介入纠正为好。
          然后我就发现自己之前的教育方式不对，不适合现在孩子的思维方式，当时我就找老师聊了很多。觉得挺不错的，当时就直接报了名，他们专家开会讨论帮我研讨制定了一套方案。
          每天教我怎么做、怎么跟孩子沟通。现在我才真正体会到父母教育的好与坏将直接影响孩子的一生，这句话的含义。没几天，孩子玩手机的时间就越来越少，并且主动开始学习了。（下面是我和老师的聊天截图）
          <img src="https://yan.zxx1359.top/chenmi/assets/img/c3.60caec87.jpg" alt="">
          大概指导了20多天吧，孩子就像变了一个人似的，自己主动跟我说要去上学了，遇到不会的题，还主动问老师了。学校老师也感觉到了孩子的变化，班主任还专门跟我打电话：问了孩子是怎么纠正的，电话里还表扬了我，说我最近孩子教育的好，孩子改变很大！
          后面继续按老师指导的调节，孩子学习态度越来越好，成绩也是直线上升，考试居然还得奖了，我自己都很意外！
          孩子学习成绩好了，也不玩手机、沉迷游戏了，一家人都很开心，真是可怜天下父母心。只是，希望孩子今后学习上能赶的上同级的就行，最好能考上理想的高中。也不负我对他的一番苦心！也希望看到的家长孩子也尽快好起来！谢谢。
        </text>
    </view>
    <view class="parent-world-bottom flex">
      <uni-search-bar :radius="100" v-model="contentText" placeholder="想说点什么？" class="parent-world-search"/>
      <button type="default" @click="sendText" class="parent-world-button">发送</button>
    </view>

  </view>
</template>
<script>
import {reactive, ref, toRefs} from "vue";

export default {
  setup() {
    const scrollData = reactive({
      scrollTop: 0,
      old: {
        scrollTop: 0
      }
    })
    const onPullDownRefresh = () =>{
      console.log('refresh');
      setTimeout(function () {
        uni.stopPullDownRefresh();
      }, 1000);
    }
    return {
      ...toRefs(scrollData),
      onPullDownRefresh,
      scroll
    }
  }
}
</script>
<style lang="scss" scoped>
.parent-world-wrap {
  h3 {
    margin: 15px 0;
    text-align: center;
  }

  .parent-world-main {
    width: 95%;
    margin: auto;
    color: #6a6a6a;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .parent-world-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #eeeeee;
    height: 60px;
    line-height: 60px;

    .parent-world-search {
      width: 75%;

      ::v-deep.uniui-search {
        display: none;
      }
    }

    .parent-world-button {
      background-color: #16C4AF;
      color: #fff;
    }
  }
}
</style>
