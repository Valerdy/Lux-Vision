const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All routes protected

// Wishlist
router.get('/wishlist', userController.getWishlist);
router.post('/wishlist', userController.addToWishlist);
router.delete('/wishlist/:productId', userController.removeFromWishlist);

// Cart
router.get('/cart', userController.getCart);
router.post('/cart', userController.addToCart);
router.put('/cart/:id', userController.updateCartItem);
router.delete('/cart/:id', userController.removeFromCart);
router.delete('/cart', userController.clearCart);

module.exports = router;
