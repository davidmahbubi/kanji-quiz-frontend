import { auth } from '@/commons/api.service';
import { USER_REGISTER } from '@/store/actions.type';

const state = {

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
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}