const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const addTableItemValidator = checkSchema ({
  tableNo:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'tableNo'),
    },
    isNumeric: {
      errorMessage: getMessage('INPUT_NUMERIC').replace('{{ input }}', 'tableNo'),
    },
  },
});

module.exports = addTableItemValidator;