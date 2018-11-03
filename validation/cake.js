const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCakeInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl : '';

  if (!Validator.isLength(data.name, { min: 4, max: 15 })) {
    errors.name = 'Cake Name needs to be between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Cake Name is required';
  }

  if (Validator.isEmpty(data.imageUrl)) {
    errors.imageUrl = 'Cake imageUrl field is required';
  }

  if (!isEmpty(data.imageUrl)) {
    if (!Validator.isURL(data.imageUrl)) {
      errors.imageUrl = 'Not a valid URL';
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
