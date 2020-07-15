<template>
    <div class="home-highlight">
        <b-card class="highlight-card">
            <b-card-body class="p-0">
                {{ title }}
                <h3 class="mb-0 mt-1">{{ value }}</h3>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        value: String,
    },
}
</script>

<style scoped>

.highlight-card {
    background-color: #8900CE;
    color: white;
    transition: .2s;
}

.highlight-card:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 10px rgba(0,0,0,.5);
}

</style>
