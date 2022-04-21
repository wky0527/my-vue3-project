<template>
  <view class="login-wrap">
    <uni-status-bar>
      <text class="login-title">Hi，欢迎登录系统</text>
    </uni-status-bar>
    <uni-forms class="login-form" :modelValue="formData" ref="form" :rule="rules" label-position="top">
      <uni-forms-item required label="账号" name="username">
        <uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号"/>
      </uni-forms-item>
      <uni-forms-item required name="password" label="密码">
        <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码"/>
      </uni-forms-item>
      <button @tap="submitForm" class="login-btn" :loading="btnLoading" :disabled="btnDisabled">登录</button>
    </uni-forms>
  </view>
</template>
<script setup>
import {reactive, ref, getCurrentInstance, computed} from "vue";
import {useStore} from 'vuex';
import {onReady} from '@dcloudio/uni-app';

const {dispatch} = useStore()
const form = ref(null);
const btnLoading = ref(false);
const btnDisabled = ref(false);
const {proxy} = getCurrentInstance() //获取上下文实例，proxy = vue2的this ctx生产环境不好使
const formData = reactive({
  username: '',
  password: ''
})
const showBtnState = computed(() => {
  return !(formData.username && formData.password)
})
const rules = reactive({
  // 对username字段进行必填验证
  username: {
    rules: [{
      required: true,
      errorMessage: '账号不能为空！',
    }]
  },
  // 对password字段进行必填验证
  password: {
    rules: [{
      required: true,
      errorMessage: '密码不能为空！',
    }]
  }
})
onReady(() => {
  // 需要在onReady中设置规则
  form.value.setRules(rules)
})
const submitForm = () => {
  form.value.validate().then(res => {
    handleLogin()
  }).catch(err => {
    uni.showToast({
      icon: 'error',
      title: '验证失败!',
      duration: 3000,
      mask: true
    });
  })
}
const handleLogin = async () => {
  btnLoading.value = true;
  try {
    const {access_token} = await dispatch('user/login', formData)
    if (access_token) {
      uni.reLaunch({url: '/pages/home/index'});
    }
  } catch (e) {
    btnLoading.value = false
    console.log(e)
  }
}
</script>
<style scoped lang="scss">
.login-wrap {
  width: 80%;
  margin: 20px auto;

  .login-form {
    margin-top: 30px;

    .uni-forms-item .uni-forms-item__label {
      width: auto !important;
    }
  }

  .login-btn {
    margin-top: 30px;
  }
}
</style>
