const express = require('express');

const addMenuItemsController = require('../../controllers/menu-controller/add-menu-items-controller');
const updateMenuItemsController = require('../../controllers/menu-controller/update-menu-items-controller');
const deleteMenuItemController = require('../../controllers/menu-controller/delete-menu-items-controllers');

const { addMenuItemValidator, updateMenuItemValidator, deleteMenuItemValidator } = require('../../validators/menu/menu-item-validator-index');

const validateSchema = require('../../validators/validator');

const router = express.Router();

router.post('/add-menu-item',addMenuItemValidator,validateSchema,addMenuItemsController);
router.put('/update-menu-item',updateMenuItemValidator,validateSchema,updateMenuItemsController);
router.delete('/delete-menu-item',deleteMenuItemValidator,validateSchema,deleteMenuItemController);

module.exports = router;