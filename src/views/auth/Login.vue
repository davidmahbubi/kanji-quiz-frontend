<template>
    <div id="login-page">    
        <auth-form-card>
            <b-overlay :show.sync="loading">
                <form @submit.prevent="submit">
                    <h3 class="text-custom-primary auth-form-title">Welcome</h3>
                    <b-form-group class="mb-5">
                        <input type="text" class="input-custom-primary w-100" :class="{'is-invalid': validationErrors.username}" placeholder="Username" v-model="userInput.username">
                        <b-form-invalid-feedback>
                            <span>{{ validationErrors.username }}</span>
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group class="mb-5">
                        <input type="password" class="input-custom-primary w-100" :class="{'is-invalid': validationErrors.password}" placeholder="Password" v-model="userInput.password">
                        <b-form-invalid-feedback>
                            <span>{{ validationErrors.password }}</span>
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <button type="submit" class="btn btn-custom-primary w-100">Sign In</button>
                </form>
                <div class="text-center mt-3">
                    <router-link :to="{name: 'AuthRegister'}" class="link-custom-primary">Don't have an account ?</router-link>
                </div>
            </b-overlay>
        </auth-form-card>
    </div>
</template>

<script>

import AuthFormCard from '@/components/AuthFormCard.vue';
import validate from '@/commons/validation.service';
import validationMixin from '@/mixins/validation';
import { auth } from '@/commons/api.service';
import { USER_LOGIN } from '@/store/actions.type';

export default {

    mixins: [validationMixin],

    data() {
        return {
            userInput: {
                username: '',
                password: '',
            },
            loading: false,
        }
    },

    components: {
        AuthFormCard,
    },

    methods: {

        async submit() {
            
            this.loading = true;
            this.validation();

            try {

                if (!this.isValidationError) {
                    const sendData = await this.$store.dispatch(`auth/${USER_LOGIN}`, this.userInput);
                    this.$router.push({name: 'Home'});
                }

            } catch (error) {

                let errorCode = String(error).split(' ');
                errorCode = errorCode[errorCode.length - 1];

                if (errorCode == 401) {
                    error = 'Wrong credentials !';
                }

                Notiflix.Notify.Failure(`Login failed : ${error}`);

            } finally {
                this.loading = false;
            }
        },

        validation() {

            this.cleanErrorMessage();

            this.setRules({
                username: 'required',
                password: 'required',
            });

            for (const inputKey in this.userInput) {

                const validationResult = validate(this.userInput[inputKey], this.validationRules[inputKey]);

                if (validationResult) {
                    this.pushErrorMessage(inputKey, validationResult)
                } else {
                    this.purgeErrorMessage(inputKey);
                }

            }
        }

    }
};

</script>

<style scoped src="@/assets/css/auth.css"></style>