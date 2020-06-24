import { auth } from '@/commons/api.service';
import { setToken, getToken } from '@/commons/token.service';
import { USER_REGISTER, USER_LOGIN } from '@/store/actions.type';
import { STORE_TOKEN } from '@/store/mutations.type';

const state = {
  apiToken: getToken(),
};

const getters = {

  getToken(state) {
    return state.apiToken;
  },

};

const mutations = {
  [STORE_TOKEN](state, token) {
    state.apiToken = token;
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
            const token = result.data.data.users.api_token;
            setToken(token);
            commit(STORE_TOKEN, token);
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
      });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}