import { SAVE_RESULT, DELETE_RESULT } from '@/store/mutations.type';

const state = {
    result: null,
    list: [],
}

const getters = {
    getResult(state) {
        return state.result;
    },
}

const mutations = {
    [SAVE_RESULT](state, result) {
        state.result = result;
    },
    [DELETE_RESULT](state) {
        state.result = null;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}
