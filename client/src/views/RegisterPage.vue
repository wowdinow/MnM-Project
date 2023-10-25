<script>
import { mapActions } from 'pinia';
import { useProductStore } from '../stores/product';

export default {
  data() {
    return {
      dataInput: {
        userName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
      }
    }
  },
  methods: {
    ...mapActions(useProductStore, ['registerHandler'])
  }
}
</script>

<template>
  <div class="container d-flex flex-column vh-100 justify-content-center">
    <div class="card p-3 w-50 mx-auto col-12">
      <div class="row text-center pb-4">
        <h1>Sign Up</h1>
      </div>
      <div class="container row col-12 justify-content-center">
        <!-- <div class="row col-12">
          <img class="register-image justify-content-center mt-5" src="" alt="" />
        </div> -->
        <div class="container row col-12">
          <form id="register-form" @submit.prevent="registerHandler(dataInput)">
            <div>
              <label for="register-username" class="form-label">User Name</label>
              <label class="text-danger text-end fw-bold">*</label>
              <input
                v-model="dataInput.userName"
                type="text"
                class="form-control"
                id="register-username"
                required
              />
            </div>
            <div>
              <label for="register-email" class="form-label">Email address</label>
              <label class="text-danger text-end fw-bold">*</label>
              <input
                v-model="dataInput.email"
                type="email"
                class="form-control"
                id="register-email"
                required
              />
            </div>
            <div>
              <label for="register-password" class="form-label">Password</label>
              <label class="text-danger text-end fw-bold">*</label>
              <input
                v-model="dataInput.password"
                type="password"
                class="form-control"
                id="register-password"
                required
              />
            </div>
            <div>
              <label for="register-phoneNumber" class="form-label">Phone Number</label>
              <input
                v-model="dataInput.phoneNumber"
                type="text"
                class="form-control"
                id="register-phoneNumber"
              />
            </div>
            <div>
              <label for="register-address">Address</label>
              <textarea
                v-model="dataInput.address"
                id="register-address"
                class="form-control"
                rows="3"
                placeholder="Enter your address (optional) ..."
                autocomplete="off"
              ></textarea>
            </div>
            <br />
            <div class="container d-flex flex-column justify-content-center">
              <button type="submit" class="btn btn-primary mx-auto">
                Submit
              </button>
              <router-link to="/login" class="text-center" style="color: black"
              >Have an Account? <span style="color: blue">Login</span></router-link
            >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
