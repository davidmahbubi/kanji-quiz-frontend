<template>
    <div class="auth-form-card">
        <b-row>
            <b-col :sm="12" :md="10" :lg="7" :xl="6" class="mx-auto">
                <b-card class="auth-form-card-item">
                    <b-card-body>
                        <slot/>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'AuthFormCard'
}
</script>

<style scoped>

.auth-form-card-item {
    box-shadow: 0 4px 29px rgba(0,0,0,.25);
    border-radius: 19px;
    border: none;
}

</style>
