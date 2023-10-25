<script>
import { mapActions, mapState } from 'pinia';
import { useProductStore } from '../stores/product';
import Card from '../components/Card.vue';


export default{
    computed: {
        ...mapState(useProductStore, ['wishlists'])
    },
    methods: {
        ...mapActions(useProductStore, ['readWishlist'])
    },
    components: { Card },
    created(){
        this.readWishlist()
    },
    
}
</script>

<template>
    <div class="container text-center">
    <div class="row">
      <Card v-for="wishlist in wishlists" :key="wishlist.id" :wishlist="wishlist"/>
    </div>
  </div>
</template>