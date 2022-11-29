<template>
  <div>
    <h3>Note List</h3>
    <div v-if="isLoading('GET', 'notes')">
      Loading...
    </div>
    <div v-else-if="noteStore.getNotes">
      <Note v-for="note in noteStore.getNotes" :id="note.id" :name="note.name" :content="note.content" :updated_at="note.updated_at" />
    </div>
  </div>
</template>

<script setup>
import useRequest from "../composables/useRequest";
import {watch} from "vue";
import {useNoteStore} from "../stores/note";
import Note from "../components/Note.vue"

const {sendRequest, response, checkMethodAndUrl, isLoading} = useRequest()
const noteStore = useNoteStore()

sendRequest('GET', 'notes')

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('GET', 'notes')) {
      if (newResponse.data !== '') {
        const responseData = newResponse.data.data
        noteStore.setNotes(responseData)
      }
    }
  }
})
</script>

<style scoped>

</style>