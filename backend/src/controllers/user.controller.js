const { query } = require('../config/database');

// Wishlist
exports.getWishlist = async (req, res) => {
  try {
    const result = await query(
      `SELECT p.* FROM products p
       INNER JOIN wishlist w ON p.id = w.product_id
       WHERE w.user_id = $1
       ORDER BY w.created_at DESC`,
      [req.user.id]
    );

    res.json({
      status: 'success',
      data: { products: result.rows }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    await query(
      'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.user.id, productId]
    );

    res.status(201).json({
      status: 'success',
      message: 'Produit ajouté aux favoris'
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    await query(
      'DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2',
      [req.user.id, productId]
    );

    res.json({
      status: 'success',
      message: 'Produit retiré des favoris'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

// Cart
exports.getCart = async (req, res) => {
  try {
    const result = await query(
      `SELECT c.id as cart_id, c.quantity, p.* FROM cart c
       INNER JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1
       ORDER BY c.created_at DESC`,
      [req.user.id]
    );

    res.json({
      status: 'success',
      data: { items: result.rows }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    await query(
      `INSERT INTO cart (user_id, product_id, quantity) 
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id) 
       DO UPDATE SET quantity = cart.quantity + $3`,
      [req.user.id, productId, quantity]
    );

    res.status(201).json({
      status: 'success',
      message: 'Produit ajouté au panier'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    await query(
      'UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3',
      [quantity, id, req.user.id]
    );

    res.json({
      status: 'success',
      message: 'Panier mis à jour'
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    await query(
      'DELETE FROM cart WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    res.json({
      status: 'success',
      message: 'Produit retiré du panier'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await query('DELETE FROM cart WHERE user_id = $1', [req.user.id]);

    res.json({
      status: 'success',
      message: 'Panier vidé'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};
