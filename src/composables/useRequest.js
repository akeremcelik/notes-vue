import {reactive} from "vue";
import {useUserStore} from "../stores/user";
import router from "../router";
import { useToast } from "vue-toastification";

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

    const toast = useToast();

    const constantStatusRoutes = [
        { name: 'logout', status: 'success' }
    ]

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
            const isUrlConstant = constantStatusRoutes.find((route) => {
                if (route.name === url) {
                    response.status = route.status
                    return true
                }
            })

            if (!isUrlConstant) {
                if (res.status === 401) {
                    if (router.currentRoute.value.name === 'login') {
                        res.json().then((res) => {
                            toast.error(res.message)
                        })
                        resetResponse()
                    } else {
                        toast.info('Please login again')
                        userStore.logout()
                        router.push('/login')
                    }
                } else {
                    let status = (res.ok ? 'success' : 'error')
                    res.json().then((res) => {
                        status === 'success' ? (response.data = res) : (response.message = res.message)
                        if (status === 'error') {
                            toast.error(res.message)
                        }
                    }).finally(() => response.status = status)
                }
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