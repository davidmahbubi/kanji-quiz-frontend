import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    children: [
      {
        path: 'login',
        name: 'AuthLogin',
        component: Login,
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
