const express = require('express');

const addOrderItemCOntroller = require('../../controllers/order-controller/add-order-items-controller');
const updateOrderItemsController = require('../../controllers/order-controller/update-order-items-controller');
const deleteOrderItemController = require('../../controllers/order-controller/delete-order-items-controller');

const { addOrderItemValidator, updateOrderItemValidator, deleteOrderItemValidator } = require('../../validators/order/order-item-validator-index');

const validateSchema = require('../../validators/validator');

const router = express.Router();

router.post('/add-order-item',addOrderItemValidator,validateSchema,addOrderItemCOntroller);
router.put('/update-order-item',updateOrderItemValidator,validateSchema,updateOrderItemsController);
router.delete('/delete-order-item',deleteOrderItemValidator,validateSchema,deleteOrderItemController);

module.exports = router;