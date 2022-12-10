<template>
  <Header />
  <NoteList />
</template>

<script setup>
import useRequest from "../composables/useRequest";
import {watch} from "vue";
import {useUserStore} from "../stores/user";
import NoteList from "../components/NoteList.vue"
import Header from "../components/Header.vue"

const {sendRequest, response, checkMethodAndUrl} = useRequest()
const userStore = useUserStore()

sendRequest('GET', 'user')

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('GET', 'user')) {
      const responseData = newResponse.data.data
      userStore.setName(responseData.name)
      userStore.setEmail(responseData.email)
    }
  } else if (newResponse.status === 'error' && newResponse.message !== '') {
    alert(newResponse.message)
  }
})
</script>
