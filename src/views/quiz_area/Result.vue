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
            <b-button class="btn-custom-primary px-3">Review</b-button>
            <router-link to="/quiz_area" class="d-block mt-3 text-custom-primary">Back to home</router-link>
        </quiz-card>
    </div>
</template>

<script>

import QuizCard from '@/components/QuizCard.vue';

export default {

    components: {
        QuizCard,
    },

    computed: {

        result() {
            return this.$store.getters['question/getResults'] || {};
        },
        
        rating() {
            
            const result = this.$store.getters['question/getResults'] || {};
            const score = result.correct && result.wrong ? result.correct.length / (result.correct.length + result.wrong.length) : 0;
            
            if (score >= 1) {
                return 'Perfectly';
            } else if (score >= 0.7) {
                return 'Good'
            } else if (score >= 0.4) {
                return 'Need Some Evaluation'
            } else {
                return 'Let\'s Study Again !'
            }

        }
    },

    beforeDestroy() {
        this.$emit('end-result');
    },

}

</script>