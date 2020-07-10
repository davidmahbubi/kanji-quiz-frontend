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
                            <i data-field="name" @click.prevent="saveSingleItem" class="fas fa-save ml-2 attr-action-icon attr-action-icon-big"></i>
                        </div>
                        <span>@{{ getUserDetail.username }}</span>
                    </b-card-text>
                </b-overlay>
            </b-tab>
            <b-tab title="Coming Soon :)">
                <b-card-text>Coming soon :)</b-card-text>
            </b-tab>
            </b-tabs>
        </b-card>
        </div>
    </div>
</template>

<script>

import { BASE_URL } from '@/commons/config';
import { SAVE_PROFILE_SETTINGS, SAVE_PROFILE_PICTURE } from '@/store/actions.type';
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
        async saveSingleItem(e) {
            try {
                this.loading.profile = true;
                const editField = e.target.dataset.field;
                const { data } = await this.$store.dispatch(`settings/${SAVE_PROFILE_SETTINGS}`, {
                    field: editField,
                    value: this.data[editField],
                });
                Notiflix.Notify.Success('Updated !');
                this.$store.commit(`auth/${SAVE_USER}`, data.data.user);
                this.toggles[editField] = false;
            } catch (error) {
                Notiflix.Notify.Failure(`Error ! ${error}`);
            } finally {
                this.loading.profile = false;
            }
        },
        async handleFileChange({ target }) {
            try {
                this.loading.profile = true;
                const picture = target.files[0];
                if (picture && this.validate(picture)) {
                    const { data } = await this.$store.dispatch(`settings/${SAVE_PROFILE_PICTURE}`, this.generateFormData('profile_picture', picture));
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
