<template>
    <b-row class="mt-4 mb-5">
        <b-col v-for="(content, index) in contents" :key="index" :xl="3" :sm="6" class="mb-sm-0 mb-2">
          <home-highlight-card :title="content.title" :value="`${content.value}x`" />
        </b-col>
        <!-- <b-col :xl="3" :sm="6" class="mb-sm-0 mb-2">
          <home-highlight-card title="Play Times" :value="`${getPlayTimes}x`" />
        </b-col>
        <b-col :xl="3" :sm="6" class="mb-sm-0 mb-2">
          <home-highlight-card title="Perfect Times" :value="`${getPerfectTimes}x`" />
        </b-col> -->
      </b-row>
</template>

<script>

import HomeHighlightCard from '@/components/HomeHighlightCard.vue';

export default {
    props: {
        contents: Array,
    },
    components: {
        HomeHighlightCard,
    }
}
</script>
