<template>
  <div class="spinner-grow spinner-grow-sm" :class="[`text-${color ?? 'white'}`]" role="status">

  </div>
</template>

<script setup>
const {color} = defineProps(['color'])
</script>

<style scoped>

</style>