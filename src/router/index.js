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
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    children: [
      {
        path: 'login',
        name: 'AuthLogin',
        component: () => import(/* webpackChunkName: "auth-login" */ '../views/auth/Login.vue')
      },
      {
        path: 'register',
        name: 'AuthRegister',
        component: () => import(/* webpackChunkName: "auth-register" */ '../views/auth/Register.vue')
      }
    ],
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
