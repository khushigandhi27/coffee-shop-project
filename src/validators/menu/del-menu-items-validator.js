const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const deleteMenuItemValidator = checkSchema ({
  title:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'title'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'title'),
    },
  },
});

module.exports = deleteMenuItemValidator;