import {reactive} from "vue";

export default function useRequest() {
    const API_URL = import.meta.env.VITE_API_URL
    const response = reactive({
        status: '',
        data: '',
        message: ''
    })
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    const resetResponse = () => {
        response.status = ''
        response.data = ''
        response.message = ''
    }

    const sendRequest = (method, url, data = {}) => {
        resetResponse()
        response.status = 'loading'
        fetch(`${API_URL}/${url}`, {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        }).then((res) => {
            response.status = (res.ok ? 'success' : 'error')
            res.json().then((res) => {
                response.status === 'success' ? (response.data = res) : (response.message = res.message)
            })
        })
    }

    return {sendRequest, response}
}