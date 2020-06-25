<template>
    <b-card class="quiz-card d-inline-block">
        <b-card-body class="text-custom-primary">
            <slot></slot>
        </b-card-body>
    </b-card>
</template>

<style scoped>

.quiz-card {
    box-shadow: 0 4px 10px rgba(0,0,0,.2);
    border-radius: 14px;
}

</style>
