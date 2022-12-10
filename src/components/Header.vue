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
          <button type="button" @click="logout" class="btn btn-outline-danger" :disabled="logoutStatementForButton">
            Logout
            <Spinner v-if="logoutStatementForButton" color="cyan" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/user";
import {watch, computed} from "vue";
import router from "../router";
import useRequest from "../composables/useRequest";
import Spinner from "../components/Spinner.vue"

const userStore = useUserStore()
const {sendRequest, response, checkMethodAndUrl, isLoading} = useRequest()

const logout = () => {
  sendRequest('POST', 'logout')
}
const logoutStatementForButton = computed(() => isLoading('POST', 'logout'))

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('POST', 'logout')) {
      userStore.logout()
      router.push('/login')
    }
  } else if (newResponse.status === 'error' && newResponse.message !== '') {
    alert(newResponse.message)
  }
})
</script>

<style scoped>

</style>