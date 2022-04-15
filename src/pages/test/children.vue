<template>
  children
  <slot :pro="name"></slot>
</template>
<script>
import {ref} from 'vue'
const name = ref('children')
</script>
