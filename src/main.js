import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueSweetalert2);
app.use(Toast)

app.mount('#app')

// Persist Pinia Store (Local Storage)

if (localStorage.getItem('piniaState')) {
    pinia.state.value = JSON.parse(localStorage.getItem('piniaState'))
}

watch(
    pinia.state,
    (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state))
    },
    { deep: true }
)
