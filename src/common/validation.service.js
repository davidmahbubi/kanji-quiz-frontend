
/**
 * Validation service
 * 
 * This service is responsible for checking
 * the given input is meet with the validation
 * rules or not
 * 
 * © David Mahbubi
 */

import ValidationMessages from '@/lang/validation.lang';

const rulesSeparator = '|';

/** Define the rule checker functions */
const rulesChecker = {

    required(input) {
        return input.length > 0;
    },

    numeric(input) {
        return typeof input === "number";
    },

    min(input, min) {
        return input.length >= min;
    },

    max(input, max) {
        return input.length <= max;
    },

    same(input, comparedWords) {
        return input === comparedWords;
    }

}

function validate(input, rules) {

    const corrector = Array(splitter(rules, rulesSeparator)).map((rule) => {

        let ruleSplitted = rule;
        let ruleParams = [];

        if (rule.indexOf(':') >= 0) {

            const ruleParamsSplit = splitter(rule, ':');

            ruleSplitted = ruleParamsSplit[0];
            ruleParams = ruleParamsSplit.splice(1, 2);
        }

        if (!rulesChecker[ruleSplitted](input, ruleParams)) {
            return ValidationMessages[ruleSplitted.toUpperCase()];
        }

    });

    return corrector;
    
}

/**
 * Splitter function
 * 
 * @param {*} words 
 * @param {*} separator 
 */
function splitter(words, separator) {
    return words.split(separator);
}

export default validate;
