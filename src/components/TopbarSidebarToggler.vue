<template>
    <b-row class="topbar-sidebar-toggler" @click="clicked">
        <b-col>
            <b-icon-list class="toggler-icon text-custom-primary" />
        </b-col>
    </b-row>
</template>

<script>

export default {
    methods: {
        clicked() {
            this.$emit('clicked');
        }
    }
}

</script>

<style scoped>

.toggler-icon {
    font-size: 30px;
    height: 100%;
    margin: 6px 0;
    cursor: pointer;
}

</style>
