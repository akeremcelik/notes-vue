<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body" style="min-height: 200px;">
        <h5 class="card-title">{{name}}</h5>
        <p class="card-text">{{content}}</p>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <small class="text-muted">Last updated {{moment(updated_at).format('MMM Do YY')}}</small>
        <div>
          <button class="btn p-0 me-1" @click="showAlert(id, name)">
            <Icon name="IconTrash" width="18" height="18" color="red" />
          </button>
          <button class="btn p-0" @click="emit('toggleNoteModalActivity', id)">
            <Icon name="IconPencil" width="18" height="18" color="blue" />
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
import {watch, ref, nextTick} from "vue";

const {id, name, content, updated_at} = defineProps(['id', 'name', 'content', 'updated_at'])
const emit = defineEmits(['toggleNoteModalActivity'])

const {sendRequest, response, checkMethodAndUrl} = useRequest()
const noteStore = useNoteStore()
const selectedNoteId = ref()

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
      selectedNoteId.value = id
      nextTick().then(function () {
        sendRequest('DELETE', `notes/${id}`)
      })
    }
  })
}

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('DELETE', `notes/${selectedNoteId.value}`)) {
      noteStore.deleteNote(selectedNoteId.value)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The note has been deleted',
        showConfirmButton: false,
        timer: 1000,
        width: '350px',
        height: '150px'
      })
    }
  }
})
</script>

<style scoped>

</style>