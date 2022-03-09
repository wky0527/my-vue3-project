var timeOutEvent = 0; //定时器
//开始按
function touchstart() {
    timeOutEvent = setTimeout("longPress()", 500);
    return false;
};
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
function touchend() {
    clearTimeout(timeOutEvent); //清除定时器
    if (timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
        alert("你这是点击，不是长按");
    }
    return false;
};
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
function touchmove() {
    clearTimeout(timeOutEvent); //清除定时器
    timeOutEvent = 0;
};

//真正长按后应该执行的内容
function longPress() {
    timeOutEvent = 0;
    //执行长按要执行的内容，如弹出菜单
    alert("长按事件触发");
}
