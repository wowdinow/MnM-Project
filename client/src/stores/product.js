import { defineStore } from 'pinia'
import axios from 'axios'

// const url = 'http://localhost:3000/pub'
const url = `https://wadinodev.com/pub`

export const useProductStore = defineStore('product', {
  state: () => ({
    isLogin: localStorage.access_token ? true : false,
    products: [],
    product: {},
    wishlists: [],
    qr: '',
    totalPage: 1
  }),
  actions: {
    async registerHandler(dataInput) {
      try {
        await axios({
          url: url + '/register',
          method: 'POST',
          data: dataInput
        })

        this.router.push('/login')
      } catch (err) {
        console.log(err.response.data.msg)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    },

    async loginHandler(dataInput) {
      try {
        let { data } = await axios({
          url: url + '/login',
          method: 'POST',
          data: dataInput
        })

        localStorage.access_token = data.access_token
        this.isLogin = true
        this.router.push('/')
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    },

    async googleLogin(response) {
      try {
        const access_token = response.credential

        const account = await axios({
          url: url + `/login/google`,
          method: 'POST',
          headers: {
            access_token
          }
        })
        console.log(account)
        localStorage.access_token = account.data.access_token
        this.isLogin = true
        this.router.push('/')
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    },

    logoutHandler() {
      localStorage.clear()
      this.isLogin = false
      this.router.push('/')
    },

    async fetchData({ page = 1, search = '' } = {}) {
      try {
        let { data } = await axios({
          url: url + `/products?page=${page}&search=${search}`,
          method: 'GET'
        })
        console.log(data)

        this.products = data.data
        this.totalPage = data.totalPage
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    },

    async fetchSingleData(id) {
      try {
        console.log(id)
        let { data } = await axios({
          url: url + '/products/' + id,
          method: 'GET'
        })
        console.log(data)
        this.product = data
        this.router.push('/products/' + id)
        // console.log(id);
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    },

    async qrData(id) {
      try {
        console.log(id)
        let { data } = await axios({
          url: url + '/products/qr/' + id,
          method: 'GET'
        })
        console.log(data)
        this.qr = data
        this.router.push('/products/' + id)
        // console.log(id);
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    },

    async readWishlist() {
      try {
        let { data } = await axios({
          url: url + '/wishlist/',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.wishlists = data
        this.router.push('/wishlist')
        // console.log(id);
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    },

    async addWishlist(id) {
      try {
        let { data } = await axios({
          url: url + '/wishlist/' + id,
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.readWishlist()
        this.router.push('/wishlist')
        // console.log(id);
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    },

    async deleteWishlist(id) {
      try {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            let { data } = axios({
              url: url + '/wishlist/' + id,
              method: 'DELETE',
              headers: {
                access_token: localStorage.access_token
              }
            })
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            this.readWishlist()
            this.router.push('/wishlist')
          }
        })
        // console.log(data)
        this.readWishlist()
        this.router.push('/wishlist')
        // console.log(id);
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`
        })
      }
    }
  }
})
