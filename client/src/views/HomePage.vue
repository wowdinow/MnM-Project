<script>
import { mapActions, mapState } from 'pinia';
import {useProductStore} from '../stores/product'
import Card from '../components/Card.vue';

export default {
    data(){
      return{
        search: ''
      }
    },
    components: { Card },
    computed: {
        ...mapState(useProductStore, ['products', 'totalPage'])
    },
    methods: {
        ...mapActions(useProductStore, ['fetchData'])
    },
    watch: {
      '$route.query': {
        handler(){
          this.fetchData(this.$route.query)
        },
        deep: true
      }
    },
    created(){
        this.fetchData(this.$route.query)
    }
}
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <h1>All Products</h1>
      <div class="my-4">
        <form action="">
          <input v-model="search" type="text" placeholder="search...">
          <button @click.prevent="$router.push('?search=' + search)" class="btn btn-danger btn-sm ms-2 align-item-between">Search</button>
        </form>
      </div>
      <Card v-for="product in products" :key="product.id" :product="product"/>
    </div><br>
    <div class="d-flex justify-content-center col">
      <p>Page :</p><router-link v-for="i in totalPage" :to="{path: '/', query: {...$route.query, page: i}}" class="ms-2">{{ i }}</router-link>
    </div>
  </div>
</template>
