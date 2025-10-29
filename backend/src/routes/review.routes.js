const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { getProductReviews, createReview, updateReview, deleteReview } = require('../controllers/review.controller');

router.get('/product/:productId', getProductReviews);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
