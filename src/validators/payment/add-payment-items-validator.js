const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const addPaymentItemValidator = checkSchema ({
  orderId:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'orderId'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'orderId'),
    },
  },
  paymentStatus:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'paymentStatus'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'paymentStatus'),
    },
  },
  paymentMethod:{
    exists: {
      errorMessage: getMessage('INPUT_REQUIRED').replace('{{ input }}', 'paymentMethod'),
    },
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace('{{ input }}', 'paymentMethod'),
    },
  },
});

module.exports = addPaymentItemValidator;