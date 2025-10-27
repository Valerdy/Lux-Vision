const { query } = require('../config/database');

// Get user wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      `SELECT p.* FROM products p
       JOIN wishlist w ON p.id = w.product_id
       WHERE w.user_id = $1
       ORDER BY w.created_at DESC`,
      [userId]
    );

    res.status(200).json({
      status: 'success',
      data: { products: result.rows }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération de la liste de souhaits'
    });
  }
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    await query(
      'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, productId]
    );

    res.status(201).json({
      status: 'success',
      message: 'Produit ajouté à la liste de souhaits'
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de l\'ajout à la liste de souhaits'
    });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    await query(
      'DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );

    res.status(200).json({
      status: 'success',
      message: 'Produit retiré de la liste de souhaits'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la suppression de la liste de souhaits'
    });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      `SELECT p.*, c.quantity, c.id as cart_id
       FROM products p
       JOIN cart c ON p.id = c.product_id
       WHERE c.user_id = $1
       ORDER BY c.created_at DESC`,
      [userId]
    );

    res.status(200).json({
      status: 'success',
      data: { items: result.rows }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération du panier'
    });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;

    const result = await query(
      `INSERT INTO cart (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart.quantity + $3
       RETURNING *`,
      [userId, productId, quantity]
    );

    res.status(201).json({
      status: 'success',
      data: { cartItem: result.rows[0] }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de l\'ajout au panier'
    });
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (quantity <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'La quantité doit être supérieure à 0'
      });
    }

    const result = await query(
      'UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [quantity, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Article introuvable dans le panier'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { cartItem: result.rows[0] }
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour du panier'
    });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await query(
      'DELETE FROM cart WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    res.status(200).json({
      status: 'success',
      message: 'Article retiré du panier'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la suppression du panier'
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await query('DELETE FROM cart WHERE user_id = $1', [userId]);

    res.status(200).json({
      status: 'success',
      message: 'Panier vidé avec succès'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors du vidage du panier'
    });
  }
};
