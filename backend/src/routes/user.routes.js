const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist, getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);

router.get('/cart', protect, getCart);
router.post('/cart', protect, addToCart);
router.put('/cart/:id', protect, updateCartItem);
router.delete('/cart/:id', protect, removeFromCart);
router.delete('/cart', protect, clearCart);

module.exports = router;
