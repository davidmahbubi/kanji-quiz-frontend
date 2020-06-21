import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

require('./libs/bootstrap-vue.module');
require('./libs/vue-axios.module');
require('./libs/vue-animated.module');
require('./libs/notiflix.module');

/** import validate from '@/commons/'; */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
