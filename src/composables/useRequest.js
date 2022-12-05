import {reactive} from "vue";
import {useUserStore} from "../stores/user";
import router from "../router";

export default function useRequest() {
    const API_URL = import.meta.env.VITE_API_URL
    const response = reactive({
        status: '',
        data: '',
        message: '',
        params: {}
    })
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    const resetResponse = () => {
        response.status = ''
        response.data = ''
        response.message = ''
        response.params = {}
    }

    const sendRequest = (method, url, data = {}, auth = true) => {
        const userStore = useUserStore()

        resetResponse()
        response.params.method = method
        response.params.url = url
        response.status = 'loading'

        if (auth)
            headers = {...headers, 'Authorization': 'Bearer ' + userStore.getAccessToken}

        let options = {
            method: method,
            headers: headers
        }
        if (method !== 'GET')
            options = {...options, body: JSON.stringify(data)}

        fetch(`${API_URL}/${url}`, options).then((res) => {
            if (res.status === 401) {
                userStore.logout()
                router.push('/login')
            } else {
                let status = (res.ok ? 'success' : 'error')
                res.json().then((res) => {
                    status === 'success' ? (response.data = res) : (response.message = res.message)
                }).finally(() => response.status = status)
            }
        })

        return response
    }

    const checkMethodAndUrl = (method, url) => {
        return (response.params.method === method && response.params.url === url)
    }

    const isLoading = (method, url) => {
        return (checkMethodAndUrl(method, url) && response.status === 'loading')
    }

    return {sendRequest, response, checkMethodAndUrl, isLoading}
}