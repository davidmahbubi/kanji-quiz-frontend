<template>
    <div class="row">
        <div class="col-6 pr-3 text-right p-0">
            <h5 class="text-custom-primary topbar-user-name m-0">{{ getUserDetail.name || 'Loading User' }}</h5>
            <span>120xp</span>
        </div>
        <div class="col-6 p-0 text-left">
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