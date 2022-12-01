<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">{{name}}</h5>
        <p class="card-text">{{content}}</p>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <small class="text-muted">Last updated {{moment(updated_at).format('MMM Do YY')}}</small>
        <div>
          <Icon name="IconTrash" width="16" height="16" color="red" />
          <Icon name="IconPencil" width="16" height="16" color="blue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import Icon from "../components/Icon.vue"

const {id, name, content, updated_at} = defineProps({
  id: Number,
  name: String,
  content: String,
  updated_at: Date
})
</script>

<style scoped>

</style>