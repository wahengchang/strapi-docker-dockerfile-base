import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/owners',
    name: 'Owner',
    component: () => import('../views/Owners')
  },
  {
    path: '/owners/:id',
    name: 'OwnerDetail',
    component: () => import('../views/Owners/id.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  base: '/app',
  routes
})

export default router
