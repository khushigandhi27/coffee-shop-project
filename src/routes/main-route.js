const express = require('express');
const router = express.Router();

const menuRoutes = require('../routes/menu-route/menu-route-index');
const orderRoutes = require('../routes/order-route/order-route-index');

router.use('/menu',menuRoutes);
router.use('/order',orderRoutes);

module.exports = router;