<template>
  <component :is="Icon" :width="width" :height="height" :color="color"></component>
</template>

<script setup>
import {defineAsyncComponent} from "vue";

const {name, width, height, color} = defineProps({
  name: String,
  width: Number,
  height: Number,
  color: String
})

const Icon = defineAsyncComponent(() => import(`../components/icons/${name}.vue`))
</script>

<style scoped>

</style>