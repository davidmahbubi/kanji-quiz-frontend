
/**
 * Validation service
 * 
 * This service is responsible to check
 * whether the given input is meet with 
 * the validation rules or otherwise, it
 * will return the error message
 * 
 * © David Mahbubi
 */

import ValidationMessages from '@/lang/validation.lang';

/**
 * This constant variable define the rules type
 * that need to display the field name in the
 * error message
 */
const fieldShownRules = ['min', 'max', 'same'];

/**
 * All the rules checker method
 * will defined in below's object
 */
const rulesChecker = {

    required(input) {
        return input.length > 0;
    },

    numeric(input) {
        return typeof input === "number";
    },

    min(input, params) {
        return input.length >= params[0];
    },

    max(input, params) {
        return input.length <= params[0];
    },

    same(input, params) {
        return input === params[1];
    }

}

/**
 * validate
 * 
 * This function will check each given rules
 * to given input
 * 
 * @param {*} input 
 * @param {*} rules 
 */
function validate(input, rules) {

    for (const rule of rules.split('|')) {

        let ruleSplitted = rule;
        let ruleParams = [];

        if (String(rule).indexOf(':') >= 0) {

            const ruleParamsSplit = rule.split(':');

            ruleSplitted = ruleParamsSplit[0];
            ruleParams = ruleParamsSplit.splice(1, 2)[0].split(',');

        }
        
        if (!rulesChecker[ruleSplitted](input, ruleParams)) {

            let message =  ValidationMessages[String(ruleSplitted).toUpperCase()];

            if (fieldShownRules.indexOf(ruleSplitted) >= 0 ) {
                message = message.replace(/%FIELD%/g, ruleParams[0]);
            }
            return message;
        }
    }

    return false;

}

export default validate;
