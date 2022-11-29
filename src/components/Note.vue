<template>
<div>
  <h4>#{{id}} - {{name}}</h4>
  <p>{{content}}, {{updated_at}}</p>
</div>
</template>

<script setup>
const {id, name, content, updated_at} = defineProps({
  id: Number,
  name: String,
  content: String,
  updated_at: Date
})
</script>

<style scoped>

</style>