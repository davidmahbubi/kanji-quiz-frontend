/**
 * Validation mixin
 * 
 * This mixin will used for validation purpose.
 * It's nice combination with validation
 * service (../commons/validation.service.js)
 * 
 */

export default {
    data() {
        return {
            validationErrors: Object(),
            isValidationError: false,
            validationRules: Object(),
        }
    },
    created() {
        makeLog('MIXINS', 'Using validation mixin');
    },
    methods: {
        pushErrorMessage(key, value) {
            this.isValidationError = true;
            this.validationErrors[key] = value;
        },
        purgeErrorMessage(key) {
            delete this.validationErrors[key];
        },
        cleanErrorMessage() {
            this.isValidationError = false;
            this.validationErrors = Object();
        },
        setRules(rules) {
            this.validationRules = rules;
        }
    },
}