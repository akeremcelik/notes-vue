<template>
  <NoteModal :activity="noteModal.activity" :id="noteModal.id" @toggleNoteModalActivity="toggleNoteModalActivity" />
  <div class="p-5">
    <div class="d-flex justify-content-between">
      <h4 class="text-secondary">Note List</h4>
      <div class="btn btn-success mb-1" v-if="noteStore.getNotes" @click="toggleNoteModalActivity()">+</div>
    </div>
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <Note v-for="note in noteStore.getNotes" :id="note.id" :name="note.name" :content="note.content" :updated_at="note.updated_at" @toggleNoteModalActivity="toggleNoteModalActivity" />
    </div>
  </div>
</template>

<script setup>
import useRequest from "../composables/useRequest";
import {watch, reactive} from "vue";
import {useNoteStore} from "../stores/note";
import Note from "../components/Note.vue"
import NoteModal from "./NoteModal.vue";

const {sendRequest, response, checkMethodAndUrl, isLoading} = useRequest()
const noteStore = useNoteStore()
const noteModal = reactive({
  activity: false,
  id: null
})

const toggleNoteModalActivity = (id = null) => {
  noteModal.activity = !noteModal.activity
  noteModal.id = id

  const body = document.querySelector("body");
  noteModal.activity
      ? body.classList.add("modal-open")
      : body.classList.remove("modal-open");
}

sendRequest('GET', 'notes')

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('GET', 'notes')) {
      const responseData = newResponse.data.data
      noteStore.setNotes(responseData)
    }
  }
})
</script>

<style scoped>

</style>