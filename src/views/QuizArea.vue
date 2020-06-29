<template>
    <div class="quiz-area-page py-5">
        <h3 class="text-custom-primary">Quiz Area</h3>
        <span>{{ !getInQuizStatus ? 'Select level to begin' : '' }}</span>
        <b-container>
            <section class="level-selector" v-if="!getInQuizStatus">
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
            <section>
                <router-view/>
            </section>
        </b-container>
    </div>
</template>

<script>

    import QuizCard from '@/components/QuizCard.vue';
    import { setAuth, level } from '@/commons/api.service';
    import { RETRIEVE_QUESTIONS } from '@/store/actions.type';
    import { START_QUIZ } from '@/store/mutations.type';

    export default {

        data() {
            return {
                ready: false,
                selectedLevel: '',
                levelsList: [],
                questionTotal: 10,
            }
        },

        beforeCreate() {
            if (this.$store.getters['question/getInQuiz']) {
                this.$router.replace({path: '/quiz_area/1'});
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
                    await this.$store.dispatch(`question/${RETRIEVE_QUESTIONS}`, this.selectedLevel);
                    this.$store.commit(`question/${START_QUIZ}`);
                    this.$router.replace({path: '/quiz_area/1'});
                } catch (error) {
                    Notiflix.Notify.Failure(error);
                }
            },

            toggleLoading(state) {
                this.ready = !state;
            }

        },

        computed: {

            getSelectedLevel() {
                return this.selectedLevel;
            },

            getInQuizStatus() {
                return this.$store.getters['question/getInQuiz'];
            }

        },

        components: {
            QuizCard,
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