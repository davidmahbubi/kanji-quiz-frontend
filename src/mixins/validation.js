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
            isValidationerror: false,
            validationRules: Object(),
        }
    },
    created() {
        makeLog('MIXINS', 'Using validation mixin');
    },
    methods: {
        pushErrorMessage(key, value) {
            this.isValidationerror = true;
            this.validationErrors[key] = value;
        },
        purgeErrorMessage(key) {
            delete this.validationErrors[key];
        },
        cleanErrorMessage() {
            this.isValidationerror = false;
            this.validationErrors = Object();
        },
        setRules(rules) {
            this.validationRules = rules;
        }
    },
}