/** General Modules */
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

/** Services */
import { apiService } from '@/commons/api.service';
import { getToken, purgeToken } from '@/commons/token.service';
import { makeLog } from './commons/logger.service';

/** Vuex types */
import { USER_VERIFY } from '@/store/actions.type';
import { DESTROY_USER } from '@/store/mutations.type';

/** 3rd Party Module Initiator */
require('@/libs/bootstrap-vue.module');
require('@/libs/vue-axios.module');
require('@/libs/notiflix.module');
import 'animate.css';

window.makeLog = makeLog;
Vue.config.productionTip = false
apiService.init();

new Vue({

  router,
  store,

  data() {
    return {
      isReady: false,
    }
  },

  created() {
    if (getToken()) {
      this.verifyUser();
    }
  },

  methods: {
    async verifyUser() {
      try {
        await store.dispatch(`auth/${USER_VERIFY}`);
      } catch (error) {
        purgeToken();
        this.$store.commit(`auth/${DESTROY_USER}`);
        this.$router.push({name: 'AuthLogin'});
      }
    }
  },

  render: h => h(App),  

}).$mount('#app')
