import { auth } from '@/commons/api.service';
import { setToken, getToken } from '@/commons/token.service';
import { USER_REGISTER, USER_LOGIN } from '@/store/actions.type';

const state = {
  apiToken: getToken(),
};

const getters = {

};

const mutations = {

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

    [USER_LOGIN](ctx, credentials) {
      return new Promise((resolve, reject) => {
        auth.post('login', credentials)
          .then((result) => {
            setToken(result.data.data.users.api_token);
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