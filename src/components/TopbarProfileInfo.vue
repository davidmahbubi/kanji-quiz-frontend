<template>
    <div class="row">
        <div class="col-md-6 col-8 pr-3 text-right p-0">
            <h5 class="text-custom-primary topbar-user-name m-0">{{ getUserDetail.name || 'Loading User' }}</h5>
            <span>{{ getScoreCount }}xp</span>
        </div>
        <div class="col-md-6 col-4 p-0 text-left">
            <img :src="`${getImageBaseUrl}/${getUserDetail.picture}`" alt="" class="profile-picture rounded-circle">
        </div>
    </div>
</template>

<script>

import { BASE_URL } from '@/commons/config';

export default {
    computed: {
        getUserDetail() {
            return this.$store.getters['auth/getUserDetail'];
        },
        getScoreCount() {
            const quizResult = this.$store.getters['auth/getUserDetail'].quiz_result || [];
            if (quizResult.length > 0) {
                return quizResult.map(({ score }) => score).reduce((acc, curr) => acc + curr);
            } else {
                return 0;
            }
        },
        getImageBaseUrl() {
            return `${BASE_URL}/img/profiles`;
        }
    }
}

</script>

<style scoped>

.topbar-user-name {
    font-size: 17px;
  }

.profile-picture {
    width: 60px;
    box-shadow: 0 0 10px rgba(146, 13, 255, 0.3);
}

</style>