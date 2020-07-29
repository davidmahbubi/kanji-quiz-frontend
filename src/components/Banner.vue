<template>
    <div class="banner mt-4">
        <b-card>
            <b-card-body class="p-0 text-left">
                <table>
                    <tr>
                        <td>
                            <img src="../assets/developer-activity.svg" class="d-inline-block mr-4" alt="" width="200">
                        </td>
                        <td>
                            <p class="d-inline">
                                This application is under development progress, so maybe you'll exprienced a bit buggy and unoptimized. The Developer is still working hard
                                to make your experienced more smooth and snappy, so stay tuned 😁
                            </p>
                        </td>
                    </tr>
                </table>
                <b-button class="position-absolute banner-close-bt btn-custom-primary" @click="onCloseBtPressed">X</b-button>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
    methods: {
        onCloseBtPressed() {
            this.$emit('close-bt-pressed');
        }
    }
}
</script>

<style scoped>

.banner-close-bt {
    padding: 8px 14px !important;
    box-shadow: none;
    right: -14px;
    top: -14px;
    transition: .2s;
}

.banner-close-bt:hover {
    transform: scale(1.09);
}

</style>
