<template>
  <div class="home">
    <empty-page v-if="!getPlayTimes" :img-src="require('../assets/empty.svg')" img-max-width="350px" title="Looks so spacious here">
      <p>This page will contain your highlighted stats</p>
      <b-button class="px-3 mt-1 btn-custom-primary" :to="{name: 'QuizArea'}">Start Your First Quiz</b-button>
    </empty-page>
    <section v-else>
      <banner class="mx-3" v-show="bannerActive" @close-bt-pressed="bannerActive = false" />
      <b-row class="mt-4 mb-5">
        <b-col :xl="3" :sm="6" class="mb-sm-0 mb-2">
          <home-highlight-card title="Play Times" :value="`${getPlayTimes}x`" />
        </b-col>
        <b-col :xl="3" :sm="6" class="mb-sm-0 mb-2">
          <home-highlight-card title="Perfect Times" :value="`${getPerfectTimes}x`" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="getPlayHistories"></b-table>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>

import HomeHighlightCard from '@/components/HomeHighlightCard.vue';
import EmptyPage from '@/components/EmptyPage.vue';
import Banner from '@/components/Banner.vue';

export default {
  name: 'Home',
  data() {
    return {
      bannerActive: true,
    }
  },
  components: {
    EmptyPage,
    HomeHighlightCard,
    Banner,
  },
  mounted() {
    this.generatePerfectRateChart('#perfect-rate-chart');
  },
  computed: {
    // TODO: Please keep DRY here !
    getPlayTimes() {
      const userDetail = this.$store.getters['auth/getUserDetail'].quiz_result || [];
      return userDetail.length;
    },
    getPerfectTimes() {
      const quizResult = this.$store.getters['auth/getUserDetail'].quiz_result || [];
      return quizResult.filter(result => result.wrong_answer === 0).length;
    },
    getPlayHistories() {
      // FIXME: It's really dirty here !
      const quizHistories = this.$store.getters['auth/getUserDetail'].quiz_result || [];
      return quizHistories.reverse().map(history => ({
        play_time: history.created_at,
        level: history.level_name,
        questions_total: parseInt(history.correct_answer) + parseInt(history.wrong_answer),
        correct_answers: history.correct_answer,
        wrong_answers: history.wrong_answer,
        score: history.score,
      }));
    },
  }
}

</script>

<style scoped>

.empty-page-component {
    margin-top: 15vh;
}

.home {
  text-align: center;
  padding: 10px 20px;
}

.empty-image {
  margin-top: 50px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 350px;
}

#home-empty-space {
  margin: 10vh 0;
}

.ct-series-a .ct-slice-donut {
  /* give the donut slice a custom colour */
  stroke: blue;
  /* customize stroke width of the donut slices in CSS. Note that this property is already set in JavaScript and label positioning also relies on this. In the right situation though it can be very useful to style this property. You need to use !important to override the style attribute */
  stroke-width: 5px !important;
  /* create modern looking rounded donut charts */
  stroke-linecap: round;
}

</style>
