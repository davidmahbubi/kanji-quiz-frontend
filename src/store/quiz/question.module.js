import { RETRIEVE_QUESTIONS } from '@/store/actions.type';
import { question } from '@/commons/api.service';
import {
    SAVE_QUESTIONS_LIST,
    DELETE_QUESTIONS_LIST,
    SAVE_QUESTION_DATA,
    DELETE_QUESTION_DATA,
} from '@/store/mutations.type';

const state = {
    questionsList: [],
    userAnswer: [],
    questionData: {},
};

const getters = {
    
    getQuestionsList(state) {
        return state.questionsList;
    },

    getQuestion: state => number => {
        return state.questionsList[number];
    },

    getQuestionData(state) {
        return state.questionData;
    },

};

const mutations = {
    [SAVE_QUESTIONS_LIST](state, questionsList) {
        state.questionsList = questionsList;
    },
    [SAVE_QUESTION_DATA](state, questionData) {
        state.questionData = questionData;
    },
    [DELETE_QUESTION_DATA](state) {
        state.questionData = {};
    },
    [DELETE_QUESTIONS_LIST](state) {
        state.questionsList = [];
    },  
};

const actions = {

    [RETRIEVE_QUESTIONS]({ commit }, level) {
        return new Promise((resolve, reject) => {
            question.get(`list/${level}`)
            .then((result) => {
                makeLog('QUESTION-ACTIONS', 'Promise resolved');
                const questionsResult = result.data.data;
                commit(SAVE_QUESTION_DATA, {
                    level: questionsResult.level,
                    questionCount: questionsResult.questions.length,
                });
                commit(SAVE_QUESTIONS_LIST, questionsResult.questions);
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
    actions,
    mutations,
}