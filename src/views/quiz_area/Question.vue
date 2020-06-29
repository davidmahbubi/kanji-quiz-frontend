<template>
    <section class="quiz-area">
        <b-row>
            <b-col class="text-center">
                <quiz-card class="text-center px-5 py-2">
                    <h1 class="text-custom-primary mb-0">{{ getQuestion ? getQuestion.question : '...' }}</h1>
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
                                    {{ getQuestion ? getQuestion.option_a : '...' }}
                                </b-form-radio>
                            </quiz-card>
                        </b-col>
                        <b-col class="mb-4" :sm="12" :md="6">
                            <quiz-card class="py-0 text-left w-100">
                                <b-form-radio name="asda" value="adas">
                                    {{ getQuestion ? getQuestion.option_b : '...' }}
                                </b-form-radio>
                            </quiz-card>
                        </b-col>
                    </b-row>
                    <b-row class="text-center">
                        <b-col class="mb-4" :sm="12" :md="6">
                            <quiz-card class="py-0 text-left w-100">
                                <b-form-radio name="asda" value="adas">
                                    {{ getQuestion ? getQuestion.option_c : '...' }}
                                </b-form-radio>
                            </quiz-card>
                        </b-col>
                        <b-col class="mb-4" :sm="12" :md="6">
                            <quiz-card class="py-0 text-left w-100">
                                <b-form-radio name="asda" value="adas">
                                    {{ getQuestion ? getQuestion.option_d : '...' }}
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
</template>

<script>

import QuizCard from '@/components/QuizCard.vue';

export default {
    
    beforeCreate() {
        if (!this.$store.getters['question/getInQuiz'] && this.$store.getters['question/getQuestionsList'].length <= 0) {
            this.$router.replace({name: 'QuizArea'});
        }
    },

    computed: {
        getQuestion() {
            return this.$store.getters['question/getQuestion'](this.$route.params.number);
        }
    },

    components: {
        QuizCard,
    },

};

</script>