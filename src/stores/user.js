import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const name = ref('')
    const email = ref('')
    const tokens = ref({
        access_token: '',
        refresh_token: ''
    })

    const getName = computed(() => name.value)
    const getEmail = computed(() => email.value)
    const getAccessToken = computed(() => tokens.value.access_token)
    const getRefreshToken = computed(() => tokens.value.refresh_token)

    const isLoggedIn = computed(() => tokens.value.access_token !== '')

    function setName(name) {
        name.value = name
    }
    function setEmail(email) {
        email.value = email
    }
    function setAccessToken(token) {
        tokens.value.access_token = token
    }
    function setRefreshToken(token) {
        tokens.value.refresh_token = token
    }

    function logout() {
        name.value = ''
        email.value = ''
        tokens.value.access_token = ''
        tokens.value.refresh_token = ''
    }

    return { name, email, tokens, getName, getEmail, getAccessToken, getRefreshToken, isLoggedIn, setName, setEmail, setAccessToken, setRefreshToken, logout }
})
