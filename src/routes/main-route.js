const express = require('express');
const router = express.Router();

const menuRoutes = require('../routes/menu-route/menu-route-index');
const orderRoutes = require('../routes/order-route/order-route-index');
const tableRoutes = require('../routes/table-route/table-route-index');
const paymentRoutes = require('../routes/payment-route/payment-route-index');
const {getFileSignedUrl} = require('../common/get-signed-url');

router.use('/menu',menuRoutes);
router.use('/order',orderRoutes);
router.use('/table',tableRoutes);
router.use('/payment',paymentRoutes);
router.post('/get-file-signed-url',getFileSignedUrl);

module.exports = router;