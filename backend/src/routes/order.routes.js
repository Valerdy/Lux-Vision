const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth.middleware');
const { getUserOrders, getOrder, createOrder, updateOrderStatus } = require('../controllers/order.controller');

router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrder);
router.post('/', protect, createOrder);
router.put('/:id/status', protect, restrictTo('admin'), updateOrderStatus);

module.exports = router;
