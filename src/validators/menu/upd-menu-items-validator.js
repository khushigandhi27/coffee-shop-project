const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const updateMenuItemValidator = checkSchema ({
  title:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'title'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'title'),
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace(
        '{{ input }}',
        'description',
      ),
    },
  },
  type: {
    optional: true,
    isString: {
      errorMessage: getMessage('INPUT_NUMERIC').replace(
        '{{ input }}',
        'type',
      ),
    },
  },
  price: {
    optional: true,
    isNumeric: {
      errorMessage: getMessage('INPUT_NUMERIC').replace(
        '{{ input }}',
        'price',
      ),
    },
  },
});

module.exports = updateMenuItemValidator;