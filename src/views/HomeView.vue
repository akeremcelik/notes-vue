<template>
{{ userStore.getName === '' ? 'Loading...' : userStore.getName }}
</template>

<script setup>
import useRequest from "../composables/useRequest";
import {watch} from "vue";
import {useUserStore} from "../stores/user";

const {sendRequest, response} = useRequest()
const userStore = useUserStore()

sendRequest('GET', 'user')

watch(response, (newResponse) => {
  if (newResponse.status === 'success' && newResponse.data !== '') {
    const responseData = newResponse.data.data
    userStore.setName(responseData.name)
    userStore.setEmail(responseData.email)
  } else if (newResponse.status === 'error' && newResponse.message !== '') {
    alert(newResponse.message)
  }
})
</script>
