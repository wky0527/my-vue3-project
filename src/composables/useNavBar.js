import {reactive,toRefs} from 'vue';
export function useNavBar(){
   const navBar = reactive({
       leftIcon: 'left',
       fixed: true,
       statusBar: true,
       shadow: true,
       dark: true,
       title: '标题'
   })
   const useShare = () =>{
       // uni.share({
       //   provider: "weixin",
       //   scene: "WXSceneSession",
       //   type: 0,
       //   href: "http://uniapp.dcloud.io/",
       //   title: "uni-app分享",
       //   summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
       //   imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
       //   success: function (res) {
       //     console.log("success:" + JSON.stringify(res));
       //   },
       //   fail: function (err) {
       //     console.log("fail:" + JSON.stringify(err));
       //   }
       // });
        plus.share.sendWithSystem({content:'分享内容',href:'https://www.dcloud.io/'}, function(){
            console.log('分享成功');
        }, function(e){
            console.log('分享失败：'+JSON.stringify(e));
        });
    }
    const useBack = () => {
       //#ifdef APP-PLUS
      uni.navigateBack({
          delta: 1
      })
        //#endif
        //#ifdef H5
        history.back()
        //#endif
    }
    return {
        useShare,
        useBack,
       ...toRefs(navBar)
    }
}
