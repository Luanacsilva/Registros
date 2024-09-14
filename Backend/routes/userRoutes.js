// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Rota para Registrar um Novo Usuário (qualquer usuário pode acessar)
router.post('/register', userController.register);
router.get('', userController.getAllUsers);

// Rota para Atualizar Usuário (somente coordenadores)
router.put('/update/:id', authenticate, authorize(['coordenador']), userController.updateUser);

// Rota para Deletar Usuário (somente coordenadores)
router.delete('/delete/:id', authenticate, authorize(['coordenador']), userController.deleteUser);

module.exports = router;
