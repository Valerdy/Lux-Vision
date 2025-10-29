const { query } = require('../config/database');

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await query(
      `SELECT r.*, u.first_name, u.last_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.product_id = $1
       ORDER BY r.created_at DESC`,
      [productId]
    );

    // Calculate average rating
    const avgResult = await query(
      'SELECT AVG(rating) as average_rating, COUNT(*) as review_count FROM reviews WHERE product_id = $1',
      [productId]
    );

    const averageRating = avgResult.rows[0].average_rating
      ? parseFloat(avgResult.rows[0].average_rating)
      : 0;

    res.status(200).json({
      status: 'success',
      data: {
        reviews: result.rows,
        averageRating: averageRating,
        totalReviews: parseInt(avgResult.rows[0].review_count),
        stats: avgResult.rows[0]
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des avis'
    });
  }
};

// Create review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;
    const userId = req.user.id;

    if (!rating || !title || !comment) {
      return res.status(400).json({
        status: 'error',
        message: 'Veuillez fournir tous les champs requis'
      });
    }

    // Check if user already reviewed this product
    const existing = await query(
      'SELECT id FROM reviews WHERE product_id = $1 AND user_id = $2',
      [productId, userId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Vous avez déjà laissé un avis pour ce produit'
      });
    }

    const result = await query(
      `INSERT INTO reviews (product_id, user_id, rating, title, comment)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [productId, userId, rating, title, comment]
    );

    res.status(201).json({
      status: 'success',
      data: { review: result.rows[0] }
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la création de l\'avis'
    });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, comment } = req.body;
    const userId = req.user.id;

    const result = await query(
      `UPDATE reviews
       SET rating = COALESCE($1, rating),
           title = COALESCE($2, title),
           comment = COALESCE($3, comment)
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [rating, title, comment, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Avis introuvable ou non autorisé'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { review: result.rows[0] }
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour de l\'avis'
    });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await query(
      'DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Avis introuvable ou non autorisé'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Avis supprimé avec succès'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la suppression de l\'avis'
    });
  }
};
