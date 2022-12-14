<template>
  <TransitionGroup name="bounce">
    <div v-if="props.activity" class="modal fade show d-block" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{noteFirstName ? noteFirstName : 'Create New Note'}}</h5>
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
            <button type="button" class="btn btn-secondary" :class="{'disabled': disabledStatementForButton}" data-dismiss="modal" @click="emit('toggleNoteModalActivity')">Close</button>
            <button type="button" class="btn" :class="{'btn-primary': props.id, 'btn-success': !props.id, 'disabled': disabledStatementForButton}" @click="submitNoteModalForm">
              {{props.id ? 'Update' : 'Create'}}
              <Spinner v-if="disabledStatementForButton" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
  <div v-if="props.activity" class="modal-backdrop fade show"></div>
</template>

<script setup>
import {useNoteStore} from "../stores/note";
import {reactive, watch, computed, ref} from "vue"
import useRequest from "../composables/useRequest";
import Spinner from "../components/Spinner.vue"
import { useToast } from "vue-toastification";

const emit = defineEmits(['toggleNoteModalActivity'])
const props = defineProps(['id', 'activity'])

const noteStore = useNoteStore()
const note = reactive({
  name: '',
  content: ''
})
const noteFirstName = ref('')
const {sendRequest, response, checkMethodAndUrl, isLoading} = useRequest()
const toast = useToast()

const submitNoteModalForm = () => {
  if (props.id) {
    sendRequest('PATCH', `notes/${props.id}`, note)
  } else {
    sendRequest('POST', `notes`, note)
  }
}

const disabledStatementForButton = computed(() => props.id ? isLoading('PATCH', `notes/${props.id}`) : isLoading('POST', `notes`))

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    if (checkMethodAndUrl('PATCH', `notes/${props.id}`)) {
      noteStore.updateNote(props.id, note)
      toast.success('The note has been updated')
    } else if (checkMethodAndUrl('POST', `notes`)) {
      noteStore.addNote({...note, id: newResponse.data.data.id, updated_at: newResponse.data.data.updated_at})
      toast.success('The note has been created')
    }
    emit('toggleNoteModalActivity')
  }
})

watch(props, (newProps) => {
  if (newProps.activity) {
    if (newProps.id) {
      const findNote = noteStore.findNote(newProps.id)
      note.name = findNote.name
      note.content = findNote.content
    }
  } else {
    note.name = ''
    note.content = ''
    noteFirstName.value = ''
  }
})

watch(note, (newNote) => {
  if (props.id && newNote.name !== '' && noteFirstName.value === '') {
    noteFirstName.value = newNote.name
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