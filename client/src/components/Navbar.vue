<script>
import { mapActions, mapState } from 'pinia';
import {useProductStore} from '../stores/product'


export default{
    data(){
        return{
            access_token: localStorage.access_token
        }
    },
    computed: {
      ...mapState(useProductStore, ['isLogin'])
    },
    methods: {
        ...mapActions(useProductStore, ['logoutHandler'])
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg sticky-top px-5" style="background-color: rgb(97, 24, 24)">
      <div class="container">
      <!-- logo -->
      <div class="">
        <router-link to="/"><img class="image" src="/icon.png" alt="" style="" width="80"></router-link>
      </div>

      <!-- nav -->
      <div class="d-flex">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/wishlist" v-if="isLogin" class="nav-link active text-white">Wishlist</router-link>
          </li>
        </ul>

      <!-- logout -->
        <button v-if="isLogin" class="btn btn-warning" @click="logoutHandler">Logout</button>
        <router-link to="/login" v-else class="btn btn-warning" >Login</router-link>
      </div>
    </div>
    </nav>
</template>