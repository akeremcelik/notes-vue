import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {useNoteStore} from "./note";

export const useUserStore = defineStore('user', () => {
    const noteStore = useNoteStore()

    const name = ref(null)
    const email = ref(null)
    const tokens = ref({
        access_token: null,
        refresh_token: null
    })

    const getName = computed(() => name.value)
    const getEmail = computed(() => email.value)
    const getAccessToken = computed(() => tokens.value.access_token)
    const getRefreshToken = computed(() => tokens.value.refresh_token)

    const isLoggedIn = computed(() => tokens.value.access_token !== null)

    function setName(newName) {
        name.value = newName
    }
    function setEmail(newEmail) {
        email.value = newEmail
    }
    function setAccessToken(newAccessToken) {
        tokens.value.access_token = newAccessToken
    }
    function setRefreshToken(newRefreshToken) {
        tokens.value.refresh_token = newRefreshToken
    }

    function logout() {
        name.value = null
        email.value = null
        tokens.value.access_token = null
        tokens.value.refresh_token = null

        noteStore.resetNotes()
    }

    return { name, email, tokens, getName, getEmail, getAccessToken, getRefreshToken, isLoggedIn, setName, setEmail, setAccessToken, setRefreshToken, logout }
})
