<template>
  <TransitionGroup name="bounce">
    <div v-if="activity" class="modal fade show d-block" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{id ? noteStore.findNote(id).name : 'Create New Note'}}</h5>
            <button type="button" class="close border-0" data-dismiss="modal" aria-label="Close" @click="emit('toggleNoteModalActivity')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" v-model="note.name">
              </div>
              <div class="form-group">
                <label for="content">Content</label>
                <textarea class="form-control" id="content" v-model="note.content" rows="7" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" :class="{'disabled': id ? isLoading('PATCH', `notes/${id}`) : isLoading('POST', `notes`)}" data-dismiss="modal" @click="emit('toggleNoteModalActivity')">Close</button>
            <button type="button" class="btn" :class="{'btn-primary': id, 'btn-success': !id, 'disabled': id ? isLoading('PATCH', `notes/${id}`) : isLoading('POST', `notes`)}" @click="submitNoteModalForm">
              {{id ? 'Update' : 'Create'}}
              <Spinner v-if="id ? isLoading('PATCH', `notes/${id}`) : isLoading('POST', `notes`)" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
  <div v-if="activity" class="modal-backdrop fade show"></div>
</template>

<script setup>
import {useNoteStore} from "../stores/note";
import {reactive, watch} from "vue"
import useRequest from "../composables/useRequest";
import Swal from 'sweetalert2'
import Spinner from "../components/Spinner.vue"

const emit = defineEmits(['toggleNoteModalActivity'])
const {id, activity} = defineProps(['id', 'activity'])

const noteStore = useNoteStore()
const note = reactive({
  name: id ? noteStore.findNote(id).name : '',
  content: id ? noteStore.findNote(id).content : ''
})
const {sendRequest, response, checkMethodAndUrl, isLoading} = useRequest()

const submitNoteModalForm = () => {
  if (id) {
    sendRequest('PATCH', `notes/${id}`, note)
  } else {
    sendRequest('POST', `notes`, note)
  }
}

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('PATCH', `notes/${id}`)) {
      noteStore.updateNote(id, note)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The note has been updated',
        showConfirmButton: false,
        timer: 1000,
        width: '350px',
        height: '150px'
      })
    } else if (checkMethodAndUrl('POST', `notes`)) {
      noteStore.addNote({...note, id: newResponse.data.data.id, updated_at: newResponse.data.data.updated_at})
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The note has been created',
        showConfirmButton: false,
        timer: 1000,
        width: '350px',
        height: '150px'
      })
    }
    emit('toggleNoteModalActivity')
  }
})
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>