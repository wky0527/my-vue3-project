import {reactive, ref, toRefs} from 'vue';
export function useAddressParams(){
    const getCurPage =()=>{
        const pages = getCurrentPages();
        const curPage = pages[pages.length-1];
        return curPage
    }
    const curPage = getCurPage();
    //#ifdef APP-PLUS
    const curRouteApp = curPage.$page.options
    //#endif
    //#ifdef H5
    const curRouteH = curPage.$route.query
    //#endif
    return {
        //#ifdef H5
        curRouteH,
        //#endif
        //#ifdef APP-PLUS
        curRouteApp
        //#endif
    }
}
