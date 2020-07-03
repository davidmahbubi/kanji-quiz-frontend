import Vue from 'vue';
import Vuex from 'vuex';
import authModule from '@/store/auth';
import quizModule from '@/store/quiz';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule,
    quiz: quizModule,
  }
});
