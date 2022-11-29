<template>
  <div class="p-4 bg-light">
    <div class="d-flex justify-content-between">
      <div>
        <h4 class="text-secondary">My Notes</h4>
      </div>
      <div>
        <span v-if="!userStore.getName">
          Loading...
        </span>
        <span v-else>
          <span class="m-2">{{ userStore.getName }}</span>
          <button type="button" @click="emit('logout')" class="btn btn-outline-info">Logout</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/user";

const userStore = useUserStore()

const emit = defineEmits(['logout'])
</script>

<style scoped>

</style>