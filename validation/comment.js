const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(data) {
	let errors = {};
	data.text = !isEmpty(data.text) ? data.text : '';

	if (!Validator.isLength(data.text, { min: 5, max: 50 })) {
		errors.text = 'Cake Comment needs to be between 2 and 40 characters';
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = 'Cake Comment is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
