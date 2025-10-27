const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user exists
    const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Email déjà utilisé' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await query(
      `INSERT INTO users (email, password, first_name, last_name, phone)
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, first_name, last_name, role`,
      [email, hashedPassword, firstName, lastName, phone]
    );

    const user = result.rows[0];
    const token = generateToken(user.id);

    res.status(201).json({
      status: 'success',
      data: { token, user }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ status: 'error', message: 'Email ou mot de passe incorrect' });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Email ou mot de passe incorrect' });
    }

    const token = generateToken(user.id);
    delete user.password;

    res.json({
      status: 'success',
      data: { 
        token, 
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const result = await query(
      'SELECT id, email, first_name, last_name, phone, role FROM users WHERE id = $1',
      [req.user.id]
    );

    res.json({
      status: 'success',
      data: { user: result.rows[0] }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const result = await query(
      `UPDATE users SET first_name = $1, last_name = $2, phone = $3
       WHERE id = $4
       RETURNING id, email, first_name, last_name, phone, role`,
      [firstName, lastName, phone, req.user.id]
    );

    res.json({
      status: 'success',
      data: { user: result.rows[0] }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const result = await query('SELECT password FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Mot de passe actuel incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, req.user.id]);

    res.json({
      status: 'success',
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};
