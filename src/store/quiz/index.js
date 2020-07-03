import { SET_QUIZ_ACTIVE_STATE } from '@/store/mutations.type';
import { FINISH_QUIZ } from '@/store/actions.type';
import { quiz } from '@/commons/api.service';

const state = {
    quizActiveState: false,
}

const getters = {
    getQuizActiveState(state) {
        return state.quizActiveState;
    },
}

const mutations = {
    [SET_QUIZ_ACTIVE_STATE](state, activeState) {
        state.quizActiveState = activeState;
    },
}

const actions = {
    [FINISH_QUIZ]({ commit }, answer) {
        return new Promise((resolve, reject) => {
            quiz.post('submit_quiz', answer)
              .then((result) => {
                  commit(SET_QUIZ_ACTIVE_STATE, false);
                  resolve(result);
              })
              .catch((error) => {
                  reject(error);
              });
        });
    },
}

const modules = {
    question: require('./question.module').default,
    result: require('./result.module').default,
    answer: require('./answer.module').default,
}

export default {
    namespaced: true,
    modules,
    state,
    getters,
    mutations,
    actions,
}
