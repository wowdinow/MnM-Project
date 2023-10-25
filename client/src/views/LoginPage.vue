<script>
import { mapActions } from 'pinia'
import { useProductStore } from '../stores/product'

export default {
  data() {
    return {
      dataInput: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useProductStore, ['loginHandler', 'googleLogin']),
    callback(response) {
      this.googleLogin(response);
    }
  }
}
</script>

<template>
  <div class="d-flex flex-column vh-100 justify-content-center">
    <div class="card p-3 w-50 mx-auto col-12">
      <div class="row text-center pb-4">
        <h1>Login to Your Account</h1>
      </div>
      <div class="container row col-12 justify-content-center">
        <div class="container row col-6">
          <form id="login-form" @submit.prevent="loginHandler(dataInput)">
            <div>
              <label for="email" class="form-label">Email address</label>
              <label class="text-danger text-end fw-bold">*</label>
              <input
                v-model="dataInput.email"
                type="email"
                class="form-control"
                id="email"
                required
              />
            </div>
            <div>
              <label for="password" class="form-label">Password</label>
              <label class="text-danger text-end fw-bold">*</label>
              <input
                v-model="dataInput.password"
                type="password"
                class="form-control"
                id="password"
                required
              />
            </div>
            <br />
            <div class="container d-flex flex-column justify-content-center">
              <button type="submit" class="btn btn-primary justify-content-center mx-auto mb-2">
                Submit
              </button>
              <div class="mx-auto">
                <GoogleLogin :callback="callback" promt />
              </div>
              <router-link to="/register" class="text-center" style="color: black"
                >Don't Have an Account? <span style="color: blue">Register</span></router-link
              >
            </div>
            <!-- <div class="mt-2"> -->
            <!-- <GoogleLogin :callback="callback" promt/>
          <pre>{{ log }}</pre> -->
            <!-- </div> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
