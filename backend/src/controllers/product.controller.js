const { query } = require('../config/database');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      gender,
      brand,
      minPrice,
      maxPrice,
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let queryText = 'SELECT * FROM products WHERE 1=1';
    const queryParams = [];
    let paramIndex = 1;

    // Filters
    if (category) {
      queryText += ` AND category = $${paramIndex}`;
      queryParams.push(category);
      paramIndex++;
    }

    if (gender) {
      queryText += ` AND gender = $${paramIndex}`;
      queryParams.push(gender);
      paramIndex++;
    }

    if (brand) {
      queryText += ` AND brand = $${paramIndex}`;
      queryParams.push(brand);
      paramIndex++;
    }

    if (minPrice) {
      queryText += ` AND price >= $${paramIndex}`;
      queryParams.push(minPrice);
      paramIndex++;
    }

    if (maxPrice) {
      queryText += ` AND price <= $${paramIndex}`;
      queryParams.push(maxPrice);
      paramIndex++;
    }

    if (search) {
      queryText += ` AND (name ILIKE $${paramIndex} OR brand ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    // Get total count
    const countResult = await query(
      queryText.replace('SELECT *', 'SELECT COUNT(*)'),
      queryParams
    );
    const totalProducts = parseInt(countResult.rows[0].count);

    // Add sorting and pagination
    const validSortFields = ['created_at', 'price', 'name', 'brand'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at';
    const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    queryText += ` ORDER BY ${sortField} ${order} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(limit, offset);

    const result = await query(queryText, queryParams);

    res.status(200).json({
      status: 'success',
      data: {
        products: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalProducts,
          totalPages: Math.ceil(totalProducts / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des produits'
    });
  }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Produit introuvable'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération du produit'
    });
  }
};

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      discount = 0,
      category,
      gender,
      frameShape,
      material,
      color,
      stockQuantity = 0,
      images = [],
      features = []
    } = req.body;

    // Validation
    if (!name || !brand || !price || !category || !gender) {
      return res.status(400).json({
        status: 'error',
        message: 'Veuillez fournir tous les champs requis'
      });
    }

    const result = await query(
      `INSERT INTO products (
        name, brand, description, price, discount, category, gender,
        frame_shape, material, color, stock_quantity, in_stock, images, features
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        name, brand, description, price, discount, category, gender,
        frameShape, material, color, stockQuantity,
        stockQuantity > 0,
        JSON.stringify(images),
        JSON.stringify(features)
      ]
    );

    res.status(201).json({
      status: 'success',
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la création du produit'
    });
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if product exists
    const checkResult = await query(
      'SELECT id FROM products WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Produit introuvable'
      });
    }

    // Build update query dynamically
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.keys(updates).forEach(key => {
      if (key === 'images' || key === 'features') {
        fields.push(`${key} = $${paramIndex}`);
        values.push(JSON.stringify(updates[key]));
      } else {
        const dbKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        fields.push(`${dbKey} = $${paramIndex}`);
        values.push(updates[key]);
      }
      paramIndex++;
    });

    values.push(id);

    const result = await query(
      `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour du produit'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM products WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Produit introuvable'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Produit supprimé avec succès'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la suppression du produit'
    });
  }
};

// @desc    Get product statistics
// @route   GET /api/v1/products/stats
// @access  Public
exports.getProductStats = async (req, res) => {
  try {
    const stats = await query(`
      SELECT
        COUNT(*) as total_products,
        COUNT(CASE WHEN category = 'optical' THEN 1 END) as optical_count,
        COUNT(CASE WHEN category = 'sunglasses' THEN 1 END) as sunglasses_count,
        AVG(price) as average_price,
        MIN(price) as min_price,
        MAX(price) as max_price,
        COUNT(CASE WHEN in_stock = true THEN 1 END) as in_stock_count
      FROM products
    `);

    res.status(200).json({
      status: 'success',
      data: {
        stats: stats.rows[0]
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
};
