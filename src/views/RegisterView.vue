<template>
  <div class="row">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="border border-secondary rounded p-5 col-sm-6 col-lg-3 col-12">
        <form @submit.prevent="submitRegisterForm">
          <div class="mb-3">
            <label for="exampleInputName1" class="form-label">Name</label>
            <input type="text" class="form-control" id="exampleInputName1" v-model="data.name">
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" v-model="data.email">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="data.password">
          </div>
          <div class="mb-3">
            <label for="exampleInputPasswordConfirmation1" class="form-label">Password Confirmation</label>
            <input type="password" class="form-control" id="exampleInputPasswordConfirmation1" v-model="data.password_confirmation">
          </div>
          <button type="submit" class="btn btn-primary" :disabled="registerStatementForButton">
            Register
            <Spinner v-if="registerStatementForButton" />
          </button>
          <div class="form-text">
            Already have an account? <RouterLink to="/login">Login</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, watch, computed} from "vue";
import useRequest from "../composables/useRequest.js"
import router from "../router";
import Spinner from "../components/Spinner.vue"

const data = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const {sendRequest, response, isLoading} = useRequest()

const submitRegisterForm = () => {
  sendRequest('POST', 'register', data, false)
}
const registerStatementForButton = computed(() => isLoading('POST', 'register'))

watch(response, (newResponse) => {
  if (newResponse.status === 'success') {
    router.push('/login')
  }
})
</script>

<style scoped>

</style>