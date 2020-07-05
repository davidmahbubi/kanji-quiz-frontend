<template>
    <section class="quiz-area">
        <b-row>
            <b-col class="text-center">
                <quiz-card class="text-center px-5 py-2">
                    <h1 class="text-custom-primary mb-0">{{ question.question || '...' }}</h1>
                </quiz-card>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <b-col :xl="7" class="mx-auto">
                <b-form-group>
                    <form name="optionForm">
                        <b-row class="text-center">
                            <b-col class="mb-4" :sm="12" :md="6">
                                <quiz-card class="py-0 text-left w-100">
                                    <b-form-radio name="option" value="a" v-model="userInput.answer">
                                        {{ question ? question.option_a : '...' }}
                                    </b-form-radio>
                                </quiz-card>
                            </b-col>
                            <b-col class="mb-4" :sm="12" :md="6">
                                <quiz-card class="py-0 text-left w-100">
                                    <b-form-radio name="option" value="b" v-model="userInput.answer">
                                        {{ question ? question.option_b : '...' }}
                                    </b-form-radio>
                                </quiz-card>
                            </b-col>
                        </b-row>
                        <b-row class="text-center">
                            <b-col class="mb-4" :sm="12" :md="6">
                                <quiz-card class="py-0 text-left w-100">
                                    <b-form-radio name="option" value="c" v-model="userInput.answer">
                                        {{ question ? question.option_c : '...' }}
                                    </b-form-radio>
                                </quiz-card>
                            </b-col>
                            <b-col class="mb-4" :sm="12" :md="6">
                                <quiz-card class="py-0 text-left w-100">
                                    <b-form-radio name="option" value="d" v-model="userInput.answer">
                                        {{ question ? question.option_d : '...' }}
                                    </b-form-radio>
                                </quiz-card>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col class="text-left">
                                <b-button @click="previous" class="btn-custom-outline-primary py-2 px-3"
                                    variant="outline" :disabled="question.questionData.currentNumber === 1">
                                    Previous
                                </b-button>
                            </b-col>
                            <b-col class="text-right">
                                <b-button @click="next" class="btn btn-custom-primary px-3"
                                    v-if="question.questionData.currentNumber < question.questionData.questionCount">
                                    Next
                                </b-button>
                                <b-button @click="finish" class="btn btn-custom-primary px-3" v-else>
                                    Finish
                                </b-button>
                            </b-col>
                        </b-row>
                    </form>
                </b-form-group>
            </b-col>
        </b-row>
    </section>
</template>

<script>

import QuizCard from '@/components/QuizCard.vue';
import { ANSWER_QUESTION } from '@/store/actions.type';

export default {

    data() {
        return {
            userInput: {
                answer: '',
            },
            question: {
                questionData: {},
                question: {},
            },
            loading: false,
            radios: null,
        }
    },

    beforeCreate() {
        // If no active quiz redirect to QuizArea
        if (!this.$store.getters['quiz/getQuizActiveState'] && this.$store.getters['quiz/question/getQuestionsList'].length <= 0) {
            this.$router.replace({
                name: 'QuizArea'
            });
        }
    },

    mounted() {
        // Add event listener to each option radio
        this.radios = document.querySelectorAll('input[type=radio]');
        this.init();
    },

    methods: {
        init() {
            this.question = this.getQuestion(this.getPageIndex() - 1);
            this.question.questionData = {
                ...this.getQuestionData(),
                currentNumber: this.getPageIndex(),
            };
            const userAnswer = this.$store.getters['quiz/answer/getAnswer'](this.getPageIndex() - 1);
            if (userAnswer) {
                this.selectAnswerRadio(userAnswer);
            }
        },
        next() {
            this.redirectToQuestion(this.getPageIndex() + 1);
        },
        previous() {
            this.redirectToQuestion(this.getPageIndex() - 1);
        },
        finish() {
            const answeredQuestionsLength = this.$store.getters['quiz/answer/getAnswers'].filter(val => val).length;
            const questionsCount = this.$store.getters['quiz/question/getQuestionsList'].length;
            if (answeredQuestionsLength === questionsCount) {
                this.$emit('finish');
            } else {
                Notiflix.Notify.Failure('Please complete all question first !');
            }
        },
        selectAnswerRadio({ answer }) {
            const answerRadio = document.querySelector(`input[value=${answer}]`);
            answerRadio.checked = true;
        },
        redirectToQuestion(number) {
            this.userInput.answer = '';
            this.clearRadioSelected(this.radios);
            this.$router.push({
                path: `/quiz_area/${number}`
            });
            this.init();
        },
        clearRadioSelected(radios) {
            for (const radio of radios) {
                radio.checked = false;
            }
        },
        getQuestionData() {
            return this.$store.getters['quiz/question/getQuestionData'] || {};
        },
        getQuestion(number) {
            return this.$store.getters['quiz/question/getQuestion'](number) || {};
        },
        getPageIndex() {
            return parseInt(this.$route.params.number);
        },
    },

    watch: {
        userInput: {
            deep: true,
            handler(e) {
                if (e.answer) {
                    this.$store.dispatch(`quiz/answer/${ANSWER_QUESTION}`, {
                        index: this.question.questionData.currentNumber - 1,
                        questionId: this.question.id,
                        answer: e.answer,
                    });
                }
            },
        }
    },

    components: {
        QuizCard,
    },

};
</script>