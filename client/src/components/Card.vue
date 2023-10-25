<script>
import { mapActions } from 'pinia';
import { useProductStore } from '../stores/product';



export default{
    props: ['product', 'wishlist'],
    methods: {
        ...mapActions(useProductStore, ['fetchSingleData', 'readWishlist', 'deleteWishlist'])
    }
}
</script>

<template>
    <div class="col-4">
        <div class="card" style="width: 18rem">
          <img v-if="$route.path === '/'" :src="product.imgUrl" class="card-img-top" alt="" />
          <img v-else :src="wishlist.Product.imgUrl" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 v-if="$route.path === '/'" class="card-title">{{ product.name }}</h5>
            <h5 v-else class="card-title">{{ wishlist.Product.name }}</h5>
            <p v-if="$route.path === '/'" class="card-text">
              {{ product.description }}
            </p>
            <p v-else class="card-text">
              {{ wishlist.Product.description }}
            </p>
            <p v-if="$route.path === '/'" class="card-text">
              {{ product.price }}
            </p>
            <p v-else class="card-text">
              {{ wishlist.Product.price }}
            </p>
            <button v-if="$route.path === '/'" @click="fetchSingleData(product.id)" class="btn btn-primary">Details</button>
            <button v-else @click="deleteWishlist(wishlist.id)" class="btn btn-primary">Delete</button>
          </div>
        </div>
      </div>
</template>