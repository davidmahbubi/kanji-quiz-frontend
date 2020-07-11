<template>
    <div class="settings-page py-5">
        <h3 class="text-custom-primary">Settings</h3>
        <div class="mt-5">
            <b-card no-body>
                <b-overlay :show.sync="loading">
                    <b-tabs card>
                        <b-tab title="Profile" active>
                            <b-overlay :show.sync="loading.profile">
                                <b-card-text class="text-center">
                                    <setting-profile @loading="toggleLoading" />
                                </b-card-text>
                            </b-overlay>
                        </b-tab>
                        <b-tab title="Security">
                            <b-row class="mt-3">
                                <b-col :sm="12" :md="6" :lg="8" :xl="5">
                                    <setting-security @loading="toggleLoading" />
                                </b-col>
                            </b-row>
                        </b-tab>
                    </b-tabs>
                </b-overlay>
            </b-card>
        </div>
    </div>
</template>

<script>

import SettingProfile from '@/components/SettingProfile.vue';
import SettingSecurity from '@/components/SettingSecurity.vue';

export default {
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        toggleLoading(state) {
            this.loading = state;
        },
    },
    components: {
        SettingProfile,
        SettingSecurity,
    },
}
</script>
