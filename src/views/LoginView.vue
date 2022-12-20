<template>
  <div class="row">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="border border-secondary rounded p-5 col-sm-6 col-lg-3 col-12">
        <form @submit.prevent="submitLoginForm">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" v-model="data.email" :class="{'border-danger': v$.email.$error}">
            <div v-if="v$.email.$error" class="text-danger">
              * {{v$.email.$errors[0].$message}}
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="data.password" :class="{'border-danger': v$.password.$error}">
            <div v-if="v$.password.$error" class="text-danger">
              * {{v$.password.$errors[0].$message}}
            </div>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary" :disabled="loginStatementForButton">
              Login
              <Spinner v-if="loginStatementForButton" />
            </button>
            <button type="button" class="btn btn-outline-primary" @click="autoLogin">Auto Login</button>
          </div>
          <div class="form-text">
            Don't you have an account? <RouterLink to="/register">Register</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, watch, computed} from "vue";
import useRequest from "../composables/useRequest.js"
import {useUserStore} from "../stores/user";
import router from "../router";
import Spinner from "../components/Spinner.vue"
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const data = reactive({
  email: '',
  password: ''
})
const {sendRequest, response, isLoading} = useRequest()
const userStore = useUserStore()
const rules = {
  email: { required, email },
  password: { required },
}
const v$ = useVuelidate(rules, data)

const submitLoginForm = async () => {
  const validationResult = await v$.value.$validate()
  if (validationResult) {
    sendRequest('POST', 'login', data, false)
  }
}
const loginStatementForButton = computed(() => isLoading('POST', 'login'))

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    const responseData = newResponse.data
    userStore.setAccessToken(responseData.access_token)
    userStore.setRefreshToken(responseData.refresh_token)

    router.push('/')
  }
})

const autoLogin = () => {
  data.email = 'test@test.com'
  data.password = 'test'
  submitLoginForm()
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>