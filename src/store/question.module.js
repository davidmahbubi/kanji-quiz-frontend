import {
    SAVE_QUESTIONS_LIST,
    DELETE_QUESTIONS_LIST,
    SAVE_QUESTION_DATA,
    START_QUIZ,
    ANSWER_QUESTION,
    CLEAR_USER_ANSWER,
    DELETE_QUESTION_DATA,
    END_QUIZ,
} from '@/store/mutations.type';

import { RETRIEVE_QUESTIONS } from '@/store/actions.type';
import { question } from '@/commons/api.service';

const state = {
    questionsList: [],
    userAnswer: [],
    questionData: {},
    inQuiz: false,
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

    getCurrentPosition(state) {
        return state.currentPosition;
    },

    getInQuiz(state) {
        return state.inQuiz;
    },

    getAnswer: state => index => {
        return state.userAnswer[index] ? state.userAnswer[index].answer : null;
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

    [START_QUIZ](state) {
        state.inQuiz = true;
    },

    [END_QUIZ](state) {
        state.inQuiz = false;
    },

    [ANSWER_QUESTION](state, {index, questionId, answer}) {
        state.userAnswer[index] = {
            answer,
            id: questionId,
        };
    },

    [CLEAR_USER_ANSWER](state) {
        state.userAnswer = [];
    },
    
};

const actions = {

    [RETRIEVE_QUESTIONS]({ commit }, level) {

        return new Promise((resolve, reject) => {

            question.get(`list/${level}`)

              .then((result) => {

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
              })
        });
    },

};

export default {
    namespaced: 'true',
    state,
    getters,
    actions,
    mutations,
}