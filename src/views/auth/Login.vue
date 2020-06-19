<template>
    <div id="login-page">    
        <auth-form-card>
            <form action="">
                <h3 class="text-custom-primary auth-form-title">Welcome</h3>
                <input type="text" class="input-custom-primary w-100 mb-5" placeholder="Username">
                <input type="password" class="input-custom-primary w-100 mb-5" placeholder="Password">
                <button type="submit" class="btn btn-custom-primary w-100">Sign In</button>
            </form>
            <div class="text-center mt-3">
                <router-link :to="{name: 'AuthRegister'}" class="link-custom-primary">Don't have an account ?</router-link>
            </div>
        </auth-form-card>
    </div>
</template>

<script>

import AuthFormCard from '@/components/AuthFormCard.vue';

export default {
    components: {
        AuthFormCard,
    },
};

</script>

<style scoped src="@/assets/css/auth.css"></style>