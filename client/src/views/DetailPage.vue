<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'

export default {
  computed: {
    ...mapState(useProductStore, ['product', 'qr'])
  },
  methods: {
      ...mapActions(useProductStore, ['fetchSingleData', 'addWishlist', "qrData"]),
      async qrCode(){
        await this.qrData(this.product.id)
        // console.log(this.qrData(this.product.id));
      }
    },
  created(){
      this.fetchSingleData(this.$route.params.id)
      this.qrCode(this.product.id)
  }
}
</script>

<template>
  <div class="container justify-content-center my-5">
    <div class="row">
      <div class="col-6 d-flex justify-content-center mx-auto">
        <img :src="product.imgUrl" alt="" />
      </div>
      <div class="col-6">
        <div>
          <h1 class="card-title">{{ product.name }}</h1>
          <h5 class="card-text">
            {{ product.price }}
          </h5>
          <p class="card-text">
            {{ product.description }}
          </p>
          <button @click="addWishlist(product.id)" class="btn btn-primary">Add to Wishlist</button>
          <!-- <img :src="qr" alt="" width="50" height="50"> -->
          <div height="50" width="50">
          <div v-html="qr"></div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
