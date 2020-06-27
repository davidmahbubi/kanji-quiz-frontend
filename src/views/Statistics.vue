<template>
    <div class="statistics-page text-center">
        <empty-page :img-src="require('../assets/under-construction.svg')" img-max-width="300px" :title="'Sorry :('">
            <h5>This page is under massive construction</h5>
        </empty-page>        
    </div>
</template>

<script>

import EmptyPage from '@/components/EmptyPage.vue';

export default {
    components: {
        EmptyPage,
    },
};

</script>

<style scoped>

.empty-page-component {
    margin-top: 30vh;
}

</style>
