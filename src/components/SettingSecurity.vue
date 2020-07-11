<template>
    <div class="setting-security">
        <b-form-group label="Update Password" class="pt-2">
            <form @submit.prevent="updatePassword" data-field="password">
                <input type="password" class="mb-3 input-custom-primary w-100" placeholder="Old Password"
                    v-model="data.currentPassword">
                <input type="password" class="mb-3 input-custom-primary w-100" placeholder="New Password"
                    v-model="data.password">
                <input type="password" class="mb-3 input-custom-primary w-100" placeholder="Confirm Password"
                    v-model="data.confirmPassword">
                <div class="text-right">
                    <b-button type="submit" class="btn-custom-primary px-3 w-100">Confirm Password Update</b-button>
                </div>
            </form>
        </b-form-group>
    </div>
</template>

<script>

import { SAVE_PROFILE_PASSWORD } from '@/store/actions.type';
import { SAVE_USER } from '@/store/mutations.type';

export default {
    data() {
        return {
            data: {
                currentPassword: '',
                password: '',
                confirmPassword: '',
            },
        }
    },
    methods: {
        async updatePassword() {
            try {
                this.$emit('loading', true);
                if (this.data.password === this.data.confirmPassword) {
                    const { data } = await this.$store.dispatch(`settings/${SAVE_PROFILE_PASSWORD}`, {
                        password: this.data.password,
                        current_password: this.data.currentPassword,
                    });
                    if (data.success) {
                        Notiflix.Notify.Success('Password Updated !');
                    } else {
                        Notiflix.Notify.Failure(data.message);
                    }
                    this.data.currentPassword = '';
                    this.data.password = '';
                    this.data.confirmPassword = '';
                } else {
                    Notiflix.Notify.Failure('Password din\'t match !');
                }
            } catch (error) {
                Notiflix.Notify.Failure(error);
            } finally {
                this.$emit('loading', false);
            }
        },
    }
}
</script>
