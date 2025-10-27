const express = require('express');
const router = express.Router();
const { getAllProducts, getProduct, createProduct, getStats } = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.get('/', getAllProducts);
router.get('/stats', getStats);
router.get('/:id', getProduct);
router.post('/', protect, restrictTo('admin'), createProduct);

module.exports = router;
