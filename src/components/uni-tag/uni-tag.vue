<template>
  <button class="uni-tag" :class="classes" :disabled="isDisabled" @tap="handleClick">
    {{ text }}
  </button>
</template>
<script lang="ts">
import {computed} from "vue";
export default {
  props: {
    text: {
      type: String,
      default: '标签'
    },
    size: {
      type: String,
      default: 'normal'
    },
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inverted: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const {text, size, type, disabled, inverted, circle} = props;
    const classes = computed(()=>{
      const config = [
          'uni-tag-' + type,
          'uni-tag-' + size,
           isTrue(circle) ? 'uni-tag-circle' : '',
           isTrue(inverted) ? 'uni-tag-inverted': ''
      ]
      return config.join(' ')
    })
    const isTrue = (value) => {
       return value === true
    }
    const isDisabled = computed(()=>{
       return disabled
    })
    const handleClick = () => {
      // console.log('tag点击事件')
      emit('handleTagClick')
    }
    return {
      classes,
      isTrue,
      isDisabled,
      handleClick
    }
  }
}
</script>
<style lang="scss" scoped>
.uni-tag-default {
  background-color: #8f939c;
}
.uni-tag-primary {
  background-color: #2979ff ;
}
.uni-tag-error {
  background-color: #e43d33;
}
.uni-tag-warn {
  background-color: #f3a73f;
}
.uni-tag, .uni-tag-normal, .uni-tag-small {
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.uni-tag-small  {
  width: 64px;
}
.uni-tag-circle {
  border-radius: 60px;
  border: 1px solid #ccc;
}
.uni-tag-inverted {
  background-color: transparent;
  color: #000000;
}
</style>
