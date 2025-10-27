const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/product/:productId', async (req, res) => {
  res.json({ status: 'success', data: { reviews: [], averageRating: 0 } });
});

module.exports = router;
