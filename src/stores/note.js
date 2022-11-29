import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNoteStore = defineStore('notes', () => {
    const notes = ref(null)

    const getNotes = computed(() => notes.value)
    const findNote = computed((id) => {
        return notes.value.map((note) => note.id === id)
    })

    function setNotes(newNotes) {
        notes.value = newNotes
    }

    function addNote(newNote) {
        notes.value.push(newNote)
    }

    function deleteNote(id) {
        notes.value = notes.value.filter((note) => note.id !== id)
    }

    function resetNotes() {
        notes.value = null
    }

    return { notes, getNotes, findNote, setNotes, addNote, deleteNote, resetNotes }
})
