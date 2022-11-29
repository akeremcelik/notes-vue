<template>
  <h3>Note List</h3>
  <Note v-for="note in noteStore.getNotes" :id="note.id" :name="note.name" :content="note.content" :updated_at="note.updated_at" />
</template>

<script setup>
import useRequest from "../composables/useRequest";
import {watch} from "vue";
import {useNoteStore} from "../stores/note";
import Note from "../components/Note.vue"

const {sendRequest, response} = useRequest()
const noteStore = useNoteStore()

sendRequest('GET', 'notes')

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (newResponse.params.method === 'GET' && newResponse.params.url === 'notes') {
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