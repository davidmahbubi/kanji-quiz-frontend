<template>
    <div id="register-page">
        <auth-form-card>
            <form @submit.prevent="submit">
                <h3 class="text-custom-primary auth-form-title">Registration</h3>
                <b-form-group class="mb-5">
                    <input type="text" class="input-custom-primary w-100" :class="{'is-invalid': validationErrors.name}" placeholder="Name" v-model="userInput.name">
                    <b-form-invalid-feedback>
                        <span>{{ validationErrors.name }}</span>
                    </b-form-invalid-feedback>
                </b-form-group>
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
                <b-form-group class="mb-5">
                    <input type="password" class="input-custom-primary w-100" :class="{'is-invalid': validationErrors.passwordConfirmation}" placeholder="Password Confirmation" v-model="userInput.passwordConfirmation">
                    <b-form-invalid-feedback>
                        <span>{{ validationErrors.passwordConfirmation }}</span>
                    </b-form-invalid-feedback>
                </b-form-group>
                <button type="submit" class="btn btn-custom-primary w-100">Sign Up</button>
            </form>
            <div class="text-center mt-3">
                <router-link :to="{name: 'AuthLogin'}" class="link-custom-primary">Already have an account ?</router-link>
            </div>
        </auth-form-card>
    </div>
</template>

<script>

import validate from '@/commons/validation.service';
import validationMixin from '@/mixins/validation';
import AuthFormCard from '@/components/AuthFormCard.vue';
import { USER_REGISTER } from '@/store/actions.type';

export default {

    mixins: [validationMixin],

    data() {
        return {
            userInput: {
                name: '',
                username: '',
                password: '',
                passwordConfirmation: '',
            }
        }
    },

    components: {
        AuthFormCard,
    },

    methods: {

        async submit() {
            this.validation();
            if (!this.isValidationerror) {
                try {
                    const { name, username, password, passwordConfirmation } = this.userInput;
                    const sendData = await this.$store.dispatch(`auth/${USER_REGISTER}`, {
                        name,
                        username,
                        password,
                        password_confirmation: passwordConfirmation,
                    });
                    this.$router.push({name: 'AuthLogin'});
                    Notiflix.Notify.Success('Registered ! Now you can login 😁');
                } catch (error) {
                    Notiflix.Notify.Failure(`Failed to register ${error}`);
                }
            }
        },

        validation() {

            this.cleanErrorMessage();
            
            this.setRules({
                name: 'required',
                username: 'required',
                password: 'required|min:3',
                passwordConfirmation: `required|same:password,${this.userInput.password}`,
            });

            for (const inputKey in this.userInput) {

                const validationResult = validate(this.userInput[inputKey], this.validationRules[inputKey]);

                if (validationResult) {
                    this.pushErrorMessage(inputKey, validationResult);
                } else {
                    this.purgeErrorMessage(inputKey);
                }
            }

        }
    }

};

</script>

<style scoped src="@/assets/css/auth.css"></style>