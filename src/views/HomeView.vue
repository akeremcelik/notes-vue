<template>
  <Header />

  <Suspense>
    <NoteList />
    <template #fallback>
      <div class="p-5">
        Loading...
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import useRequest from "../composables/useRequest";
import {watch} from "vue";
import {useUserStore} from "../stores/user";
import NoteList from "../components/NoteList.vue"
import Header from "../components/Header.vue"

const {sendRequest, response, checkMethodAndUrl} = useRequest()
const userStore = useUserStore()

if (userStore.getName === null)
  sendRequest('GET', 'user')

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('GET', 'user')) {
      const responseData = newResponse.data.data
      userStore.setName(responseData.name)
      userStore.setEmail(responseData.email)
    }
  }
})
</script>
