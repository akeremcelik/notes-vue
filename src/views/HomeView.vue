<template>
  <div>
    <span v-if="isLoading('GET', 'user')">
      Loading...
    </span>
    <span v-else-if="userStore.getName">
      {{ userStore.getName }}
      <button type="button" @click="logout">Logout</button>
    </span>
  </div>
  <div>
    <NoteList />
  </div>
</template>

<script setup>
import useRequest from "../composables/useRequest";
import {watch} from "vue";
import {useUserStore} from "../stores/user";
import router from "../router";
import NoteList from "../components/NoteList.vue"
import {useNoteStore} from "../stores/note";

const {sendRequest, response, checkMethodAndUrl, isLoading} = useRequest()
const userStore = useUserStore()
const noteStore = useNoteStore()

sendRequest('GET', 'user')

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('GET', 'user')) {
      if (newResponse.data !== '') {
        const responseData = newResponse.data.data
        userStore.setName(responseData.name)
        userStore.setEmail(responseData.email)
      }
    } else if (checkMethodAndUrl('POST', 'logout')) {
      userStore.logout()
      noteStore.resetNotes()
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
