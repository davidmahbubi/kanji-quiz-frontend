import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import store from '@/store';
import { USER_VERIFY } from '@/store/actions.type';
import { USER_LOGOUT } from '../store/actions.type';

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
  },
  {
    path: '/quiz_area/:id',
    name: 'QuizArea',
    component: () => import(/* webpackChunkName: "quiz-area" */ '../views/QuizArea.vue'),
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import(/* webpackChunkName: "statistics" */ '../views/Statistics.vue'),
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

/**
 * This method will check the api token
 * validity (after each routes resolved)
 */
router.afterEach( async (to, from) => {
  /** Do validation if the destination route is not auth pages */
  if (to.name !== 'AuthLogin' && to.name !== 'AuthRegister') {
    try {
      await store.dispatch(`auth/${USER_VERIFY}`);
    } catch (error) {
      /** If user verification failed, it will forced to logout */
      store.dispatch(`auth/${USER_LOGOUT}`);
      router.push({name: 'AuthLogin'});
    }
  }
});

export default router
