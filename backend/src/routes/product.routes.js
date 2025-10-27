const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

// Public routes
router.get('/', productController.getProducts);
router.get('/stats', productController.getProductStats);
router.get('/:id', productController.getProduct);

// Protected routes (Admin only)
router.post('/', protect, restrictTo('admin'), productController.createProduct);
router.put('/:id', protect, restrictTo('admin'), productController.updateProduct);
router.delete('/:id', protect, restrictTo('admin'), productController.deleteProduct);

module.exports = router;
