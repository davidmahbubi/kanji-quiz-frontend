import {
    SAVE_QUESTIONS_LIST,
    DELETE_QUESTIONS_LIST,
    SAVE_QUESTION_DATA,
    START_QUIZ,
    ANSWER_QUESTION,
    CLEAR_USER_ANSWER,
    DELETE_QUESTION_DATA,
    END_QUIZ,
    SAVE_RESULT,
    DELETE_RESULTS
} from '@/store/mutations.type';

import { RETRIEVE_QUESTIONS, FINISH_QUIZ } from '@/store/actions.type';
import { question, quiz } from '@/commons/api.service';

const state = {
    questionsList: [],
    userAnswer: [],
    questionData: {},
    results: null,
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

    getSingleAnswer: state => index => {
        return state.userAnswer[index] ? state.userAnswer[index].answer : null;
    },

    getAnswers(state) {
        return state.userAnswer;
    },

    getResults(state) {
        return state.results;
    }

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

    [SAVE_RESULT](state, result) {
        state.results = result;
    },

    [DELETE_RESULTS](state) {
        state.results = null;
    }
    
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

    // TODO: Finish this one after you continue develop the backend

    [FINISH_QUIZ]({ commit }, answer) {
        return new Promise((resolve, reject) => {
            quiz.post('submit_quiz', answer)
              .then((result) => {
                  commit(SAVE_RESULT, result.data.data.data);
                  resolve(result);
              })
              .catch((error) => reject(error));
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