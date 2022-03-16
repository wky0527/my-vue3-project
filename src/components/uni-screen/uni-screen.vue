<template>
   <view class="uni-screen" v-show="isScreen" id="uni-screen">
      <view class="uni-screen-position flex" v-show="isScreen">
          <view class="uni-screen-position-left">
              <p @click="handlePosition(item)" v-for="item in positionName" :key="item.value" :class="{'active':current === item.value}">{{item.label}}</p>
          </view>
          <view class="uni-screen-position-right" v-if="current === 0">
           <view class="flex position">
             <ul class="position-parent">
               <li v-for="item in positionData" :key="item.code" @click="positionChildren(item)">
                  <span :class="{'active':activeList === item.code}">{{item.name}}</span>
               </li>
             </ul>
             <ul v-if="isChildren" class="position-children">
               <li v-for="item in data">
                 <span :class="{'active':activeList === item.code}">{{item.name}}</span>
               </li>
             </ul>
           </view>
             <view class="uni-screen-btn flex">
                <button class="btn">重置</button>
                <button class="btn sure">确定</button>
             </view>
          </view>
        <view class="uni-screen-position-right" v-else-if="current === 1">
          <ul>
            <li v-for="item in positionData" :key="item.code">{{item.name}}</li>
          </ul>
        </view>
      </view>
<!--     <view class="uni-screen-position" v-else-if="controlType === 'tabs'">-->
<!--         tabs-->
<!--     </view>-->
<!--     <view v-else-if="controlType === 'select'">-->
<!--        select-->
<!--     </view>-->
   </view>
</template>
<script>
import {reactive,toRefs} from "vue";

export default {
  props: {
    positionName: {
      type: Array
    },
    controlType: {
      type: String
    },
    positionData: {
      type: Array
    }
  },
  setup(props,{emit}){
    document.addEventListener('click',e=>{
      if(document.getElementById('uni-screen').contains(e.target)){
        positionConfig.isScreen = false
      }else{
        positionConfig.isScreen = true
      }
    })
    const positionConfig = reactive({
      current:0,
      isChildren: false,
      activeList: 0,
      isScreen: false
    })
    const childPosition = reactive(({
      data:[]
    }))
    const handlePosition = (params) =>{
       positionConfig.current = params.value;
    }
    const positionChildren = (params) =>{
         positionConfig.activeList = params.code
      if(params.children){
         positionConfig.isChildren = true
         params.children.filter(item=>{
          return  item.code === params.code
        })
         childPosition.data = params.children;
      }else {
        positionConfig.isChildren = false
      }
    }
    return {
      handlePosition,
      positionChildren,
      ...toRefs(positionConfig),
      ...toRefs(childPosition)
    }
  }
}
</script>
<style lang="scss" scoped>
.uni-screen {
  position: absolute;
  top: 43px;
  left: 0;
  background: rgba(0,0,0,0.4);
  width: 100%;
  height: 100%;
  z-index: 99;
  .uni-screen-position {
    background-color: #fff;
    align-items: inherit;
    width: max-content;
    .uni-screen-position-left {
      background-color: #ececec;
      padding: 10px 25px;
      p {
        margin: 20px auto;
      }
      .active {
        color: #16C4AF;
        border-bottom: 2px solid #16C4AF;
      }
    }
    .uni-screen-position-right {
      .position {
        align-items: inherit;
        .position-parent {
          .active {
            color: #16C4AF;
            border-bottom: 2px solid #16C4AF;
          }
        }
      }
      ul {
        li {
          padding: 15px 25px;
          border-right: 1px solid #EDEDED;
        }
      }
    }
    .uni-screen-btn {
       .btn {
         margin: 0 10px;
       }
      .sure {
        background-color: #16C4AF;
        color: #fff;
      }
    }
  }
}
</style>
