// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de Login
router.post('/login', authController.login);

module.exports = router;
