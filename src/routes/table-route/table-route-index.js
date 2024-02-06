const express = require('express');
const router = express.Router();

const validateSchema = require('../../validators/validator');

const { addTableItemCOntroller } = require('../../controllers/table-controller/table-controller-index');

const { addTableItemValidator } = require('../../validators/table/table-item-validator-index');

router.post('/add-table-item',addTableItemValidator,validateSchema,addTableItemCOntroller);

module.exports = router;