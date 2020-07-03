import { SET_ANSWER, CLEAR_USER_ANSWER } from "@/store/mutations.type";
import { ANSWER_QUESTION } from '@/store/actions.type'

const state = {
    answers: [],
}

const getters = {
    getAnswer: state => index => {
        return state.answers[index];
    },
    getAnswers(state) {
        return state.answers;
    },
}

const mutations = {
    [SET_ANSWER](state, { index, answer }) {
        state.answers[index] = answer;
    },
    [CLEAR_USER_ANSWER](state) {
        state.answers = [];
    }
}

const actions = {
    [ANSWER_QUESTION]({ commit }, { index, questionId, answer }) {
        commit(SET_ANSWER, {
            index,
            answer: {
                id: questionId,
                answer,
            }
        });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
