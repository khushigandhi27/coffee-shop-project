const express = require('express');

const addOrderItemController = require('../../controllers/order-controller/add-order-items-controller');
const updateOrderItemsController = require('../../controllers/order-controller/update-order-items-controller');

const getAllOrdersController = require('../../controllers/order-controller/getAllOrdersController');

const { addOrderItemValidator, updateOrderItemValidator } = require('../../validators/order/order-item-validator-index');

const validateSchema = require('../../validators/validator');

const router = express.Router();

router.post('/add-order-item',addOrderItemValidator,validateSchema,addOrderItemController);
router.put('/update-order-item',updateOrderItemValidator,validateSchema,updateOrderItemsController);

router.get('/get-all-orders',getAllOrdersController);

module.exports = router;