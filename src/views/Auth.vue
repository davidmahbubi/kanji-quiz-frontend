<template>
    <div id="auth-page">
        <b-container>
            <router-link :to="{name: 'AuthLogin'}">
                <img src="@/assets/kanji-logo-big.svg" alt="Kanji Logo" class="auth-logo">
            </router-link>
            <router-view class="auth-view"></router-view>
        </b-container>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.auth-logo {
    width: 100%;
    max-height: 200px;
    margin: 40px 0;
}

.auth-view {
    margin: 45px 0;
}

</style>
