import Vue from 'vue';
import Vuex from 'vuex';
import authModule from '@/store/auth';
import quizModule from '@/store/quiz';
import settingsModule from '@/store/settings';

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
    settings: settingsModule,
  }
});
