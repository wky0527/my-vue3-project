const transformTime = (time) => {
    const oldTime = new Date(time);
    const year = oldTime.getFullYear() + '年'
    const month = oldTime.getMonth() +1+'月'
    const date = oldTime.getDate() + '日'
    return [year,month,date].join('')
}
export {
    transformTime
}
