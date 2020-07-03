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
            <empty-page :imgSrc="require('@/assets/time.svg')" imgMaxWidth="300px" class="text-center pt-3" title="This feature is coming soon"></empty-page>
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