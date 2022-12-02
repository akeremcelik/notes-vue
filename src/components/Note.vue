<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">{{name}}</h5>
        <p class="card-text">{{content}}</p>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <small class="text-muted">Last updated {{moment(updated_at).format('MMM Do YY')}}</small>
        <div>
          <button class="btn p-0 me-1" @click="showAlert(id, name)">
            <Icon name="IconTrash" width="18" height="18" color="red" />
          </button>
          <button class="btn p-0">
            <Icon name="IconPencil" width="18" height="18" color="green" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import Icon from "../components/Icon.vue"
import Swal from 'sweetalert2'
import useRequest from "../composables/useRequest";
import {useNoteStore} from "../stores/note";
import {watch} from "vue";

const {id, name, content, updated_at} = defineProps(['id', 'name', 'content', 'updated_at'])

const {sendRequest, response, checkMethodAndUrl} = useRequest()
const noteStore = useNoteStore()

const showAlert = (id, name) => {
  Swal.fire({
    title: name,
    text: `Are you sure you want to delete the note?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      sendRequest('DELETE', `notes/${id}`)
    }
  })
}

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('DELETE', `notes/${id}`)) {
      noteStore.deleteNote(id)
      Swal.fire(
          'Deleted!',
          'Your note has been deleted.',
          'success'
      )
    }
  }
})
</script>

<style scoped>

</style>