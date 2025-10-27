const { query, transaction } = require('../config/database');

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json({
      status: 'success',
      data: { orders: result.rows }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des commandes'
    });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const orderResult = await query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Commande introuvable'
      });
    }

    const itemsResult = await query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        order: orderResult.rows[0],
        items: itemsResult.rows
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération de la commande'
    });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Panier vide'
      });
    }

    const result = await transaction(async (client) => {
      // Calculate totals
      let subtotal = 0;
      for (const item of items) {
        subtotal += item.price * item.quantity;
      }

      const tax = subtotal * 0.18; // 18% TVA
      const shippingCost = 0; // Livraison gratuite
      const total = subtotal + tax + shippingCost;

      // Generate order number
      const orderNumber = `LV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders (
          user_id, order_number, subtotal, tax, shipping_cost, total,
          shipping_address, billing_address, payment_method
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          userId, orderNumber, subtotal, tax, shippingCost, total,
          JSON.stringify(shippingAddress),
          JSON.stringify(billingAddress || shippingAddress),
          paymentMethod
        ]
      );

      const orderId = orderResult.rows[0].id;

      // Create order items
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (
            order_id, product_id, product_name, product_price, quantity, subtotal
          ) VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            orderId, item.productId, item.name, item.price,
            item.quantity, item.price * item.quantity
          ]
        );

        // Update product stock
        await client.query(
          `UPDATE products
           SET stock_quantity = stock_quantity - $1,
               in_stock = CASE WHEN (stock_quantity - $1) <= 0 THEN false ELSE true END
           WHERE id = $2`,
          [item.quantity, item.productId]
        );
      }

      return orderResult.rows[0];
    });

    res.status(201).json({
      status: 'success',
      data: { order: result }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la création de la commande'
    });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Statut invalide'
      });
    }

    const result = await query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Commande introuvable'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { order: result.rows[0] }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour du statut'
    });
  }
};
