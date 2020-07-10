<template>
    <div class="settings-page py-5">
        <h3 class="text-custom-primary">Settings</h3>
        <div class="mt-5">
        <b-card no-body>
            <b-tabs card>
            <b-tab title="Profile" active>
                <b-overlay :show.sync="loading.profile">
                    <b-card-text class="text-center">
                        <div class="profile-img-wrapper mb-4 mt-3 d-inline-block position-relative">
                            <div class="profile-img-wrapper rounded-circle">
                                <b-img :src="`${getImageBaseUrl}/${getUserDetail.picture}`" class="profile-img" height="160"></b-img>
                            </div>
                            <label for="input-update-img" class="position-absolute update-img-btn d-block text-light">
                                <i class="fas fa-camera"></i>
                            </label>
                            <input type="file" id="input-update-img" class="picture-input d-none" @change="handleFileChange" accept=".jpeg,.jpg,.png,.gif">
                        </div>
                        <div v-if="!toggles.name">
                            <h3 class="d-inline">{{ data.name }}</h3>
                            <i @click.prevent="toggles.name = !toggles.name" class="fas fa-pencil-alt attr-action-icon attr-action-icon-big"></i>
                        </div>
                        <div v-else>
                            <input type="text" class="text-center input-custom-primary" value="David Mahbubi" v-model="data.name">
                            <i data-field="name" @click.prevent="updateName" class="fas fa-save ml-2 attr-action-icon attr-action-icon-big"></i>
                        </div>
                        <span>@{{ getUserDetail.username }}</span>
                    </b-card-text>
                </b-overlay>
            </b-tab>
            <b-tab title="Security">
                <b-row class="mt-3">
                    <b-col :sm="12" :md="6" :lg="8" :xl="5">
                        <b-form-group label="Update Password" class="pt-2">
                            <form @submit.prevent="updatePassword" data-field="password">
                                <input type="password" class="mb-3 input-custom-primary w-100"  placeholder="Old Password" v-model="data.currentPassword">
                                <input type="password" class="mb-3 input-custom-primary w-100"  placeholder="New Password" v-model="data.password">
                                <input type="password" class="mb-3 input-custom-primary w-100"  placeholder="Confirm Password" v-model="data.confirmPassword">
                                <div class="text-right">
                                    <b-button type="submit" class="btn-custom-primary px-3 w-100">Confirm Password Update</b-button>
                                </div>
                            </form>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-tab>
            <b-tab title="Coming Soon" disabled>
                <b-card-text>Coming soon :)</b-card-text>
            </b-tab>
            </b-tabs>
        </b-card>
        </div>
    </div>
</template>

<script>

import { BASE_URL } from '@/commons/config';
import { SAVE_PROFILE_SETTINGS, SAVE_PROFILE_PICTURE, SAVE_PROFILE_PASSWORD } from '@/store/actions.type';
import { SAVE_USER } from '@/store/mutations.type';

export default {
    data() {
        return {
            toggles: {
                name: false,
            },
            data: {
                name: '',
                picture: null,
                currentPassword: '',
                password: '',
                confirmPassword: '',
            },
            loading: {
                profile: false,
            },
            imagesValidations: {
                allowedImageMimes: ['jpeg', 'jpg', 'png', 'gif'],
                maxImageSize: 2048,
            },
        }
    },
    methods: {
        async updateName() {
            try {
                this.loading.profile = true;
                const { data } = await this.sendData(SAVE_PROFILE_SETTINGS, {
                    field: 'name',
                    value: this.data.name,
                });
                if (data.success) {
                    Notiflix.Notify.Success('Profile Updated !');
                    this.$store.commit(`auth/${SAVE_USER}`, data.data.user);
                    this.toggles.name = false;
                }
            } catch (error) {
                console.log(error);
                Notiflix.Notify.Failure(error);
            } finally {
                this.loading.profile = false;
            }
        },
        async updatePassword() {
            try {
                this.loading.profile = true;
                if (this.data.password === this.data.confirmPassword) {
                    const { data } = await this.$store.dispatch(`settings/${SAVE_PROFILE_PASSWORD}`, {
                        password: this.data.password,
                        current_password: this.data.currentPassword,
                    });
                    if (data.success) {
                        Notiflix.Notify.Success('Password Updated !');
                        this.data.currentPassword = '';
                        this.data.password = '';
                        this.data.confirmPassword = '';
                    } else {
                        Notiflix.Notify.Failure(data.message);
                    }
                } else {
                    Notiflix.Notify.Failure('Password din\'t match !');
                }
            } catch (error) {

            } finally {
                this.loading.profile = false;
            }
        },
        async handleFileChange({ target }) {
            try {
                this.loading.profile = true;
                const [ picture ] = target.files;
                if (picture && this.validate(picture)) {
                    const { data } = await this.sendData(SAVE_PROFILE_PICTURE, this.generateFormData('profile_picture', picture));
                    this.$store.commit(`auth/${SAVE_USER}`, data.data.user);
                    Notiflix.Notify.Success('Profile picture updated');
                }
            } catch (error) {
                Notiflix.Notify.Failure(error);
            } finally {
                this.loading.profile = false;
            }
        },
        generateFormData(name, file) {
            const formData = new FormData();
            formData.append(name, file);
            return formData;
        },
        sendData(action, params) {
            return this.$store.dispatch(`settings/${action}`, params);
        },
        validate(files) {
            
            let pictureExtension = files.type.split('/');
            pictureExtension = pictureExtension[pictureExtension.length - 1];

            if (this.imagesValidations.allowedImageMimes.indexOf(pictureExtension) < 0) {
                Notiflix.Notify.Failure('File type not allowed !');
                return false;
            }

            if (files.size > (this.imagesValidations.maxImageSize * 1000)) {
                Notiflix.Notify.Failure('Image size should under 2MB');
                return false;
            }

            return true;
        },
    },
    computed: {
        getImageBaseUrl() {
            return `${BASE_URL}/img/profiles`;
        },
        getUserDetail() {
            const userInfo = this.$store.getters['auth/getUserDetail'];
            this.data.name = userInfo.name;
            return userInfo;
        }
    },
}
</script>

<style scoped>

.profile-img-wrapper {
    width: 160px;
    height: 160px;
    overflow: hidden;
    background-size: cover;
}

.profile-img {
    max-width: 170px !important;
}

.attr-action-icon {
    cursor: pointer;
    position: absolute;
    margin-left: 5px;
    color: #8900CE;
}

.attr-action-icon-big {
    font-size: 23px;
}

.update-img-btn {
    bottom: 0; right: 0;
    width: 55px;
    height: 55px;
    line-height: 55px;
    border-radius: 30px;
    font-size: 23px;
    transition: .2s;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgba(0,0,0,.5);
    background-color: #8900CE;
}

.update-img-btn:hover {
    background-color: #5c008a;
    transform: scale(1.1);
}

.update-img-btn:active {
    background-color: #29003d;
    transform: scale(0.8);
}

</style>
