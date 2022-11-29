<template>
  <div>
    {{ userStore.getName ?? 'Loading...' }}
    <button type="button" v-if="userStore.getName" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import useRequest from "../composables/useRequest";
import {watch} from "vue";
import {useUserStore} from "../stores/user";
import router from "../router";

const {sendRequest, response} = useRequest()
const userStore = useUserStore()

sendRequest('GET', 'user')

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (newResponse.params.method === 'GET' && newResponse.params.url === 'user') {
      if (newResponse.data !== '') {
        const responseData = newResponse.data.data
        userStore.setName(responseData.name)
        userStore.setEmail(responseData.email)
      }
    } else if (newResponse.params.method === 'POST' && newResponse.params.url === 'logout') {
      userStore.logout()
      router.push('/login')
    }
  } else if (newResponse.status === 'error' && newResponse.message !== '') {
    alert(newResponse.message)
  }
})

const logout = () => {
  sendRequest('POST', 'logout')
}
</script>
