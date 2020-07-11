<template>
    <div class="quiz-area-page py-5">
        <b-container>
            <h3 class="text-custom-primary">Quiz Area</h3>
            <span>{{ !isInQuiz ? 'Select level to begin' : '' }}</span>
            <div v-if="showRunningQuizAlert" class="text-center">
                <empty-page class="mt-5" :img-src="require('../assets/reading-time.svg')" title="Ups, you still have a quiz session" img-max-width="400px">
                    <h5>Finish it, or End it first</h5>
                    <b-button @click="endQuiz" class="btn-custom-outline-primary px-4 mt-3 py-2 mr-2" variant="outline">End Quiz</b-button>
                    <b-button to="/quiz_area/1" class="btn-custom-primary px-4 py-2 mt-3">Continue</b-button>
                </empty-page>
            </div>
            <section class="level-selector" v-else-if="!isInQuiz && !getInResultStatus">
                <div class="text-center mb-5">
                    <img src="../assets/online-test.svg" class="test-image" />
                </div>
                <b-row>
                    <b-col :md="7" :xl="4" :lg="6" class="mx-auto">
                        <form @submit.prevent="retrieveQuestions">
                            <b-form-group>
                                <b-form-select v-model="selectedLevel" class="input-custom-primary">
                                    <b-form-select-option value="" disabled>Select Level</b-form-select-option>
                                    <b-form-select-option v-for="level in levelsList" :key="level.id" :value="level.id">
                                        {{ level.name }}
                                    </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                            <b-button type="submit" class="btn-custom-primary w-100" :disabled="!ready">Start Quiz</b-button>
                        </form>
                    </b-col>
                </b-row>
            </section>
            <section class="main-page">
                <b-overlay :show="!ready">
                    <router-view @finish="finishQuiz" @end-result="endResult"/>
                </b-overlay>
            </section>
        </b-container>
    </div>
</template>

<script>

import QuizCard from '@/components/QuizCard.vue';
import EmptyPage from '@/components/EmptyPage.vue';
import { setAuth, level } from '@/commons/api.service';
import { RETRIEVE_QUESTIONS, FINISH_QUIZ } from '@/store/actions.type';
import { DELETE_QUESTIONS_LIST, CLEAR_USER_ANSWER, DELETE_QUESTION_DATA, SET_QUIZ_ACTIVE_STATE, SAVE_RESULT, DELETE_RESULT } from '@/store/mutations.type';

export default {

    data() {
        return {
            ready: false,
            selectedLevel: '',
            levelsList: [],
            questionTotal: 10,
        }
    },

    created() {
        setAuth();
        this.retrieveLevels();
    },

    methods: {
            
        async retrieveLevels() {
            try {
                this.toggleLoading(true);
                const { data } = await level.get();
                this.levelsList = data.data.levels;
            } catch (error) {
                Notiflix.Notify.Failure(error);
            } finally {
                this.toggleLoading(false);
            }
        },

        async retrieveQuestions() {
            try {
                this.toggleLoading(true);
                await this.$store.dispatch(`quiz/question/${RETRIEVE_QUESTIONS}`, this.selectedLevel);
                await this.$router.replace({path: '/quiz_area/1'});
                this.$store.commit(`quiz/${SET_QUIZ_ACTIVE_STATE}`, true);
            } catch (error) {
                Notiflix.Notify.Failure(error);
            } finally {
                this.toggleLoading(false);
            }
        },

        endQuiz() {
            // TODO: Wrap below's commit into Quiz Vuex Module
            Notiflix.Confirm.Show(
                'Confirmation',
                'Do you really want to end the active quiz ?',
                'Yes',
                'No',
                this.clearQuiz,
            );
        },

        clearQuiz() {
            this.$store.commit(`quiz/question/${DELETE_QUESTIONS_LIST}`);
            this.$store.commit(`quiz/question/${DELETE_QUESTION_DATA}`);
            this.$store.commit(`quiz/answer/${CLEAR_USER_ANSWER}`);
            this.$store.commit(`quiz/${SET_QUIZ_ACTIVE_STATE}`, false);
            this.$store.commit(`quiz/result/${DELETE_RESULT}`);
        },

        async finishQuiz() {
            try {
                Notiflix.Confirm.Show(
                    'Confirmation',
                    'Finish this quiz ?',
                    'Yes',
                    'No',
                    async () => {
                        this.ready = false;
                        // TODO: Make setAuth method call to elegant way :)
                        setAuth();
                        const quizResult = await this.$store.dispatch(`quiz/${FINISH_QUIZ}`, this.$store.getters['quiz/answer/getAnswers']);
                        this.$store.commit(`quiz/result/${SAVE_RESULT}`, quizResult.data.data.data)
                        this.ready = true;
                        this.$router.replace({name: 'QuizAreaResult'});
                    }
                );
            } catch (error) {
                Notiflix.Notify.Failure('An error occured while submitting data to server !');
            }
        },

        endResult() {
            this.clearQuiz();
        },

        toggleLoading(state) {
            this.ready = !state;
        }

    },

    computed: {

        getSelectedLevel() {
            return this.selectedLevel;
        },

        isInQuiz() {
            return this.$store.getters['quiz/getQuizActiveState'];
        },

        showRunningQuizAlert() {
            return this.ready && this.$store.getters['quiz/getQuizActiveState'] && this.$route.path === '/quiz_area';
        },

        getInResultStatus() {
            return !!this.$store.getters['quiz/result/getResult'];
        }

    },

    components: {
        QuizCard,
        EmptyPage,
    },
}
    
</script>

<style scoped>

    .level-selector {
        margin-top: 7vh;
    }

    .quiz-area {
        margin-top: 70px;
    }

    .test-image {
        width: 100%;
        max-width: 500px;
    }

</style>