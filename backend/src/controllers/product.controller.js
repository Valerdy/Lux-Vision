const { query } = require('../config/database');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, gender, brand, minPrice, maxPrice, search, sortBy = 'created_at', sortOrder = 'desc', page = 1, limit = 12 } = req.query;

    let queryText = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      queryText += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (gender) {
      paramCount++;
      queryText += ` AND gender = $${paramCount}`;
      params.push(gender);
    }

    if (brand) {
      paramCount++;
      queryText += ` AND brand = $${paramCount}`;
      params.push(brand);
    }

    if (minPrice) {
      paramCount++;
      queryText += ` AND price >= $${paramCount}`;
      params.push(minPrice);
    }

    if (maxPrice) {
      paramCount++;
      queryText += ` AND price <= $${paramCount}`;
      params.push(maxPrice);
    }

    if (search) {
      paramCount++;
      queryText += ` AND (name ILIKE $${paramCount} OR brand ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    // Count total
    const countResult = await query(queryText.replace('SELECT *', 'SELECT COUNT(*)'), params);
    const total = parseInt(countResult.rows[0].count);

    // Add sorting
    const validSortFields = ['name', 'price', 'created_at'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at';
    const order = sortOrder === 'asc' ? 'ASC' : 'DESC';
    queryText += ` ORDER BY ${sortField} ${order}`;

    // Add pagination
    const offset = (page - 1) * limit;
    paramCount++;
    queryText += ` LIMIT $${paramCount}`;
    params.push(limit);
    paramCount++;
    queryText += ` OFFSET $${paramCount}`;
    params.push(offset);

    const result = await query(queryText, params);

    res.json({
      status: 'success',
      data: {
        products: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Produit non trouvé' });
    }

    res.json({
      status: 'success',
      data: { product: result.rows[0] }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, brand, description, price, discount, category, gender, frame_shape, material, color, stock_quantity, in_stock, images, features } = req.body;

    const result = await query(
      `INSERT INTO products (name, brand, description, price, discount, category, gender, frame_shape, material, color, stock_quantity, in_stock, images, features)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [name, brand, description, price, discount || 0, category, gender, frame_shape, material, color, stock_quantity || 0, in_stock !== false, JSON.stringify(images), JSON.stringify(features)]
    );

    res.status(201).json({
      status: 'success',
      data: { product: result.rows[0] }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const result = await query('SELECT COUNT(*) as total FROM products');
    res.json({
      status: 'success',
      data: { stats: result.rows[0] }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};
