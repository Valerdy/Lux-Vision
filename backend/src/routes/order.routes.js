const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect); // All routes protected

router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrder);
router.post('/', orderController.createOrder);
router.put('/:id/status', restrictTo('admin'), orderController.updateOrderStatus);

module.exports = router;
