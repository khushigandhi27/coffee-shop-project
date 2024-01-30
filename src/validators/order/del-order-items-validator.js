const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const deleteOrderItemValidator = checkSchema ({
  orderId:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'orderId'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'orderId'),
    },
  },
});

module.exports = deleteOrderItemValidator;