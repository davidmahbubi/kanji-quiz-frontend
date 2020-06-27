import { setAuth, auth } from '@/commons/api.service';
import { setToken, getToken, purgeToken } from '@/commons/token.service';
import { USER_REGISTER, USER_LOGIN, USER_LOGOUT, USER_VERIFY } from '@/store/actions.type';
import { STORE_TOKEN, PURGE_TOKEN, DESTROY_USER, SAVE_USER } from '@/store/mutations.type';

const state = {
  apiToken: getToken(),
  userDetail: {},
};

const getters = {

  getToken(state) {
    return state.apiToken;
  },

  getUserDetail(state) {
    return state.userDetail;
  }

};

const mutations = {

  [STORE_TOKEN](state, token) {
    state.apiToken = token;
  },

  [PURGE_TOKEN](state) {
    state.apiToken = '';
  },

  [SAVE_USER](state, userDetail) {
    state.userDetail = userDetail;
  },

  [DESTROY_USER](state) {
    state.userDetail = {};
  }

};

const actions = {

    [USER_REGISTER](ctx, registerData) {
        return new Promise((resolve, reject) => {
            auth.post('register', registerData)
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
        });
    },

    [USER_LOGIN]({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        auth.post('login', credentials)
          .then((result) => {
            const userDetail = result.data.data.users;
            setToken(userDetail.api_token);
            commit(STORE_TOKEN, userDetail.api_token);
            commit(SAVE_USER, userDetail);
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
      });
    },

    [USER_LOGOUT]({ commit }) {
      purgeToken();
      commit(DESTROY_USER);
      commit(PURGE_TOKEN);
      return true;
    },

    [USER_VERIFY]({ commit }) {
      return new Promise((resolve, reject) => {
        setAuth();
        auth.get('check')
          .then((result) => {
            commit(SAVE_USER, result.data.data.user);
            resolve();
          })
          .catch((error) => {
            reject(error);
          })
      });
    },
    
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}