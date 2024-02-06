const express = require('express');
const router = express.Router();

const validateSchema = require('../../validators/validator');

const addPaymentController = require('../../controllers/payment-controller/payment-items-controller');

const { addPaymentItemValidator } = require('../../validators/payment/payment-item-validator');

router.post('/payment-item',addPaymentItemValidator,validateSchema,addPaymentController);

module.exports = router;