import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/** Bootstrap vue */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/** Vue axios */
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
