<template>
  <div class="p-4">
    <div class="d-flex justify-content-between">
      <div>
        <h4>My Notes</h4>
      </div>
      <div>
        <span v-if="!userStore.getName">
          Loading...
        </span>
        <span v-else>
          {{ userStore.getName }}
          <button type="button" @click="emit('logout')">Logout</button>
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