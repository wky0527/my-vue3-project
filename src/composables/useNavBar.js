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

    return {
       ...toRefs(navBar)
    }
}
