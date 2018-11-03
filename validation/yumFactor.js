const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateYumFactorInput(data) {
	let errors = {};
	data.value = !isEmpty(data.value) ? data.value : '';
	if (Validator.isEmpty(data.value)) {
		errors.value = 'Cake yumFactor field is required';
	}

	if (!isEmpty(data.value)) {
		if (!Validator.isInt(data.value, { gt: 1, lt: 6 })) {
			errors.value = 'Not a valid yumFActor';
		}
	}
	if (Validator.isEmpty(data.value)) {
		errors.value = 'Cake Comment is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
