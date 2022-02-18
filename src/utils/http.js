export default function $http(options){
    const {url,data} = options;
    return new Promise((resolve,reject)=>{
        uniCloud.callFunction({
            name: url, //云函数名称
            data: data //传递的数据
        }).then((res)=>{
            // if(res.result.code == 200){
            //     resolve(res.result)
            // }else{
            //     reject(res.result)
            // }
            resolve(res.result)
        }).catch((err)=>{
            uni.hideLoading()
            reject(err)
        })

    })
}
