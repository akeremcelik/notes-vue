<template>
  <div>
    <form @submit.prevent="submitRegisterForm">
      <div>
        <label>Name</label>
        <br />
        <input type="text" v-model="data.name" />
      </div>
      <div>
        <label>Email</label>
        <br />
        <input type="email" v-model="data.email" />
      </div>
      <div>
        <label>Password</label>
        <br />
        <input type="password" v-model="data.password" />
      </div>
      <div>
        <label>Password Confirmation</label>
        <br />
        <input type="password" v-model="data.password_confirmation" />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {reactive, watch} from "vue";
import useRequest from "../composables/useRequest.js"
import router from "../router";

const data = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const {sendRequest, response} = useRequest()

const submitRegisterForm = () => {
  sendRequest('POST', 'register', data)
}

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    router.push('/login')
  } else if (newResponse.status === 'error' && newResponse.message !== '') {
    alert(newResponse.message)
  }
})
</script>

<style scoped>

</style>