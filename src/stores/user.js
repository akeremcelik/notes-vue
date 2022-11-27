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

    return { name, email, tokens, getAccessToken, setName, setEmail, setAccessToken, setRefreshToken }
})
