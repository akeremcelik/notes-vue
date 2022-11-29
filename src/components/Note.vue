<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">{{name}}</h5>
        <p class="card-text">{{content}}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated {{moment(updated_at).format('MMM Do YY')}}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'

const {id, name, content, updated_at} = defineProps({
  id: Number,
  name: String,
  content: String,
  updated_at: Date
})
</script>

<style scoped>

</style>