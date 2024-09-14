// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const SECRET_KEY = 'sua_chave_secreta';

// Middleware de Autenticação
exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  console.log(token)
  if (!token) return res.status(403).send('Token requerido.');

  
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(500).send('Falha na autenticação do token.');
    try {
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).send('Usuário não encontrado.');
      req.user = user;
      next();
    } catch (err) {
      res.status(500).send('Erro no servidor.');
    }
  });
};

// Middleware de Autorização
exports.authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.tipo_usuario)) {
      return res.status(403).send('Você não tem permissão para acessar esta rota.');
    }
    next();
  };
};
