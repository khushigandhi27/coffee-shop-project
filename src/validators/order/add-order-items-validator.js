const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const addOrderItemValidator = checkSchema ({
  customerName:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'customerName'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'customerName'),
    },
  },
  mobileNo: {
    optional: true,
    isNumeric: {
      errorMessage: getMessage('INPUT_NUMERIC').replace(
        '{{ input }}',
        'mobileNo',
      ),
    },
  },
  selectedItems:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'selectedItems'),
    },
    isArray: {
      errorMessage: getMessage('INPUT_ARRAY').replace('{{ input }}', 'selectedItems'),
    },
  },
  tableNo: {
    optional: true,
    isNumeric: {
      errorMessage: getMessage('INPUT_NUMERIC').replace(
        '{{ input }}',
        'tableNo',
      ),
    },
  },
});

module.exports = addOrderItemValidator;