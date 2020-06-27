<template>
    <div class="quiz-area-page py-5">
        <h3 class="text-custom-primary">Quiz Area</h3>
        <span>{{ getCurrentNumber }}</span>
        <b-container>
            <section class="level-selector" v-if="currentNumber == 'start'">
                <b-row>
                    <b-col :md="7" :xl="4" :lg="6" class="mx-auto">
                        <form action="">
                            <b-form-group label="Level">
                                <b-form-select v-model="selectedLevel" class="input-custom-primary">
                                    <b-form-select-option value="" disabled>Select Level</b-form-select-option>
                                    <b-form-select-option value="n5">JLPT N5</b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                            <b-button type="submit" class="btn-custom-primary w-100">Start Quiz</b-button>
                        </form>
                    </b-col>
                </b-row>
            </section>
            <section class="quiz-area" v-else>
                <b-row>
                    <b-col class="text-center">
                        <quiz-card class="text-center px-5 py-2">
                            <h1 class="text-custom-primary mb-0">学校</h1>
                        </quiz-card>
                    </b-col>
                </b-row>
                <b-row class="mt-5">
                    <b-col :xl="7" class="mx-auto">
                        <b-form-group>
                            <b-row class="text-center">
                                <b-col class="mb-4" :sm="12" :md="6">
                                    <quiz-card class="py-0 text-left w-100">
                                        <b-form-radio name="asda" value="adas">
                                            あい
                                        </b-form-radio>
                                    </quiz-card>
                                </b-col>
                                <b-col class="mb-4" :sm="12" :md="6">
                                    <quiz-card class="py-0 text-left w-100">
                                        <b-form-radio name="asda" value="adas">
                                            がっこう
                                        </b-form-radio>
                                    </quiz-card>
                                </b-col>
                            </b-row>
                            <b-row class="text-center">
                                <b-col class="mb-4" :sm="12" :md="6">
                                    <quiz-card class="py-0 text-left w-100">
                                        <b-form-radio name="asda" value="adas">
                                            わたし
                                        </b-form-radio>
                                    </quiz-card>
                                </b-col>
                                <b-col class="mb-4" :sm="12" :md="6">
                                    <quiz-card class="py-0 text-left w-100">
                                        <b-form-radio name="asda" value="adas">
                                            うち
                                        </b-form-radio>
                                    </quiz-card>
                                </b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col class="text-left">
                                    <button class="btn btn-custom-outline-primary py-2 px-3">Previous</button>
                                </b-col>
                                <b-col class="text-right">
                                    <button class="btn btn-custom-primary px-3">Next</button>
                                </b-col>
                            </b-row>
                        </b-form-group>
                    </b-col>
                </b-row>
            </section>
        </b-container>
    </div>
</template>

<script>
    import QuizCard from '@/components/QuizCard.vue';

    export default {

        data() {
            return {
                currentNumber: '',
                selectedLevel: '',
                questionTotal: 10,
                selectedAnswer: ''
            }
        },

        created() {
            this.currentNumber = this.$route.params.id
        },

        computed: {
            getCurrentNumber() {
                if (this.currentNumber == 'start') {
                    return 'Level Select'
                } else {
                    return `${this.currentNumber} of ${this.questionTotal}`
                }
            }
        },

        components: {
            QuizCard,
        },

    }
</script>

<style scoped>

    .level-selector {
        margin-top: 20vh;
    }

    .quiz-area {
        margin-top: 70px;
    }

</style>