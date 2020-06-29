import Vue from 'vue';
import Vuex from 'vuex';
import authModule from '@/store/auth.module';
import questionModule from '@/store/question.module';

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
    question: questionModule,
  }
})
