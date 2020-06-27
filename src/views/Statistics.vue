<template>
    <div class="statistics-page text-center py-5">
        <empty-page :img-src="require('../assets/maintenance.svg')" img-max-width="300px" :title="'This Page is Under Maintenance'"></empty-page>        
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



</style>
