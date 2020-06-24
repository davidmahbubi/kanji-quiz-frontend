import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import store from '@/store';

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
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'AuthLogin' && to.name !== 'AuthRegister') {
    /** If user access the pages except login and register */
    if (store.getters['auth/getToken']) {
      next();
    } else {
      /** If user don't have a token, push to login */
      next({name: 'AuthLogin'});
    }
  } else {
    /** If user access login or register */
    if (store.getters['auth/getToken']) {
      /** If user still have token, push back to previous page (Prevent accessing auth page) */
      router.go(-1);
    } else {
      next();
    }
  }
});

export default router
