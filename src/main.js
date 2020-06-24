import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { apiService } from '@/commons/api.service';
import { makeLog } from './commons/logger.service';

require('./libs/bootstrap-vue.module');
require('./libs/vue-axios.module');
require('./libs/vue-animated.module');
require('./libs/notiflix.module');

window.makeLog = makeLog;
Vue.config.productionTip = false
apiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
