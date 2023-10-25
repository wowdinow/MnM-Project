import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import DetailPage from '../views/DetailPage.vue'
import WishlistPage from '../views/WishlistPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/products/:id',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistPage
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.path === '/wishlist' && !localStorage.access_token){
//     next({path: '/login'})
//   } else if(to.path === '/login' || to.path === '/register' && localStorage.access_token){
//     next({path: '/'})
//   } else {
//     next()
//   }
// })

export default router
