import {onMounted, reactive, toRefs} from 'vue';
import { useDrawPoster } from '@/js_sdk/u-draw-poster';
import drawQrCode from '@/js_sdk/u-draw-poster/plugins/drawQrCode';
export function useLocation() {
    const getLocation = () => {
        return new Promise((resolve,reject)=>{
            uni.chooseLocation({
                type: 'wgs84',
                geocode: true,
                success: (res)=>{
                    resolve(res)
                },
                fail: (err)=>{
                    reject(err)
                }
            })
        })
    }
    return {
        getLocation
    }
}
export function useDrawQrCode() {
    const getDrawQrCode = async() => {
        const dp = await useDrawPoster('canvas',{
            plugins: [ drawQrCode() ]
        })
        dp.canvas.width = 200;
        dp.canvas.height = 200
        dp.draw(ctx=>{
            ctx.drawQrCode({
                x: (dp.canvas.width / 2) - 50,
                y: (dp.canvas.height / 2) - 50,
                text: "http://www.baidu.com",
                size: 200,
            });
        })
        const drawResult = await dp.render();
        console.log(drawResult)
    }
    return {
        getDrawQrCode
    }
}
export function  useScanCode() {
    const allScanCode = () => {
       return new Promise((resolve,reject)=>{
           uni.scanCode({
               success: function (res) {
                   console.log('条码类型：' + res.scanType);
                   console.log('条码内容：' + res.result);
                   resolve(res)
               }
           })
       })
    }
    const cameraScanCode = ()=> {
       return new  Promise((resolve,reject)=>{
           uni.scanCode({
               onlyFromCamera: true,
               success: function (res){
                   console.log('条码类型：' + res.scanType);
                   console.log('条码内容：' + res.result);
                   resolve(res)
               }
           })
       })
    }
    const barScanCode = () => {
       return new Promise(((resolve, reject) =>{
           uni.scanCode({
               scanType: ['barCode'],
               success: function (res) {
                   console.log('条码类型：' + res.scanType);
                   console.log('条码内容：' + res.result);
                   resolve(res)
               }
           })
       }))
    }
    return {
        allScanCode,
        cameraScanCode,
        barScanCode
    }
}
