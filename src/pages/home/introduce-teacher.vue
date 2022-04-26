<template>
  <uni-nav-bar
      :title="navBar.title"
      :leftIcon="navBar.leftIcon"
      :statusBar="navBar.statusBar"
      @clickLeft="clickLeft"
  />
  <uni-empty/>
  <view class="teacher-wrap">
    <view class="teacher-basic">
      <dl class="flex">
        <dt>
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F25%2F20210625225007_be9c6.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649991535&t=88c722b0cc813de3ac1d2f4eb035091e" alt="">
        </dt>
        <dd class="flex direction-column">
          <uni-tag text="已关注" type="success" size="small"/>
          <span class="teacher-basic-info name">小赵老师</span>
          <span class="teacher-basic-info sex">男</span>
          <span class="teacher-basic-info school">武汉大学<b class="education">本科</b></span>
          <span class="teacher-basic-info">¥<b class="price">300</b>/小时</span>
          <span class="teacher-basic-info">已授课<b class="num">289</b>次 <b class="rate">100%</b>好评</span>
          <span class="teacher-basic-info tag"><b>python</b><b>ACM竞赛</b></span>
        </dd>
      </dl>
    </view>
    <view class="teacher-detail">
      <uni-segmented-control :current="current" :values="teacherData" @clickItem="onClickItem" styleType="button" activeColor="#16C4AF"/>
      <view class="content">
        <view v-show="current === 0">
          <view class="teacher-sign-up flex justify-content-spacebetween">
            <view class="left-num">
              <span>11029</span>人已报名
            </view>
            <view class="right-btn">
              <button type="default" class="uni-button" @click="handleSignUp">立即约课</button>
            </view>
          </view>
        </view>
        <view v-show="current === 1" class="teacher-user-comment">
          <h3>用户评价</h3>
          <uni-tag text="全部" type="warning"/>
          <uni-tag :text="item" v-for="item in tagData"/>
          <uni-collapse accordion>
            <uni-collapse-item thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
              <uni-tag text="大神丰富"/>
              <uni-tag text="大神丰富"/>
              <uni-tag text="大神丰富"/>
            </uni-collapse-item>
          </uni-collapse>
        </view>
        <view v-show="current === 2">
          选项卡3的内容
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import {reactive,ref} from 'vue';
import {useNavBar} from "@/composables/useNavBar.js";
const navBar = reactive({
  title: '老师详情',
  leftIcon: 'back',
  statusBar: true
})
const current = ref(0)
const teacherData = ref(['介绍', '评价', '课程'])
const tagData = ref(['大神','活泼可爱','神经兮兮'])
const {useBack} = useNavBar()
const onClickItem = (e)=> {
  if (current.value != e.currentIndex) {
    current.value = e.currentIndex;
  }
}
const handleSignUp = () =>{
}
const clickLeft = () =>{
  useBack()
}
</script>
<style lang="scss" scoped>
.teacher-wrap {
  .teacher-basic {
    dl {
      align-items: inherit;
      dt {
        width: 200px;
        height: 270px;
        margin: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        margin: 20px 0;
        align-items: inherit;
        position: relative;
        .teacher-basic-info {
          padding: 10px 0;
        }
        .uni-tag {
          position: absolute;
          right: 10px;
          background-color: #16C4AF;
          font-size: 12px;
        }
      }
    }
  }
  .teacher-detail {
    width: 95%;
    margin: auto;
    .teacher-user-comment {
      margin: 10px;
      h3 {
        margin-bottom: 10px;
      }
     ::v-deep.uni-tag {
        margin: 0 10px;
      }
    }
    .teacher-sign-up {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #eeeeee;
      padding: 10px 15px;
      box-sizing: border-box;
      .left-num {
        span {
          color: #6a6a6a;
          font-size: 16px;
        }
      }
      .right-btn {
        .uni-button {
          background-color: #16C4AF;
          border-radius: 25px;
          color: #fff;
        }
      }
    }
  }
}
</style>
