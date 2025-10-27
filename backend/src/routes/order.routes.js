const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, async (req, res) => {
  res.json({ status: 'success', data: { orders: [] } });
});

module.exports = router;
