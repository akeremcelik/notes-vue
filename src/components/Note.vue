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
          <button class="btn p-0 me-1">
            <Icon name="IconTrash" width="18" height="18" color="red" />
          </button>
          <button class="btn p-0">
            <Icon name="IconPencil" width="18" height="18" color="green" />
          </button>
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