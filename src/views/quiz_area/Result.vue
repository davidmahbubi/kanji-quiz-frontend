<template>
    <div class="result text-center mt-5">
        <h3 class="text-custom-primary">Quiz Result</h3>
        <quiz-card class="mt-5">
            <h4 class="mb-0">{{ rating }}</h4>
            <span>+{{ result.score }} exp</span>
            <div class="row my-5">
                <div class="col px-md-5">
                    <img src="../../assets/correct.svg" alt="" class="w-100 mb-2" style="max-width: 80px">
                    <h3>{{ result.correct ? result.correct.length : '' }}</h3>
                </div>
                <div class="col px-md-5">
                    <img src="../../assets/wrong.svg" alt="" class="w-100 mb-2" style="max-width: 80px">
                    <h3>{{ result.wrong ? result.wrong.length : '' }}</h3>
                </div>
            </div>
            <b-button class="btn-custom-primary px-3" v-b-modal.review-modal>Review</b-button>
            <router-link to="/quiz_area" class="d-block mt-3 text-custom-primary">Back to home</router-link>
        </quiz-card>
        <b-modal id="review-modal" title="Review Quiz" ok-only>
            <template v-slot:modal-footer="{cancel}">
                <b-button class="btn-custom-primary px-3" @click="cancel()">Close</b-button>
            </template>
            <section>
                <h3 class="text-custom-primary mb-3">Wrong Answer</h3>
                <p v-if="result.wrong.length <= 0">No wrong answer :)</p>
                <ol v-else>
                    <li v-for="(wrong_answer, index) in result.wrong" :key="index" class="mb-2">
                        <h5>{{ wrong_answer.question }}</h5>
                        Correct Answer : {{ wrong_answer[`option_${wrong_answer.answer}`] }}
                    </li>
                </ol>
            </section>
            <section>
                <h3 class="text-custom-primary mb-3">Correct Answer</h3>
                <h5 v-if="result.correct.length <= 0">No correct answer :(</h5>
                <ol v-else>
                    <li v-for="(correct_answer, index) in result.correct" :key="index" class="mb-2">
                        <h5>{{ correct_answer.question }}</h5>
                        Correct Answer : {{ correct_answer[`option_${correct_answer.answer}`] }}
                    </li>
                </ol>
            </section>
        </b-modal>
    </div>
</template>

<script>

import QuizCard from '@/components/QuizCard.vue';
import EmptyPage from '@/components/EmptyPage.vue';

export default {

    beforeCreate() {
        if (!this.$store.getters['quiz/result/getResult']) {
            this.$router.replace({name: 'QuizArea'});
        }
    },

    computed: {
        result() {
            console.log(this.$store.getters['quiz/result/getResult']);
            return this.$store.getters['quiz/result/getResult'] || {};
        },
        rating() { 
            const result = this.$store.getters['quiz/result/getResult'] || {};
            const score = result.correct && result.wrong ? result.correct.length / (result.correct.length + result.wrong.length) : 0;
            return this.decideRating(score);
        }
    },

    methods: {
        decideRating(score) {
            if (score >= 1) {
                return 'Perfectly';
            } else if (score >= 0.7) {
                return 'Good'
            } else if (score >= 0.4) {
                return 'Need Some Evaluation'
            } else {
                return 'Let\'s Study Again !'
            }
        },
    },

    beforeDestroy() {
        this.$emit('end-result');
    },

    components: {
        QuizCard,
        EmptyPage,
    },

}

</script>