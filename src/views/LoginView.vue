<template>
  <div>
    <form @submit.prevent="submitLoginForm">
      <div>
        <label>Email</label>
        <br />
        <input type="email" v-model="data.email" />
      </div>
      <div>
        <label>Password</label>
        <br />
        <input type="password" v-model="data.password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {reactive, watch} from "vue";
import useRequest from "../composables/useRequest.js"
import {useUserStore} from "../stores/user";
import router from "../router";

const data = reactive({
  email: '',
  password: ''
})
const {sendRequest, response} = useRequest()
const userStore = useUserStore()

const submitLoginForm = () => {
  sendRequest('POST', 'login', data, false)
}

watch(response, (newResponse) => {
  if (newResponse.status === 'success' && newResponse.data !== '') {
    const responseData = newResponse.data
    userStore.setAccessToken(responseData.access_token)
    userStore.setRefreshToken(responseData.refresh_token)

    router.push('/')
  } else if (newResponse.status === 'error' && newResponse.message !== '') {
    alert(newResponse.message)
  }
})
</script>

<style scoped>

</style>