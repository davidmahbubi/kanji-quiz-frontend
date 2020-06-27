<template>
    <div class="empty-page-component">
        <img :src="imgSrc" alt="Error Image" :style="{'max-width': imgMaxWidth}">
        <h2 class="mt-5 text-custom-primary">{{ title }}</h2>
        <slot/>
    </div>
</template>

<script>

export default {
    props: ['imgSrc', 'imgMaxWidth', 'title']
}

</script>

<style scoped>

img {
    width: 100%;
}

</style>