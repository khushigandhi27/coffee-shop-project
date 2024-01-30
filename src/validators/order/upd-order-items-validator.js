const { checkSchema } = require('express-validator');

const getMessage = require('../../utils/get-message');

const updateOrderItemValidator = checkSchema ({
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
  coffee: {
    optional: true,
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace(
        '{{ input }}',
        'coffee',
      ),
    },
  },
  snacks: {
    optional: true,
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace(
        '{{ input }}',
        'snacks',
      ),
    },
  },
  coffeeQuantity: {
    optional: true,
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace(
        '{{ input }}',
        'coffeeQuantity',
      ),
    },
  },
  snacksQuantity: {
    optional: true,
    isString: {
      errorMessage: getMessage('INPUT_STRING').replace(
        '{{ input }}',
        'snacksQuantity',
      ),
    },
  },
  dineIn: {
    optional: true,
    isBoolean: {
      errorMessage: getMessage('INPUT_BOOLEAN').replace(
        '{{ input }}',
        'dineIn',
      ),
    },
  },
  takeAway: {
    optional: true,
    isBoolean: {
      errorMessage: getMessage('INPUT_BOOLEAN').replace(
        '{{ input }}',
        'takeAway',
      ),
    },
  },
  appOrder: {
    optional: true,
    isBoolean: {
      errorMessage: getMessage('INPUT_BOOLEAN').replace(
        '{{ input }}',
        'appOrder',
      ),
    },
  },
  totalAmount: {
    optional: true,
    isNumeric: {
      errorMessage: getMessage('INPUT_NUMERIC').replace(
        '{{ input }}',
        'totalAmount',
      ),
    },
  },
});

module.exports = updateOrderItemValidator;